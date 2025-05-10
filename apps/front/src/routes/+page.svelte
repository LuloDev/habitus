<script lang="ts">
import Habit from "$lib/components/Habit.svelte";
import type { HabitWithInstancesDto } from "@habitus/validation";

export let data: { habits: HabitWithInstancesDto[] };
</script>

<main class="habits-list" id="habitsList">
  {#each data.habits as habit}
    <Habit {habit} />
  {/each}
</main>

<style>
  .habits-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>
