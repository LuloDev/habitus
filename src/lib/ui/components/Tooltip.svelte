<script lang="ts">
  let { day, dailyTarget, actualValue, isComplete, top, left } = $props<{
    day: Date | string;
    dailyTarget: number | null;
    actualValue: number | null;
    isComplete: boolean | null;
    top: number;
    left: number;
  }>();
  let dayState = $state(day);
  const date = $derived.by(() => {
    if (typeof dayState === "string") {
      return new Date(dayState).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return dayState.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
</script>

<div class="tooltip" role="tooltip" style="top: {top}px; left: {left}px;">
  <span class="tooltip-date">
    {date}
  </span>
  {#if dailyTarget !== null}
    <span class="tooltip-progress">
      Progreso: {actualValue} / {dailyTarget}
    </span>
  {:else}
    <span class="tooltip-progress">
      Complete: {isComplete ? "Yes" : "No"}
    </span>
  {/if}
</div>

<style>
  .tooltip {
    position: absolute;
    transform: translateX(-50%);
    margin-bottom: 8px;
    background-color: hsl(0 0% 15%);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    z-index: 10;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 500;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);

    animation: fadeIn 0.1s ease-out;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: hsl(0 0% 15%) transparent transparent transparent;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
</style>
