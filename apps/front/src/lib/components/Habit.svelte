<script lang="ts">
  import type {
    HabitInstanceDto,
    HabitWithInstancesDto,
  } from "@habitus/validation";
  import HabitInstance from "./HabitInstance.svelte";

  export let habit: HabitWithInstancesDto;
  const days: { date: Date; instances: HabitInstanceDto[] | null }[] = [];

  for (let i = 364; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const instances = habit.instances.filter(
      (instance) =>
        instance.date.getDay() === date.getDay() &&
        instance.date.getMonth() === date.getMonth() &&
        instance.date.getFullYear() === date.getFullYear(),
    );
    if (instances) {
      days.push({
        date,
        instances,
      });
    } else {
      days.push({
        date,
        instances: null,
      });
    }
  }
</script>

<div class="habit-entry" data-habit-id={habit.id}>
  <div class="habit-info">
    <span class="habit-icon">🍺</span>
    <span class="habit-name">{habit.name}</span>
    <div class="habit-actions">
      <button title="Edit">✏️</button>
    </div>
  </div>
  <div class="habit-grid-container">
    <div class="habit-grid">
      {#each days as day, index}
        <HabitInstance typeHabit={habit.type} {index} {day} />
      {/each}
    </div>
  </div>
</div>

<style>
  .habit-entry {
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border-primary);
    border-radius: 6px;
    padding: 15px 20px;
  }

  .habit-info {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .habit-icon {
    font-size: 1.5em;
    margin-right: 12px;
  }

  .habit-name {
    font-size: 1.25em;
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .habit-actions {
    margin-left: auto;
  }

  .habit-actions button {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 5px;
    font-size: 1.1em;
  }
  .habit-actions button:hover {
    color: var(--color-accent-blue);
  }

  .habit-grid-container {
    overflow-x: auto;
    padding-bottom: 5px;
  }

  .habit-grid {
    display: grid;
    grid-template-rows: repeat(7, 16px);
    grid-auto-flow: column;
    grid-auto-columns: 16px;
    gap: 3px;
    min-width: calc(52 * (16px + 3px));
  }
</style>
