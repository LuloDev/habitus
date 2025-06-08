<script lang="ts">
  import type { Habit } from "$lib/core/domain/habit";
  import type {
    CreateHabitInstance,
    HabitInstance,
  } from "$lib/core/domain/habit_instance";
  import HabitCard from "$lib/ui/components/Habit.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props<{ data: { habits: Habit[] } }>();

  const habitList = $state(data.habits);

  const handleClick = async (
    habit: Habit,
    day: Date,
    instances: HabitInstance[] | null,
  ) => {
    const habitId = habit.id;
    if (!instances || instances.length === 0) {
      const newInstance: CreateHabitInstance = {
        date: day.toISOString(),
        completed: 1,
      };
      const response = await fetch("/api/habits/" + habitId + "/instances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInstance),
      });
      if (response.ok) {
        const newInstance = await response.json();
        habit.habitInstances.push(newInstance);
      }
    } else {
      const response = await fetch(
        "/api/habits/" + habitId + "/instances/" + instances[0].id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const newInstance = await response.json();
        habit.habitInstances = habit.habitInstances.filter(
          (instance: HabitInstance) => {
            return instance.id !== newInstance.id;
          },
        );
      }
    }
  };
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
    <HabitCard habit={habitList[index]} {handleClick} />
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
