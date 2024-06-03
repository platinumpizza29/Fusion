import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function CreateRecipe() {
  const handleFormSubmit = async (formData: FormData) => {
    "use server";
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const category = formData.getAll("category");
    const prepTime = formData.getAll("prepTime");
    const cookTime = formData.getAll("cookTime");
    const servings = formData.getAll("servings");
    const author = formData.getAll("author");
    const ingredients = formData.getAll("ingredients");
    const instructions = formData.getAll("instructions");

    const { userId } = auth();

    try {
      const newRecipe = await db.recipe.create({
        data: {
          title: title!,
          userId: userId!,
          description: description!,
          imageUrl: imageUrl!,
          category: category.toString(),
          prepTime: parseInt((prepTime ?? 0).toString()),
          cookTime: parseInt((cookTime ?? 0).toString()),
          servings: parseInt((servings ?? 0).toString()),
          author: author?.toString(),
          ingredients: ingredients.toString(),
          instructions: instructions.toString(),
        },
      });

      if (newRecipe) {
        redirect("/home");
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="mx-4 mt-8 space-y-4 md:mx-12 lg:mx-24">
        <div className="flex items-center justify-start">
          <Link href="/home">
            <IoIosArrowBack className="text-3xl" />
          </Link>
          <h1 className="text-3xl font-bold"> Create a New Recipe </h1>
        </div>
        <form action={handleFormSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium"> Title </label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">Image URL</label>
            <input
              name="imageUrl"
              type="text"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium"> Category </label>
            <input
              name="category"
              type="text"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">
              Prep Time(minutes)
            </label>
            <input
              name="prepTime"
              type="number"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">
              Cook Time(minutes)
            </label>
            <input
              name="cookTime"
              type="number"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium"> Servings </label>
            <input
              name="servings"
              type="number"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium"> Author </label>
            <input
              name="author"
              type="text"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Ingredients </h2>
            <div className="mb-2 flex space-x-4">
              <input
                name="ingredients"
                type="text"
                className="input input-bordered w-full"
                placeholder="Name"
                required
              />

            </div>
          </div>
          <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Steps </h2>
            <div className="mb-2">
              <textarea
                name="instructions"
                className="textarea textarea-bordered w-full"
                placeholder={`Step`}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
