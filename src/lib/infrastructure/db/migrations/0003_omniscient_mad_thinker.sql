PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_habit_instances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`habit_id` integer NOT NULL,
	`date` text NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`traget_value` integer,
	`notes` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`habit_id`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_habit_instances`("id", "habit_id", "date", "completed", "traget_value", "notes", "created_at", "updated_at") SELECT "id", "habit_id", "date", "completed", "traget_value", "notes", "created_at", "updated_at" FROM `habit_instances`;--> statement-breakpoint
DROP TABLE `habit_instances`;--> statement-breakpoint
ALTER TABLE `__new_habit_instances` RENAME TO `habit_instances`;--> statement-breakpoint
PRAGMA foreign_keys=ON;