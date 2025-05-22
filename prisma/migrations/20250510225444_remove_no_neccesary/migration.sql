/*
  Warnings:

  - You are about to drop the column `frequencyCount` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `frequencyUnit` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `penaltyPoints` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `rewardPoints` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `timeEstimateMins` on the `Habit` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "icon" TEXT,
    "name" TEXT NOT NULL,
    "emoji" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT 'GOOD',
    "goalCount" INTEGER NOT NULL DEFAULT 1,
    "goalMeasure" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Habit" ("createdAt", "description", "emoji", "goalCount", "goalMeasure", "icon", "id", "name", "type", "updatedAt") SELECT "createdAt", "description", "emoji", "goalCount", "goalMeasure", "icon", "id", "name", "type", "updatedAt" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
