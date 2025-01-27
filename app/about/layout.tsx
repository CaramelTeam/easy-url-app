export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center">
      {/* // <section className="justify-center w-full bg-white h-full"> */}
      <div>
        {children}
      </div >
    </section >
  );
}
