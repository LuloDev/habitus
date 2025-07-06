
import type { Habit } from "$lib/core/domain/habit";
import type { SyncIntegration, SyncedData } from "./types";
import { env } from "../../env";

export class HomeAssistantSyncStrategy implements SyncIntegration {
  public async sync(habit: Habit, startDate: Date, endDate: Date): Promise<SyncedData> {
    if (!habit.integrationConfig) {
      throw new Error("Home Assistant integration not configured for this habit.");
    }

    const { entity_id, property, state_value, state_regex } = habit.integrationConfig as {
      entity_id: string;
      property?: string;
      state_value?: string;
      state_regex?: string;
    };

    if (!entity_id) {
      throw new Error("Missing entity_id in Home Assistant configuration.");
    }

    const historyUrl = `${env.HOME_ASSISTANT_URL}/api/history/period/${startDate.toISOString()}?end_time=${endDate.toISOString()}&filter_entity_id=${entity_id}`;

    const response = await fetch(historyUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${env.HOME_ASSISTANT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch history from Home Assistant: ${response.statusText}`);
    }

    const history = await response.json();
    const syncedData: SyncedData = new Map();

    if (!history || history.length === 0) {
      return syncedData;
    }

    const entityHistory = history[0];
    if (!entityHistory || entityHistory.length === 0) {
      return syncedData;
    }

    if (state_value || state_regex) {
      for (let i = 0; i < entityHistory.length - 1; i++) {
        const currentState = entityHistory[i];
        const nextState = entityHistory[i + 1];

        const stateMatches = state_regex
          ? new RegExp(state_regex).test(currentState.state)
          : currentState.state === state_value;

        if (stateMatches) {
          const startTime = new Date(currentState.last_changed);
          const endTime = new Date(nextState.last_changed);
          let duration = endTime.getTime() - startTime.getTime();

          let currentDate = new Date(startTime);
          currentDate.setHours(0, 0, 0, 0);

          while (duration > 0) {
            const dayKey = currentDate.toISOString().split('T')[0];
            const endOfDay = new Date(currentDate);
            endOfDay.setHours(23, 59, 59, 999);

            const remainingTimeInDay = Math.min(duration, endOfDay.getTime() - startTime.getTime());

            const currentSyncData = syncedData.get(dayKey) || 0;
            syncedData.set(dayKey, Number(currentSyncData) + remainingTimeInDay);

            duration -= remainingTimeInDay;
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      }

      // Convert milliseconds to minutes for each day
      for (const [key, value] of syncedData.entries()) {
        syncedData.set(key, Math.round(Number(value) / (1000 * 60)));
      }
    } else {
      for (const state of entityHistory) {
        const date = new Date(state.last_changed).toISOString().split("T")[0];
        const value = property ? state.attributes[property] : state.state;
        const parsedValue = parseFloat(value);
        syncedData.set(date, isNaN(parsedValue) ? 0 : parsedValue);
      }
    }

    return syncedData;
  }
}
