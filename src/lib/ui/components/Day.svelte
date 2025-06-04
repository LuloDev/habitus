<script lang="ts">
  import type { Habit } from "$lib/core/domain/habit";
  import type { HabitInstance } from "$lib/core/domain/habit_instance";

  let { index, day, habit, instances } = $props<{
    index: number;
    day: Date;
    instances: HabitInstance[] | null;
    habit: Habit;
  }>();

  let isCompleted = $derived(!!(instances && instances.length > 0));
  let isLoading = $state(false);

  let level = $derived.by(() => {
    //TODO CREATE A ALGORITHM FOR COMPLETION LEVEL
    if (!habit) return 0;

    if (isCompleted) {
      if (
        (habit.goalMeasure === "TIMES" && habit.goalCount === 1) ||
        !habit.goalMeasure ||
        !habit.goalCount
      ) {
        return 4;
      }
      return instances?.length;
    }
    return 0;
  });

  async function handleClick() {
    if (isLoading || !habit) return;

    isLoading = true;
    const tempId = `temp-${crypto.randomUUID()}`;

    const dayClone = new Date(day);
    const now = new Date();
    dayClone.setHours(now.getHours());
    dayClone.setMinutes(now.getMinutes());
    dayClone.setSeconds(now.getSeconds());
    dayClone.setMilliseconds(now.getMilliseconds());

    /*
    const newInstanceData: CreateHabitInstanceDto = {
      date: dayClone.toISOString(),
      goalCount: 1,
      completed: true,
      notes: null,
    };
    const newOptimisticInstance: HabitInstanceDto = {
      ...newInstanceData,
      id: tempId,
      habitId: habit.id,
      date: dayClone,
    };

    habit.instances.push(newOptimisticInstance);
    try {
      const result = await createHabitInstance(habit.id, newInstanceData);
      habit.instances = habit.instances.filter(
        (i) => i.id !== newOptimisticInstance.id,
      );
      if (result.status === "success") {
        habit.instances.push(result.data);
      }
    } catch (e) {
      habit.instances = habit.instances.filter(
        (i) => i.id !== newOptimisticInstance.id,
      );
    } */

    isLoading = false;
  }
</script>

<button
  aria-label="Day {day.getDate()}"
  class="day-square"
  class:good={habit.type === "GOOD"}
  class:bad={habit.type === "BAD"}
  class:neutral={level < 0.5 && level >= 0}
  class:level-1={level < 1 && level >= 0.5}
  class:level-2={level < 2 && level >= 1}
  class:level-3={level < 3 && level >= 2}
  class:level-4={level >= 3}
  data-day-square-index={index}
  data-day-square-level={level}
  data-day-square-title="Day {day.getDate()}"
  onclick={handleClick}
></button>

<style>
  .day-square {
    width: 16px;
    height: 16px;
    background-color: var(--color-good-habit-empty);
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.1s ease-out;
  }
  .day-square:hover {
    transform: scale(1.15);
    border: 1px solid var(--color-text-secondary);
  }

  .day-square.good.level-1 {
    background-color: var(--color-good-habit-level-1);
  }
  .day-square.good.level-2 {
    background-color: var(--color-good-habit-level-2);
  }
  .day-square.good.level-3 {
    background-color: var(--color-good-habit-level-3);
  }
  .day-square.good.level-4 {
    background-color: var(--color-good-habit-level-4);
  }

  .day-square.bad.level-1 {
    background-color: var(--color-bad-habit-level-1);
  }
  .day-square.bad.level-2 {
    background-color: var(--color-bad-habit-level-2);
  }
  .day-square.bad.level-3 {
    background-color: var(--color-bad-habit-level-3);
  }
  .day-square.bad.level-4 {
    background-color: var(--color-bad-habit-level-4);
  }

  .day-square.neutral {
    background-color: var(--color-neutral-square);
  }

  @media (max-width: 768px) {
    .day-square {
      width: 14px;
      height: 14px;
    }
  }
</style>
