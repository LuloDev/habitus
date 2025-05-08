<script lang="ts">
import HabitInstance from "./HabitInstance.svelte";

const habit = {
	id: "9b3016a9-79ae-48ec-9ba5-d0b1cc949071",
	name: "Drink WATHER",
	description: "Drink more than 1 litre of water per day",
	type: "GOOD",
	frequencyCount: 1,
	goalCount: 1000,
	instances: [] as any[],
	frequencyUnit: "DAY",
	goalMeasure: "ML",
	penaltyPoints: 2,
	rewardPoints: 0,
	timeEstimateMins: null,
};

for (let i = 0; i < 364; i++) {
	habit.instances.push({
		id: "e595fda1-c4d0-4550-92be-89ca0102e403",
		habitId: "b6460c07-a1fb-4e5c-8b6d-eae18be678f2",
		date: "2025-05-04T01:03:35.430Z",
		completed: true,
		goalCount: 0,
		timeSpentMins: 0,
		notes: "",
	});
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
      {#each habit.instances as instance, index}
        <HabitInstance {instance} typeHabit={habit.type} {index} />
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
    grid-template-columns: repeat(52, 16px);
    grid-auto-rows: 16px;
    gap: 3px;
    min-width: calc(52 * (16px + 3px));
  }
</style>
