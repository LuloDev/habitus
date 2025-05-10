import { type Prisma, PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const habits: Prisma.HabitCreateInput[] = [
    {
      name: "Drink water",
      description: "Drink water",
      frequencyUnit: "MONTH",
      type: "GOOD",
      goalMeasure: "ML",
      goalCount: 35,
    },
    {
      name: "Exercise",
      description: "Exercise",
      frequencyUnit: "DAY",
      type: "GOOD",
      goalMeasure: "TIMES",
      goalCount: 1,
    },
    {
      name: "Social media",
      description: "Social media",
      frequencyUnit: "DAY",
      type: "BAD",
      goalMeasure: "MINUTES",
      goalCount: 90,
    },
  ];
  for (const habit of habits) {
    const habitCreated = await prisma.habit.create({
      data: habit,
    });
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 12));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    while (date <= today) {
      const random = Math.floor(Math.random() * 2);
      const instances: Prisma.HabitInstanceCreateManyInput[] = [];
      for (let i = 0; i < random; i++) {
        const instance: Prisma.HabitInstanceCreateManyInput = {
          habitId: habitCreated.id,
          date: date,
          completed: true,
          goalCount: Math.floor(Math.random() * (habit.goalCount ?? 10)),
        };
        instances.push(instance);
      }
      await prisma.habitInstance.createMany({
        data: instances,
      });
      date.setDate(date.getDate() + 1);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
