<script lang="ts">
  import type { Habit } from "$lib/core/domain/habit";
  import type { HabitInstance } from "$lib/core/domain/habit_instance";

  let {
    index,
    day,
    habit,
    instances,
    handleClick,
    handleMouseMove,
    handleMouseLeave,
  } = $props<{
    index: number;
    day: Date;
    instances: HabitInstance[] | null;
    habit: Habit;
    handleClick: (
      habit: Habit,
      day: Date,
      instance: HabitInstance[] | null,
      top: number,
      left: number,
    ) => void;
    handleMouseMove: (
      top: number,
      left: number,
      habit: Habit,
      instance: HabitInstance,
    ) => void;
    handleMouseLeave: () => void;
  }>();

  let buttonEl: HTMLButtonElement;

  const getTotalValue = (instances: HabitInstance[] | null) => {
    if (instances === null || instances.length === 0) {
      return 0;
    }
    return instances.reduce(
      (acc: number, curr: HabitInstance) =>
        acc + (curr.targetValue ? curr.targetValue : 0),
      0,
    );
  };

  let level = $derived.by(() => {
    if (!habit) return 0;

    if (habit.dailyTarget === null) {
      if (instances === null || instances.length === 0) {
        return 0;
      }
      return instances.some((i: HabitInstance) => i.completed) ? 1 : 0;
    }
    if (instances === null || instances.length === 0) {
      return 0;
    }
    const total = getTotalValue(instances);
    return total / habit.dailyTarget;
  });
</script>

<button
  bind:this={buttonEl}
  aria-label="Day {day.getDate()}"
  class="day-square"
  class:good={habit.type === "GOOD"}
  class:bad={habit.type === "BAD"}
  class:neutral={level === 0}
  class:level-1={level > 0 && level <= 0.25}
  class:level-2={level > 0.25 && level <= 0.5}
  class:level-3={level > 0.5 && level <= 0.75}
  class:level-4={level > 0.75}
  data-day-square-index={index}
  data-day-square-level={level}
  data-day-square-title="Day {day.getDate()}"
  onclick={() =>
    handleClick(
      habit,
      day,
      instances,
      buttonEl?.getBoundingClientRect().top,
      buttonEl?.getBoundingClientRect().left,
    )}
  onmouseleave={() => handleMouseLeave()}
  onmouseenter={() =>
    handleMouseMove(
      buttonEl?.getBoundingClientRect().top,
      buttonEl?.getBoundingClientRect().left,
      habit,
      instances[0],
    )}
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
