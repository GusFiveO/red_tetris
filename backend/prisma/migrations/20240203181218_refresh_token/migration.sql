/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Player` table. All the data in the column will be lost.
  - Added the required column `refreshToken` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "accessToken",
ADD COLUMN     "refreshToken" TEXT NOT NULL;
