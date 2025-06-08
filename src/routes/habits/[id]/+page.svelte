<script lang="ts">
  import HabitForm from "$lib/ui/components/HabitForm.svelte";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

<div class="page-container">
  <header class="page-header">
    <h1>Editar Hábito: {data.habit?.name || "Loading..."}</h1>
  </header>

  <div class="form-wrapper">
    {#if data.habit}
      <HabitForm
        habit={data.habit}
        formAction="?/update"
        errors={form?.errors}
      />
    {:else}
      <p>loading habit o habit not found...</p>
    {/if}
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
