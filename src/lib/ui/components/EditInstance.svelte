<script lang="ts">
  import type { Habit } from "$lib/core/domain/habit";
  import type { HabitInstance } from "$lib/core/domain/habit_instance";

  let { day, top, left, instances, habit, close, save, deleteInstance } = $props<{
    day: Date | string;
    top: number;
    left: number;
    instances: HabitInstance[];
    habit: Habit;
    close: () => void;
    save: (day: Date, habit: Habit, value: number) => void;
    deleteInstance: (instance: HabitInstance) => void;
  }>();

  let inputValue = $derived.by(() => {
    if (!instances || instances.length === 0) return null;
    return instances[0].targetValue;
  });

  const existingInstance = $derived.by(() => {
    if (!instances || instances.length === 0) return null;
    return instances[0] ?? null;
  });
</script>

<div
  class="popover-container"
  role="dialog"
  aria-modal="true"
  aria-labelledby="popover-title"
  style="top: {top}px; left: {left}px;"
>
  <header class="popover-header">
    <h3 id="popover-title">
      {day.toLocaleDateString(undefined, { month: "long", day: "numeric" })}
    </h3>
    <button class="close-button" aria-label="Close" onclick={close}
      >&times;</button
    >
  </header>

  <div class="popover-content">
    <label for="target-value" class="value-label">Register value:</label>
    <input
      type="number"
      id="target-value"
      bind:value={inputValue}
      placeholder="Ex: 10"
      class="value-input"
    />
  </div>
  <footer class="popover-actions">
    {#if existingInstance}
      <button
        class="delete-button"
        aria-label="Delete entry"
        onclick={() => deleteInstance(existingInstance as HabitInstance)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path
            d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM192,208H64V64H192Z"
          ></path>
        </svg>
      </button>
    {/if}
    <div class="spacer"></div>
    <button class="save-button" onclick={() => save(day, habit, inputValue)}>
      {existingInstance ? "Update" : "Create"}
    </button>
  </footer>
</div>

<style>
  .popover-container {
    position: fixed;
    z-index: 1000;
    transform: translateX(-50%);
    background-color: var(--color-bg-primary, white);
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    width: 240px;
    border: 1px solid var(--color-border-primary, #e0e0e0);
    animation: fadeIn 0.15s ease-out;
  }
  .popover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid var(--color-border-primary, #e0e0e0);
  }
  #popover-title {
    font-weight: 600;
    font-size: 14px;
    margin: 0;
  }
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--color-text-secondary);
    padding: 0;
    line-height: 1;
  }
  .popover-content {
    padding: 16px;
  }
  .value-label {
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 4px;
    display: block;
  }
  .value-input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--color-border-primary, #ccc);
    box-sizing: border-box;
  }

  .popover-actions {
    display: flex;
    padding: 8px 12px;
    background-color: var(--color-bg-primary, #f7f7f7);
    border-top: 1px solid var(--color-border-primary, #e0e0e0);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .spacer {
    flex-grow: 1;
  }
  .save-button,
  .delete-button {
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
  }
  .save-button {
    background-color: var(--color-button-bg, #007bff);
    color: white;
  }
  .delete-button {
    background-color: transparent;
    color: var(--color-danger, #dc3545);
    display: flex;
    align-items: center;
  }
  .delete-button:hover {
    background-color: var(--color-danger-hover, #fbebeb);
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }
</style>
