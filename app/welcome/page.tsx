import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";

export default function WelcomePage() {
    return (
        <div
            className=" w-full h-full rounded-lg shadow-lg bg-content1 p-4"
        >
            <div
                className="mb-4"
            >
                <h1 className={`text-3xl font-bold text-primary`} >¡Gracias por registrarte en LinkHub!</h1>
            </div>
            <div
                className="mb-4 text-center"
            >
                <p className="text-lg" >Nos alegra que te unas a nuestra plataforma de gestión de URLs.</p>
                <p className="text-lg" >Tendrás acceso a herramientas que harán que el manejo y la organización de tus enlaces sea más fácil y practico.</p>
                {/* <p className="text-lg" >Explora nuestras funciones para organizar tus URLs de manera rápida y segura.</p>
                <p className="text-lg " >Nuestro equipo trabaja constantemente en mejorar y actualizar la plataforma, añadiendo nuevas funciones y optimizando la experiencia para que siempre tengas las mejores herramientas a tu alcance.</p> */}
            </div>
            <Divider />
            <div
                className="mt-4"
            >
                <p className="font-bold text-2xl text-primary my-4" >¿Listo para empezar?</p>
                <p className="text-lg" > Inicia sesión y comienza a optimizar tu experiencia con los enlaces.</p>
            </div>
            <Button
                variant="shadow"
                color="primary"
                fullWidth
                className="my-4"
                as={Link}
                href="/login"
            >
                Iniciar sesión
            </Button>
        </div>
    );
}
