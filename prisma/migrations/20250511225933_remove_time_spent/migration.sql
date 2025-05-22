/*
  Warnings:

  - You are about to drop the column `timeSpentMins` on the `HabitInstance` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HabitInstance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habitId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "goalCount" INTEGER NOT NULL,
    "notes" TEXT,
    CONSTRAINT "HabitInstance_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HabitInstance" ("completed", "date", "goalCount", "habitId", "id", "notes") SELECT "completed", "date", "goalCount", "habitId", "id", "notes" FROM "HabitInstance";
DROP TABLE "HabitInstance";
ALTER TABLE "new_HabitInstance" RENAME TO "HabitInstance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
