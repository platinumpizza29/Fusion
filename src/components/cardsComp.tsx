import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";

export default async function CardsComp() {
  const recipes = await db.recipe.findMany();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((item, index) => (
        <div
          className="card bordered h-96 w-full bg-base-100 shadow-xl"
          key={index}
        >
          <figure className="relative h-96 w-full">
            <Image
              layout="fill"
              objectFit="cover"
              alt="Food Image"
              loading="lazy"
              className="h-96"
              src={item.imageUrl}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p>{item.description}</p>
            <div className="card-actions justify-end">
              <Link href={`/home/${item.id}`} className="btn btn-primary">
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
