<script lang="ts">
  import Habit from "$lib/components/Habit.svelte";
  import type { HabitWithInstancesDto } from "@habitus/validation";

  export let data: { habits: HabitWithInstancesDto[] };
</script>

{#each data.habits as habit}
  <Habit {habit} />
{/each}
