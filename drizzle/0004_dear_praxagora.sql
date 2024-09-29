ALTER TABLE `psicobooking_user` ADD `role` text;--> statement-breakpoint
CREATE INDEX `role_idx` ON `psicobooking_user` (`role`);