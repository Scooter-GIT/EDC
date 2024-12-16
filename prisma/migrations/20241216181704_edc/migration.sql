/*
  Warnings:

  - You are about to drop the column `parentId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `clickCount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `lastChecked` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `primeEligible` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ComparisonItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PriceHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SearchLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SyncLog` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specifications` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "ComparisonItem" DROP CONSTRAINT "ComparisonItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropForeignKey
ALTER TABLE "SearchLog" DROP CONSTRAINT "SearchLog_productId_fkey";

-- DropIndex
DROP INDEX "Category_slug_key";

-- DropIndex
DROP INDEX "Product_asin_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parentId",
DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "clickCount",
DROP COLUMN "featured",
DROP COLUMN "isActive",
DROP COLUMN "lastChecked",
DROP COLUMN "primeEligible",
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "specifications" SET NOT NULL;

-- DropTable
DROP TABLE "ComparisonItem";

-- DropTable
DROP TABLE "PriceHistory";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "SearchLog";

-- DropTable
DROP TABLE "SyncLog";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
