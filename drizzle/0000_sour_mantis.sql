CREATE TABLE `psicobooking_activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`psychologist_id` integer NOT NULL,
	`patient_id` integer NOT NULL,
	`document` text,
	`title` text NOT NULL,
	`description` text,
	`status` text,
	`date_from` integer NOT NULL,
	`date_to` integer,
	FOREIGN KEY (`psychologist_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`patient_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_appointment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`psychologist_id` integer NOT NULL,
	`patient_id` integer NOT NULL,
	`session_type` text NOT NULL,
	`informed_consent` integer,
	`state` text NOT NULL,
	`date_from` integer NOT NULL,
	`date_to` integer,
	FOREIGN KEY (`psychologist_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`patient_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_audio` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`appointment_id` integer NOT NULL,
	`audio` text,
	`title` text,
	`transcription` text,
	FOREIGN KEY (`patient_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`appointment_id`) REFERENCES `psicobooking_appointment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_availability` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clinic_id` integer NOT NULL,
	`psychologist_id` integer NOT NULL,
	`day_of_week` integer NOT NULL,
	`hour_from` text NOT NULL,
	`hour_to` text NOT NULL,
	FOREIGN KEY (`clinic_id`) REFERENCES `psicobooking_clinic`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`psychologist_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_benefit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level_name` text NOT NULL,
	`min_months` integer NOT NULL,
	`max_months` integer,
	`benefit_description` text NOT NULL,
	`discount_percentage` integer,
	`image_url` text
);
--> statement-breakpoint
CREATE TABLE `psicobooking_clinic_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`title` text,
	`content` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`patient_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_clinic` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `psicobooking_comment_activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`activity_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`content` text NOT NULL,
	`published_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`activity_id`) REFERENCES `psicobooking_activity`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_comment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`replyTo` integer,
	`content` text NOT NULL,
	`likes` integer DEFAULT 0 NOT NULL,
	`published_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `psicobooking_post`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_note` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`patient_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_payment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`psychologist_id` integer NOT NULL,
	`appointment_id` integer,
	`communication_mode` text NOT NULL,
	`session_type` text NOT NULL,
	`price` text NOT NULL,
	`bonus` text,
	`creation_date` integer DEFAULT (unixepoch()) NOT NULL,
	`payment_date` integer,
	FOREIGN KEY (`patient_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`psychologist_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`appointment_id`) REFERENCES `psicobooking_appointment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`psychologist_id` integer NOT NULL,
	`content` text NOT NULL,
	`image` text,
	`likes` integer DEFAULT 0 NOT NULL,
	`published_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`psychologist_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_psychologist_benefit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`psychologist_id` integer NOT NULL,
	`benefit_id` integer NOT NULL,
	FOREIGN KEY (`psychologist_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`benefit_id`) REFERENCES `psicobooking_benefit`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_treatment_sheet` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`actual_state` text NOT NULL,
	`date_from` integer NOT NULL,
	`date_end` integer NOT NULL,
	`end_motive` text NOT NULL,
	`reason_motive` text NOT NULL,
	`diagnostic_guidance` integer NOT NULL,
	FOREIGN KEY (`patient_id`) REFERENCES `psicobooking_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `psicobooking_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`role` text NOT NULL,
	`avatar` text,
	`specialty` text,
	`phone` integer,
	`nationality` text,
	`gender` text,
	`birth_day` integer,
	`occupation` text,
	`country` text,
	`state` text,
	`city` text,
	`street` text,
	`num_house` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `activity_psychologist_idx` ON `psicobooking_activity` (`psychologist_id`,`date_from`);--> statement-breakpoint
CREATE INDEX `activity_patient_idx` ON `psicobooking_activity` (`patient_id`,`date_from`);--> statement-breakpoint
CREATE INDEX `appointment_psychologist_idx` ON `psicobooking_appointment` (`psychologist_id`,`date_from`);--> statement-breakpoint
CREATE INDEX `appointment_patient_idx` ON `psicobooking_appointment` (`patient_id`,`date_from`);--> statement-breakpoint
CREATE INDEX `audios_patient_idx` ON `psicobooking_audio` (`patient_id`);--> statement-breakpoint
CREATE INDEX `availability_psychologist_idx` ON `psicobooking_availability` (`psychologist_id`,`day_of_week`);--> statement-breakpoint
CREATE INDEX `clinic_history_patient_idx` ON `psicobooking_clinic_history` (`patient_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `psicobooking_clinic` (`name`);--> statement-breakpoint
CREATE INDEX `activity_idx` ON `psicobooking_comment_activity` (`activity_id`,`published_at`);--> statement-breakpoint
CREATE INDEX `post_idx` ON `psicobooking_comment` (`post_id`,`published_at`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `psicobooking_comment` (`user_id`,`published_at`);--> statement-breakpoint
CREATE INDEX `parent_comment_idx` ON `psicobooking_comment` (`replyTo`);--> statement-breakpoint
CREATE INDEX `notes_patient_idx` ON `psicobooking_note` (`patient_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `payment_psychologist_idx` ON `psicobooking_payment` (`psychologist_id`,`creation_date`);--> statement-breakpoint
CREATE INDEX `payments_patient_idx` ON `psicobooking_payment` (`patient_id`,`creation_date`);--> statement-breakpoint
CREATE INDEX `post_psychologist_idx` ON `psicobooking_post` (`psychologist_id`,`published_at`);--> statement-breakpoint
CREATE INDEX `psychologist_benefit_idx` ON `psicobooking_psychologist_benefit` (`psychologist_id`,`benefit_id`);--> statement-breakpoint
CREATE INDEX `tratment_sheet_patient_idx` ON `psicobooking_treatment_sheet` (`patient_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `psicobooking_user` (`email`);--> statement-breakpoint
CREATE INDEX `role_idx` ON `psicobooking_user` (`role`);