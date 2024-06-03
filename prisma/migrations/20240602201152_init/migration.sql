/*
  Warnings:

  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Recipe` table. All the data in the column will be lost.
  - The `id` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Step` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecipeToRecipeCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servings` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('APPETIZER', 'MAIN_COURSE', 'DESSERT', 'SALAD', 'SOUP', 'BEVERAGE', 'SNACK', 'BREAKFAST');

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToRecipeCategory" DROP CONSTRAINT "_RecipeToRecipeCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToRecipeCategory" DROP CONSTRAINT "_RecipeToRecipeCategory_B_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
DROP COLUMN "image",
DROP COLUMN "userId",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "cookTime" INTEGER NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "ingredients" TEXT[],
ADD COLUMN     "instructions" TEXT[],
ADD COLUMN     "prepTime" INTEGER NOT NULL,
ADD COLUMN     "servings" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "RecipeCategory";

-- DropTable
DROP TABLE "Step";

-- DropTable
DROP TABLE "_RecipeToRecipeCategory";
