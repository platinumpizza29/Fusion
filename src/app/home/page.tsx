import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import CardsComp from "~/components/cardsComp";
import NavbarComp from "~/components/navbar";

export default function Home() {
  const { userId } = auth();
  console.log(userId);

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="h-screen w-screen overflow-auto">
      <NavbarComp />
      <div className="p-10 text-5xl">
        <h1>Discover the best recipes</h1>
      </div>
      <section className="p-2 md:p-10">
        <CardsComp />
      </section>
    </div>
  );
}
