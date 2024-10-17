import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";

export interface UserI {
    _id: string;
    name: string;
    email: string;
    isAuthenticaded: boolean;
}

export interface UserContextI {
    user: UserI;
    login: (email: string, password: string) => Promise<any>;
    getUser: (id: string) => Promise<any>;
    signUp: (name: string, email: string, password: string) => Promise<any>;
    error: boolean;
    setError: (value: boolean) => void;
}

export const UserContext = createContext({})
export const UserContextProvider = ({ children }: any) => {
    const [user, setUser] = useState<UserI>({
        _id: localStorage.getItem('user') as string ?? "",
        name: localStorage.getItem('userName') as string ?? "",
        email: localStorage.getItem('userEmail') as string ?? "",
        isAuthenticaded: localStorage.getItem('isAuthenticaded') ? localStorage.getItem('isAuthenticaded') === 'true' : false
    })

    const [error, setError] = useState(false)


    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password })
            const data = response.data
            setCookie('currentUser', data.token, {
                path: '/',
                maxAge: 24 * 60 * 60, // 24 hours
            })
            localStorage.setItem('user', data._id);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('isAuthenticaded', 'true');
            setUser({
                _id: localStorage.getItem('user') as string,
                name: localStorage.getItem('userName') as string,
                email: localStorage.getItem('userEmail') as string,
                isAuthenticaded: localStorage.getItem('isAuthenticaded') === 'true'
            })
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    const signUp = async (name: string, email: string, password: string) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, { name, email, password })
        } catch (error) {
            setError(true)
            console.log(error);
        }
    }

    // const getUser = (id: string) => {
    //     const token = getCookie('currentUser');
    //     if (token) {
    //         // Fetch user data using the token
    //         axios.get(`http://localhost:3000/api/user/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }).then(response => {
    //             const data = response.data;
    //             setUser({
    //                 _id: data._id,
    //                 name: data.name,
    //                 email: data.email,
    //                 isAuthenticaded: true
    //             });
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     }
    // };


    // useEffect(() => {
    //     getUser(user._id);
    // }, []);



    //TODO: add a function to validate the user token

    return (
        <UserContext.Provider value={{ user, login, error, signUp, setError }} >
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => {
    return useContext(UserContext);
}