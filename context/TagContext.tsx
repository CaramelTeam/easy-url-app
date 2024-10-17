import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContextI, useUser } from "./UserContext";
import { getCookie } from "cookies-next";

export interface TagI {
    _id: string;
    name: string;
    color: string;
    createdAt: string;
    updatedAt: string;
}

export interface TagContextI {
    tag: TagI[];
    addTag: (payload: TagDtoI) => Promise<any>;
    deleteTag: (id: string) => Promise<any>;
}

export interface TagDtoI {
    name: string;
    color: string;
}

export const TagContext = createContext({});
export const TagContextProvider = ({ children }: any) => {

    const { user } = useUser() as UserContextI;
    const token = getCookie('currentUser');

    const [tag, setTag] = useState<TagI[]>([]);
    const [error, setError] = useState(false);
    const getTag = async () => {
        if (!user.isAuthenticaded) return;
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data;
            setTag(data);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    }

    const addTag = async (payload: TagDtoI) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tags`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data;
            setTag([...tag, data]);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    }

    const deleteTag = async (id: string) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tags/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getTag();
        } catch (error) {
            setError(true);
            console.log(error);
        }
    }

    useEffect(() => {
        getTag();
    }, [])

    return (
        <TagContext.Provider value={{ tag, addTag, deleteTag }}>
            {children}
        </TagContext.Provider>
    )

}


export const useTag = () => {
    return useContext(TagContext);
}