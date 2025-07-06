
import type { Habit } from "$lib/core/domain/habit";
import { HomeAssistantSyncStrategy } from "./home_assistant";
import type { SyncIntegration } from "./types";

export class IntegrationFactory {
    public static create(habit: Habit): SyncIntegration {
        switch (habit.integrationType) {
            case "home_assistant":
                return new HomeAssistantSyncStrategy();
            // Add other integrations here in the future
            // case "strava":
            //     return new StravaSyncStrategy();
            default:
                throw new Error(`Unknown integration type: ${habit.integrationType}`);
        }
    }
}
