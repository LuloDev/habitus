<script lang="ts">
export let instance: any;
export let index: number;
export let typeHabit: string = "GOOD";

const level = Math.floor(Math.random() * 4) + 1;
</script>

<div
  class="day-square"
  class:good={typeHabit === "GOOD"}
  class:bad={typeHabit === "BAD"}
  class:neutral={level < 0.5 && level >= 0}
  class:level-1={level < 1 && level >= 0.5}
  class:level-2={level < 2 && level >= 1}
  class:level-3={level < 3 && level >= 2}
  class:level-4={level < 4 && level >= 3}
  data-day-square-id={instance.id}
  data-day-square-index={index}
  data-day-square-level={level}
  data-day-square-title="Day {index}"
></div>

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
