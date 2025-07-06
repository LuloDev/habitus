import type { CreateHabit, UpdateHabit } from "./core/domain/habit";

export function transformHabit(form: FormData, id?: number): UpdateHabit | CreateHabit {
  const name = (form.get("name") as string);
  const description = (form.get("description") as string);
  const targetValue = (form.get("dailyTarget"));
  const type = (form.get("type") as 'GOOD' | 'BAD');
  const emoji = (form.get("emoji") as string);
  const targetUnit = (form.get("targetUnit") as string);
  const integrationType = (form.get("integrationType") as string);
  const entityId = (form.get("entityId") as string);
  const entityProperty = (form.get("entityProperty") as string);
  const stateValue = (form.get("entityStateValue") as string);
  const stateRegex = (form.get("entityStateRegex") as string);
  const habit: UpdateHabit | CreateHabit = {
    id,
    name,
    description,
    type
  };
  if (typeof targetValue === 'string' && targetValue.length > 0) {
    habit.dailyTarget = Number(targetValue);
  } else {
    habit.dailyTarget = null;
  }
  if (typeof emoji === 'string' && emoji.length > 0) {
    habit.emoji = emoji;
  } else {
    habit.emoji = '';
  }
  if (typeof targetUnit === 'string' && targetUnit.length > 0) {
    habit.targetUnit = targetUnit;
  } else {
    habit.targetUnit = null;
  }

  if (integrationType) {
    habit.integrationType = integrationType;
    habit.integrationConfig = {
      entity_id: entityId,
      property: entityProperty,
      state_value: stateValue,
      state_regex: stateRegex
    };
  } else {
    habit.integrationType = null;
    habit.integrationConfig = null;
  }
  return habit;
}
