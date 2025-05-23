<script lang="ts">
import type { HabitInstanceDto } from "@habitus/validation";
import HabitInstance from "./HabitInstance.svelte";

const { habit } = $props();

const daysState = $derived.by(() => {
	const days: { date: Date; instances: HabitInstanceDto[] | null }[] = [];

	const startDate = new Date();
	startDate.setFullYear(startDate.getFullYear() - 1);

	startDate.setDate(startDate.getDate() - startDate.getDay());
	startDate.setHours(0, 0, 0, 0);

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const currentDate = new Date(startDate);

	while (currentDate <= today) {
		const instancesForDay = habit.instances.filter(
			(instance: HabitInstanceDto) => {
				const instanceDate = new Date(instance.date);
				instanceDate.setHours(0, 0, 0, 0);
				return instanceDate.getTime() === currentDate.getTime();
			},
		);
		days.push({
			date: new Date(currentDate),
			instances: instancesForDay,
		});
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return days;
});
</script>

<div class="habit-entry" data-habit-id={habit.id}>
  <div class="habit-info">
    <span class="habit-icon">{habit?.emoji}</span>
    <span class="habit-name">{habit.name}</span>
    <div class="habit-actions">
      <a
        title="Edit"
        href="/habits/{habit.id}"
        data-sveltekit-preload-data="tap">✏️</a
      >
    </div>
  </div>
  <div class="habit-grid-container">
    <div class="habit-grid">
      {#each daysState as day, index}
        <HabitInstance
          {index}
          day={day.date}
          {habit}
          instances={day.instances}
        />
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

  .habit-actions a {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 5px;
    font-size: 1.1em;
  }
  .habit-actions a:hover {
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
