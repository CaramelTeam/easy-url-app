import { useState } from "react"

export enum ValidateType {
    SpecialCharacters = 'SpecialCharacters',
    Email = 'Email',
}


export const useValidateInputs = <T extends Record<string, any>>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleEmailInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const regex = /[^a-zA-Z0-9@.]/g; // Filtrar solo letras, números, @ y .
        const regex = /[^a-zA-Z0-9@._-]/g;
        // Reemplazar cualquier carácter especial no permitido
        e.target.value = e.target.value.replace(regex, '');
    };

    const handleSpecialCharacters = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /[^a-zA-Z0-9!@#$%^&* ()_+=-]/g;
        e.target.value = e.target.value.replace(regex, '');
    }

    const handleEmptyInputs = (): boolean => {
        const hasEmptyValues = Object.values(values).some(value => !value);
        return hasEmptyValues;
    }

    return { handleOnChange, values, handleEmailInputs, handleSpecialCharacters, handleEmptyInputs }
}