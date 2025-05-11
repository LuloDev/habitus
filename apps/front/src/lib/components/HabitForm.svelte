<script lang="ts">
import type { CreateHabitDto, HabitDto } from "@habitus/validation";

export let habit: Partial<HabitDto | CreateHabitDto> = {};
export let formAction: "?/create" | "?/update";
export let errors: Record<string, string | undefined> | undefined;

let name = habit.name || "";
let description = habit.description || "";
let emoji = habit.emoji || "";
let type = habit.type || "GOOD";
let goalCount = habit.goalCount || undefined;
let goalMeasure = habit.goalMeasure || "";

const goalMeasureTypes = {
	STEPS: "Steps",
	ML: "mL (Water, etc.)",
	KCAL: "Kcal",
	MINUTES: "Minutes",
	REPETITIONS: "Repetitions",
	POINTS: "Points",
	TIMES: "Times",
	KILOMETERS: "Kilometers",
};
</script>

<form method="POST" action={formAction} class="habit-form">
  {#if habit.id}
    <input type="hidden" name="id" value={habit.id} />
  {/if}

  <div class="form-group">
    <label for="habitName">Habit Name</label>
    <input
      type="text"
      id="habitName"
      name="name"
      bind:value={name}
      required
      placeholder="e.g. Read 30 minutes"
    />
    {#if errors?.name}<p class="error-message">{errors.name}</p>{/if}
  </div>

  <div class="form-group">
    <label for="habitDescription">Description (Optional)</label>
    <textarea
      id="habitDescription"
      name="description"
      bind:value={description}
      placeholder="e.g. Read a book on personal development before bed"
    ></textarea>
    {#if errors?.description}<p class="error-message">
        {errors.description}
      </p>{/if}
  </div>

  <div class="form-group">
    <label for="habitEmoji">Emoji (Optional)</label>
    <input
      type="text"
      id="habitEmoji"
      name="emoji"
      bind:value={emoji}
      placeholder="📖"
      maxlength="2"
    />
    {#if errors?.emoji}<p class="error-message">{errors.emoji}</p>{/if}
  </div>

  <div class="form-group">
    <label>Habit Type</label>
    <div class="radio-group">
      <label>
        <input type="radio" name="type" value="GOOD" bind:group={type} /> Good (Encourage)
      </label>
      <label>
        <input type="radio" name="type" value="BAD" bind:group={type} /> Bad (Reduce/Avoid)
      </label>
    </div>
    {#if errors?.type}<p class="error-message">{errors.type}</p>{/if}
  </div>

  <fieldset>
    <legend>Goal (Optional)</legend>
    <div class="form-inline-group">
      <div class="form-group">
        <label for="habitGoalCount">Goal Count</label>
        <input
          type="number"
          id="habitGoalCount"
          name="goalCount"
          bind:value={goalCount}
          min="0"
          placeholder="e.g. 30"
        />
        {#if errors?.goalCount}<p class="error-message">
            {errors.goalCount}
          </p>{/if}
      </div>
      <div class="form-group">
        <label for="habitGoalMeasure">Goal Measure</label>
        <select
          id="habitGoalMeasure"
          name="goalMeasure"
          bind:value={goalMeasure}
        >
          <option value="">-- Select --</option>
          {#each Object.entries(goalMeasureTypes) as [key, label]}
            <option value={key}>{label}</option>
          {/each}
        </select>
        {#if errors?.goalMeasure}<p class="error-message">
            {errors.goalMeasure}
          </p>{/if}
      </div>
    </div>
    <small
      >Define a specific goal for the habit, e.g. Run 5 km, Drink 2000 mL of
      water.</small
    >
  </fieldset>

  <div class="form-actions">
    <a href="/" class="cancel-btn">Cancelar</a>
    <button type="submit" class="save-btn">
      {#if habit.id}Save Changes{:else}Create Habit{/if}
    </button>
  </div>
</form>

<style>
  .habit-form {
    padding: 20px;
  }
  .habit-form .form-group {
    margin-bottom: 18px;
  }
  .habit-form label {
    display: block;
    font-size: 0.9em;
    color: var(--color-text-secondary, #8b949e);
    margin-bottom: 6px;
  }
  .habit-form input[type="text"],
  .habit-form input[type="number"],
  .habit-form textarea,
  .habit-form select {
    width: 100%;
    background-color: var(--color-bg-tertiary, #22272e);
    color: var(--color-text-primary, #c9d1d9);
    border: 1px solid var(--color-border-primary, #30363d);
    border-radius: 6px;
    padding: 10px;
    font-size: 1em;
    box-sizing: border-box;
  }
  .habit-form input[type="text"]:focus,
  .habit-form input[type="number"]:focus,
  .habit-form textarea:focus,
  .habit-form select:focus {
    outline: none;
    border-color: var(--color-accent-blue, #1f6feb);
    box-shadow: 0 0 0 2px rgba(31, 111, 235, 0.3);
  }
  .habit-form textarea {
    min-height: 80px;
    resize: vertical;
  }
  .habit-form .radio-group label {
    display: inline-flex;
    align-items: center;
    margin-right: 15px;
    font-size: 1em;
    color: var(--color-text-primary, #c9d1d9);
    cursor: pointer;
  }
  .habit-form input[type="radio"] {
    margin-right: 8px;
    accent-color: var(--color-accent-blue, #1f6feb);
    width: auto;
    height: 1em;
    vertical-align: middle;
  }
  .habit-form fieldset {
    border: 1px solid var(--color-border-primary, #30363d);
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 18px;
  }
  .habit-form legend {
    padding: 0 10px;
    font-size: 1em;
    font-weight: 500;
    color: var(--color-text-primary, #c9d1d9);
  }
  .habit-form .form-actions {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border-primary, #30363d);
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .habit-form .form-actions button,
  .habit-form .form-actions .cancel-btn {
    padding: 10px 18px;
    font-size: 0.95em;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    transition: background-color 0.2s ease;
  }
  .habit-form .form-actions .save-btn {
    background-color: var(--color-button-bg, #238636);
    color: var(--color-button-text, #ffffff);
    border: 1px solid var(--color-button-bg, #238636);
  }
  .habit-form .form-actions .save-btn:hover {
    background-color: var(--color-button-hover-bg, #2ea043);
  }
  .habit-form .form-actions .cancel-btn {
    background-color: var(--color-button-secondary-bg, #30363d);
    color: var(--color-button-secondary-text, #c9d1d9);
    border: 1px solid var(--color-button-secondary-bg, #30363d);
  }
  .habit-form .form-actions .cancel-btn:hover {
    background-color: var(--color-button-secondary-hover-bg, #484f58);
  }
  .form-inline-group {
    display: flex;
    gap: 15px;
    align-items: flex-end;
  }
  .form-inline-group .form-group {
    flex-grow: 1;
    margin-bottom: 0;
  }
  .habit-form small {
    display: block;
    font-size: 0.8em;
    color: var(--color-text-secondary, #8b949e);
    margin-top: 5px;
  }
  .error-message {
    color: #f14343;
    font-size: 0.8em;
    margin-top: 4px;
  }
</style>
