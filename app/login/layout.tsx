export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex items-center justify-center h-full w-full"
        >
            {/* <section className="flex py-8 px-8"> */}
            {/* <div className="inline-block max-w-lg text-center justify-center"> */}
            <div>
                {children}
            </div>
        </section>
    );
}
