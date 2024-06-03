import React from "react";
import CardsComp from "~/components/cardsComp";
import NavbarComp from "~/components/navbar";

export default function Home() {
  return (
    <div className="h-screen w-screen">
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
