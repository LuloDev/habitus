
import type { Habit } from '$lib/core/domain/habit';

/**
 * Represents the configuration for a specific integration.
 * It's a flexible object to store any key-value pairs.
 */
export type IntegrationConfig = {
	[key: string]: unknown;
};

/**
 * The value returned by a sync operation.
 * It can be a number, a string, or a boolean based on the integration's nature.
 */
export type SyncedValue = number | string | boolean;

export type SyncedData = Map<string, SyncedValue>;

/**
 * Interface for a synchronization strategy.
 * Each integration (Home Assistant, Strava, etc.) will implement this contract.
 */
export interface SyncIntegration {
	/**
	 * Synchronizes data for a given habit over a specific period.
	 * @param habit The habit to sync.
	 * @param startDate The start date of the sync period.
	 * @param endDate The end date of the sync period.
	 * @returns A promise that resolves to a map where keys are ISO date strings (YYYY-MM-DD)
	 *          and values are the synced values for that day.
	 */
	sync(habit: Habit, startDate: Date, endDate: Date): Promise<SyncedData>;
}
