
'use client';
import { GithubIcon, GoogleIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { UserContextI, useUser } from "@/context/UserContext";
import { useValidateInputs } from "@/hooks/useValidateInputs";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Eye, EyeOff, Mail, XIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from "react";

interface SignupFormI {
    name: string;
    email: string;
    password: string;
}

export default function SignupPage() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { handleEmailInputs, handleOnChange, handleSpecialCharacters, values, handleEmptyInputs } = useValidateInputs<SignupFormI>({
        name: '',
        email: '',
        password: ''
    });
    const { signUp, error, setError } = useUser() as UserContextI;
    const router = useRouter();


    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signUp(values.name.trim(), values.email, values.password.trim());
        if (!error) return;
        router.push('/login');
        setError(false);
    }


    return (
        <Card
            className="w-96 h-full hover:shadow-lg hover:translate-y-[-2px]"
            style={{
                boxShadow: '0 8px 16px rgba(95, 95, 95, 0.5)',
            }}
        >
            <CardHeader
                className="flex flex-col items-center m-4 "
            >
                <h1 className={title()}>Registro</h1>
                {
                    error &&
                    <span
                        className="text-danger"
                    ><small>Algo salio mal, revisa los campos</small></span>
                }
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleOnSubmit}
                >
                    <Input
                        type="text"
                        label="name"
                        name="name"
                        placeholder="Enter your name"
                        labelPlacement="outside"
                        autoComplete="off"
                        onChange={handleOnChange}
                        onInput={handleSpecialCharacters}
                        isInvalid={error}
                        isRequired
                    />
                    <Input
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="you@example.com"
                        autoComplete="off"
                        labelPlacement="outside"
                        startContent={<Mail />}
                        onChange={handleOnChange}
                        onInput={handleEmailInputs}
                        isInvalid={error}
                        isRequired
                    />
                    <Input
                        type={isVisible ? "text" : "password"}
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        labelPlacement="outside"
                        onChange={handleOnChange}
                        onInput={handleSpecialCharacters}
                        isInvalid={error}
                        isRequired
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                {isVisible ? (
                                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                    />
                    <Button
                        color="primary"
                        variant="shadow"
                        type="submit"
                        className="my-2"
                        isDisabled={handleEmptyInputs()}
                    >
                        Registrar
                    </Button>
                    <Button
                        as={Link}
                        href="/login"
                        variant="ghost"
                        color="secondary"
                        className="mb-2"
                    >
                        Cancelar
                    </Button>
                </form>
            </CardBody>
            <Divider />
        </Card>

    );
}
