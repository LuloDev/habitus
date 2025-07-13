<script lang="ts">
  import type { Habit } from "$lib/core/domain/habit";
  import type { HabitInstance } from "$lib/core/domain/habit_instance";
  import Day from "./Day.svelte";
  import SyncIcon from "./icons/SyncIcon.svelte";
  import CheckIcon from "./icons/CheckIcon.svelte";
  import ErrorIcon from "./icons/ErrorIcon.svelte";

  const { habit, handleClick, handleMouseMove, handleMouseLeave, onSync, syncing, syncStatus } = $props<{
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
    onSync: (habit: Habit) => Promise<void>;
    syncing: boolean;
    syncStatus: "success" | "error" | null;
  }>();

  

  const daysState = $derived.by(() => {
    const days: { date: Date; instances: HabitInstance[] | null }[] = [];

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);

    startDate.setDate(startDate.getDate() - startDate.getDay());
    startDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDate = new Date(startDate);

    while (currentDate <= today) {
      const instancesForDay = [
        ...habit.habitInstances.filter((instance: HabitInstance) => {
          const instanceDate = new Date(instance.date);
          instanceDate.setHours(0, 0, 0, 0);
          return instanceDate.getTime() === currentDate.getTime();
        }),
      ];
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
    {#if habit.integrationType}
      <button
        class="sync-button"
        class:syncing={syncing && !syncStatus}
        class:sync-success={syncStatus === "success"}
        class:sync-error={syncStatus === "error"}
        title="Sync"
        onclick={() => onSync(habit)}
        disabled={syncing}
      >
        {#if syncing && !syncStatus}
          <SyncIcon />
        {:else if syncStatus === "success"}
          <CheckIcon />
        {:else if syncStatus === "error"}
          <ErrorIcon />
        {:else}
          <SyncIcon />
        {/if}
      </button>
    {/if}
    <div class="habit-actions">
      <a
        title="Edit"
        href="/habits/{habit.id}"
        data-sveltekit-preload-data="tap">Edit</a
      >
    </div>
  </div>
  <div class="habit-grid-container">
    <div class="habit-grid">
      {#each daysState as day, index (day.date.getTime())}
        <Day
          {index}
          {habit}
          day={day.date}
          instances={day.instances ? [...day.instances] : null}
          {handleClick}
          {handleMouseMove}
          {handleMouseLeave}
        />
      {/each}
    </div>
  </div>
</div>

<style>
  .habit-entry {
    position: relative;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border-primary);
    border-radius: 6px;
    padding: 15px 20px;
  }

  .sync-button {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0 5px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    vertical-align: middle;
  }

  .habit-entry:hover .sync-button {
    opacity: 1;
  }

  .sync-button.syncing {
    opacity: 1;
    animation: spin 1s linear infinite;
  }

  .sync-button.sync-success {
    color: var(--color-success, #28a745);
    opacity: 1;
  }

  .sync-button.sync-error {
    color: var(--color-danger, #dc3545);
    opacity: 1;
  }

  .sync-button:disabled {
    cursor: not-allowed;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
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
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .habit-entry:hover .habit-actions {
    opacity: 1;
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
