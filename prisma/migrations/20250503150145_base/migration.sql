-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "icon" TEXT,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HabitInstance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habitId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "goalCount" INTEGER NOT NULL,
    "timeSpentMins" INTEGER DEFAULT 0,
    "notes" TEXT,
    CONSTRAINT "HabitInstance_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
