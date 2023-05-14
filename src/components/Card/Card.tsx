type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <section className="mx-auto w-full max-w-[480px] rounded bg-white px-12 py-16">
      {children}
    </section>
  );
}
