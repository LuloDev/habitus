<script lang="ts">
import HabitForm from "$lib/components/HabitForm.svelte";
import type { ActionData } from "./$types";

export let form: ActionData;
</script>

<div class="page-container">
  <header class="page-header">
    <h1>Create a New Habit</h1>
  </header>

  <div class="form-wrapper">
    <HabitForm formAction="?/create" errors={form?.errors} />
  </div>
</div>

<style>
  .page-container {
    max-width: 700px;
    margin: 20px auto;
    padding: 20px;
    background-color: var(--color-bg-secondary, #161b22);
    border-radius: 8px;
    border: 1px solid var(--color-border-primary, #30363d);
  }
  .page-header {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--color-border-primary, #30363d);
  }
  .page-header h1 {
    margin: 0;
    font-size: 1.6em;
    color: var(--color-text-primary, #c9d1d9);
  }
</style>
