'use client';
import { GithubIcon, GoogleIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { UserContextI, useUser } from "@/context/UserContext";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Eye, EyeOff, Mail, XIcon } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useValidateInputs } from '../../hooks/useValidateInputs';
import AboutLayout from '../about/layout';

interface LoginFormValues {
    email: string;
    password: string;
}
export default function LoginPage() {
    const router = useRouter();
    const { handleOnChange, values, handleEmailInputs, handleSpecialCharacters, handleEmptyInputs } = useValidateInputs<LoginFormValues>({
        email: '',
        password: ''
    });

    const [isVisible, setIsVisible] = useState(false);
    const { login, error, setError } = useUser() as UserContextI;
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(values.email, values.password);
        router.push('/');
    }
    return (
        <div
            className="hover:translate-y-[-2px]"
        >
            <div
                className="flex justify-center items-center w-full"
            >
                <img
                    className="h-[200px]"
                    src="https://66d4335c-6df7-4c6f-8489-1a8bdf3a56ff-em-assets.s3.amazonaws.com/assets/common/ufo-pink.svg"
                    alt="ufo login"
                />
            </div>
            <Card
                className="w-96 h-96 hover:shadow-lg"
                style={{
                    boxShadow: '0 8px 16px rgba(95, 95, 95, 0.5)',
                }}
            >
                <CardHeader
                    className="flex flex-col items-start"
                >
                    <h1
                        className="text-tiny uppercase font-bold"
                    >
                        Bienvenido
                    </h1>
                    <div>

                        <small className="text-default-500 mr-1">¿No tienes cuenta?</small>
                        <Link
                            color="foreground"
                            size="sm"
                            style={{ cursor: "pointer" }}
                            href="/signup"
                            onClick={() => setError(false)}
                        >
                            Registrate
                        </Link>
                    </div>
                    {
                        error &&
                        <span
                            className="text-danger mt-2"
                        ><small>No se encontro ninguna coincidencia</small></span>
                    }


                </CardHeader>
                <CardBody
                    className="h-full"
                >
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSumbit}
                    >
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            placeholder="you@example.com"
                            labelPlacement="outside"
                            autoComplete="off"
                            startContent={<Mail />}
                            onChange={handleOnChange}
                            isRequired
                            onInput={handleEmailInputs}
                            isInvalid={error}
                        >
                            Email
                        </Input>
                        <Input
                            type={isVisible ? "text" : "password"}
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            labelPlacement="outside"
                            isRequired
                            isInvalid={error}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    {isVisible ? (
                                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            onChange={handleOnChange}
                            onInput={handleSpecialCharacters}
                        />
                        <Button
                            color="primary"
                            variant="shadow"
                            type="submit"
                            isDisabled={handleEmptyInputs()}
                        >
                            Iniciar sesión
                        </Button>
                    </form>
                </CardBody>
                <Divider />
                <CardFooter>
                    <div
                        className="flex justify-center gap-4 w-full h-12"

                    >
                        <Button
                            isIconOnly
                            variant="light"
                            aria-label='github'
                        >
                            <GithubIcon />
                        </Button>
                        <Button
                            isIconOnly
                            // color=""
                            variant="light"
                            aria-label='google'
                        >
                            <GoogleIcon />
                        </Button>
                        <Button
                            isIconOnly
                            // color=""
                            variant="light"
                            aria-label='google'
                        >
                            <XIcon />
                        </Button>

                    </div>
                </CardFooter>

            </Card>
        </div>
    );
}
