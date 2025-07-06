
import type { Habit } from "$lib/core/domain/habit";
import type { SyncIntegration, SyncedData } from "./types";
import { env } from "../../env";

export class HomeAssistantSyncStrategy implements SyncIntegration {
  public async sync(habit: Habit, startDate: Date, endDate: Date): Promise<SyncedData> {
    if (!habit.integrationConfig) {
      throw new Error("Home Assistant integration not configured for this habit.");
    }

    const { entity_id, property } = habit.integrationConfig as {
      entity_id: string;
      property?: string;
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

    for (const state of entityHistory) {
      const date = new Date(state.last_changed).toISOString().split("T")[0];
      const value = property ? state.attributes[property] : state.state;
      const parsedValue = parseFloat(value);
      syncedData.set(date, isNaN(parsedValue) ? 0 : parsedValue);
    }

    return syncedData;
  }
}
