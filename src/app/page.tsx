import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavbarComp from "~/components/navbar";

export default function HomePage() {
  const { userId } = auth();

  if (userId) {
    redirect("/home");
  }

  return (
    <main className="h-screen w-screen">
      <NavbarComp />
      <section className="h-3/4 w-full space-y-4 bg-green-800  p-20 text-white">
        <h1 className="flex flex-col text-start text-4xl font-bold md:text-6xl">
          <span>Easiest Way </span>
          <span>to Make Your </span>
          <span>Favorite Meal</span>
        </h1>
        <button className="btn btn-success">Explore more</button>
      </section>
    </main>
  );
}
