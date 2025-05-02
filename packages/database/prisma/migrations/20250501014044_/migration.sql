/*
  Warnings:

  - Made the column `goalMeasure` on table `Habit` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT 'GOOD',
    "frequencyUnit" TEXT NOT NULL DEFAULT 'DAY',
    "frequencyCount" INTEGER NOT NULL DEFAULT 1,
    "goalCount" INTEGER NOT NULL DEFAULT 1,
    "goalMeasure" TEXT NOT NULL,
    "timeEstimateMins" INTEGER DEFAULT 0,
    "rewardPoints" INTEGER NOT NULL DEFAULT 0,
    "penaltyPoints" INTEGER NOT NULL DEFAULT 0,
    "autoComplete" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Habit_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Habit" ("autoComplete", "categoryId", "createdAt", "description", "frequencyCount", "frequencyUnit", "goalCount", "goalMeasure", "id", "name", "penaltyPoints", "rewardPoints", "timeEstimateMins", "type", "updatedAt") SELECT "autoComplete", "categoryId", "createdAt", "description", "frequencyCount", "frequencyUnit", "goalCount", "goalMeasure", "id", "name", "penaltyPoints", "rewardPoints", "timeEstimateMins", "type", "updatedAt" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
