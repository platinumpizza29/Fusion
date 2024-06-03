import Image from "next/image";
import Link from "next/link";
import { GiHotMeal } from "react-icons/gi";
import { ImSpoonKnife } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import NavbarComp from "~/components/navbar";
import { db } from "~/server/db";

interface GetServerSidePropsContext {
  params: { id: string }; // Type the context object
}

export default async function RecipePage(context: GetServerSidePropsContext) {
  const id = parseInt(context.params.id);

  const getRecipe = await db.recipe.findUnique({
    where: {
      id: id,
    },
  });

  const instructions: string[] | undefined = getRecipe?.instructions.split(",");
  const ingredients: string[] | undefined = getRecipe?.ingredients.split(",");

  ("use client");
  return (
    <div className="h-screen w-screen">
      <NavbarComp />
      <div className="mx-4 space-y-6 p-8 md:mx-12 lg:mx-24">
        <Link href="/home">
          <IoIosArrowBack className="text-3xl" />
        </Link>
        <div className="relative h-96 w-full">
          {getRecipe?.imageUrl && (
            <Image
              src={getRecipe.imageUrl}
              layout="fill"
              objectFit="cover"
              alt="Food Image"
              loading="lazy"
              className="rounded-xl"
            />
          )}
        </div>
        <h1 className="text-7xl">{getRecipe?.title}</h1>
        <p>{getRecipe?.description}</p>
        {/* cook time prep time div */}
        <div className="flex flex-col justify-evenly space-y-2 rounded-lg bg-base-200 p-4 md:flex-row">
          <p className="flex flex-row items-center justify-start gap-2 text-lg">
            <IoTimeOutline className="text-2xl" />
            Cooktime : {getRecipe?.cookTime} mins
          </p>
          <p className="flex flex-row items-center justify-start gap-2 text-lg">
            <GiHotMeal className="text-2xl" />
            PrepTime : {getRecipe?.prepTime} mins
          </p>
          <p className="flex flex-row items-center justify-start gap-2 text-lg">
            <ImSpoonKnife className="text-2xl" />
            Serves : {getRecipe?.servings} person
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-pretty text-2xl text-primary">Ingredients</h1>
            <div className="space-y-2 text-wrap p-4">
              {ingredients?.map((item, index) => (
                <ul key={index} className="list-disc text-pretty">
                  <li className="text-wrap">{item}</li>
                </ul>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-pretty text-2xl text-primary">Instructions</h1>
            <div className="space-y-2 text-wrap p-4">
              {instructions?.map((item, index) => (
                <ul key={index} className="list-disc text-pretty">
                  <li>{item}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>
        <button className="btn btn-outline btn-primary w-full">
          Shopping List
        </button>
      </div>
    </div>
  );
}
