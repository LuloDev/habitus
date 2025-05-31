PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_habits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`emoji` text,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`type` text NOT NULL,
	`daily_target` integer,
	`target_unit` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_habits`("id", "emoji", "name", "description", "type", "daily_target", "target_unit", "created_at", "updated_at") SELECT "id", "emoji", "name", "description", "type", "daily_target", "target_unit", "created_at", "updated_at" FROM `habits`;--> statement-breakpoint
DROP TABLE `habits`;--> statement-breakpoint
ALTER TABLE `__new_habits` RENAME TO `habits`;--> statement-breakpoint
PRAGMA foreign_keys=ON;