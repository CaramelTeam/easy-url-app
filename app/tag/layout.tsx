export default function TagLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <section className="py-8 px-8">
            {/* <div className="inline-block max-w-lg text-center justify-center"> */}
            <div>
                {children}
            </div>
        </section>
    );
}
