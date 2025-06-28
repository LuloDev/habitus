<script lang="ts">
  import type { Habit } from "$lib/core/domain/habit";
  import Tooltip from "$lib/ui/components/Tooltip.svelte";
  import EditInstance from "$lib/ui/components/EditInstance.svelte";
  import type {
    CreateHabitInstance,
    HabitInstance,
  } from "$lib/core/domain/habit_instance";
  import HabitCard from "$lib/ui/components/Habit.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props<{ data: { habits: Habit[] } }>();

  const habitList = $state(data.habits);
  let currentHabit: null | Habit = $state(null);
  let currentInstance: null | HabitInstance = $state(null);
  let tooltipTop = $state(0);
  let tooltipLeft = $state(0);
  let editTop = $state(0);
  let editLeft = $state(0);

  let editDay = $state<Date | null>(null);
  let editInstances = $state<HabitInstance[] | null>(null);
  let editHabit = $state<Habit | null>(null);

  const handleMouseLeave = () => {
    tooltipTop = 0;
    tooltipLeft = 0;
    currentHabit = null;
    currentInstance = null;
  };

  const handleMouseMove = (
    top: number,
    left: number,
    habit: Habit,
    instance: HabitInstance,
  ) => {
    tooltipTop = top - 70;
    tooltipLeft = left;
    currentHabit = habit;
    currentInstance = instance;
  };

  const handleClose = () => {
    editLeft = 0;
    editTop = 0;
    editDay = null;
    editInstances = null;
    editHabit = null;
  };

  const handleSave = async (day: Date, habit: Habit, value: number) => {
    const habitId = habit.id;
    const response = await fetch("/api/habits/" + habitId + "/instances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: day,
        targetValue: value,
        completed: 1,
      }),
    });
    if (response.ok) {
      const newInstance = await response.json();
      habit.habitInstances.push(newInstance);
      handleClose();
    }
  };

  const handleClick = async (
    habit: Habit,
    day: Date,
    instances: HabitInstance[] | null,
    top: number,
    left: number,
  ) => {
    const habitId = habit.id;

    if (habit.dailyTarget !== null) {
      editInstances = instances;
      editDay = day;
      editTop = top;
      editLeft = left;
      editHabit = habit;
      return;
    }
    if (!instances || instances.length === 0) {
      const newInstance: CreateHabitInstance = {
        date: day,
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

{#if currentHabit && currentInstance}
  <Tooltip
    dailyTarget={(currentHabit as Habit).dailyTarget}
    targetUnit={(currentHabit as Habit).targetUnit}
    actualValue={(currentInstance as HabitInstance).targetValue}
    isComplete={(currentInstance as HabitInstance).completed === 1}
    day={(currentInstance as HabitInstance).date}
    top={tooltipTop}
    left={tooltipLeft}
  />
{/if}

{#if editDay && editInstances && editHabit}
  <EditInstance
    day={editDay}
    habit={editHabit}
    instances={editInstances}
    top={editTop}
    left={editLeft}
    close={handleClose}
    save={handleSave}
  />
{/if}

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
    <HabitCard
      habit={habitList[index]}
      {handleClick}
      {handleMouseMove}
      {handleMouseLeave}
    />
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
