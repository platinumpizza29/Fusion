import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";

export default async function Home() {
  const categories = await db.category.findMany({
    include: {
      RecipeCategory: {
        include: {
          Recipe: true,
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.id}>
          <h2 className="mb-4 text-2xl font-bold">{category.name}</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {category.RecipeCategory.map((recipeCategory) => {
              const recipe = recipeCategory.Recipe;
              return (
                <Link href={`/home/${recipe.id}`} key={recipe.id}>
                  <div className="w-64 flex-none">
                    <div className="relative h-40 w-64">
                      <Image
                        src={recipe.imageUrl}
                        layout="fill"
                        objectFit="cover"
                        alt="Food Image"
                        className="rounded-xl"
                      />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {recipe.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      {recipe.cookTime} mins
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
