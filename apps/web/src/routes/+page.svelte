<script lang="ts">
import Habit from "$lib/components/Habit.svelte";
import type { HabitWithInstancesDto } from "@habitus/validation";

const { data } = $props<{ data: { habits: HabitWithInstancesDto[] } }>();

const habitList = $state(data.habits);
</script>

<header>
  <a
    data-sveltekit-preload-data="tap"
    href="/habits/new"
    class="add-habit-button"
    id="openAddHabitModalBtn">Add Habit</a
  >
</header>
<main class="habits-list" id="habitsList">
  {#each habitList as _habit, index}
    <Habit habit={habitList[index]} />
  {/each}
</main>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--color-border-primary);
  }

  .add-habit-button {
    background-color: var(--color-button-bg);
    color: var(--color-button-text);
    border: 1px solid var(--color-button-bg);
    padding: 8px 16px;
    font-size: 0.9em;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition:
      background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out;
  }
  .add-habit-button:hover {
    background-color: var(--color-button-hover-bg);
    border-color: var(--color-button-hover-bg);
  }
  .habits-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>
