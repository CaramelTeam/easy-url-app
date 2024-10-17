"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContextI, useUser } from "./UserContext";
import { getCookie } from "cookies-next";
interface UrlInfoI {
    _id: string;
    title: string;
    description?: string;
    url: string;
    tag: string;
    createdAt?: string;
    updatedAt: string;
}

export interface UrlDtoI {
    title: string;
    description?: string;
    url: string;
    tag?: string;
}

interface UrlTagsI {
    _id: string;
    count: number;
    urls: UrlInfoI[];
}


export const UrlContext = createContext({});
export interface UrlContextI {
    url: UrlTagsI[];
    addUrl: (urlInfo: UrlDtoI) => Promise<any>;
    refetch: () => void;
    deleteUrl: (id: string) => Promise<UrlInfoI>;
}

export const UrlContextProvider = ({ children }: any) => {
    const { user } = useUser() as UserContextI; // Get the user state
    const token = getCookie('currentUser'); // Get the token from the cookie

    const [url, setUrl] = useState<UrlTagsI[]>([]);
    const getUrl = async () => {
        if (!user.isAuthenticaded) return;
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/url`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            });
            const data = response.data
            if (data.statusCode === 404) {
                setUrl([]);
                return;
            }
            setUrl(data);
        } catch (error) {
            console.log('Entrando al error');
            console.log(error);
        }
    }

    const addUrl = async (urlInfo: UrlDtoI) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/url`, urlInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getUrl();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUrl = async (id: string) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/url/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data
            console.log("Data from delete url:", data);
            getUrl();
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getUrl();
    }, [user])


    return (
        <UrlContext.Provider value={{ url, addUrl, refetch: getUrl, deleteUrl }}>
            {children}
        </UrlContext.Provider>
    )
}


export const useUrl = () => {
    return useContext(UrlContext);
}