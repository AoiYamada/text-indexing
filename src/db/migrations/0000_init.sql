CREATE TABLE `doc_meta` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`doc_id` integer NOT NULL,
	`hash` text NOT NULL,
	`char_count` integer NOT NULL,
	`word_count` integer NOT NULL,
	`sentence_count` integer NOT NULL,
	FOREIGN KEY (`doc_id`) REFERENCES `docs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `docs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pubmed` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`doc_id` integer NOT NULL,
	`title` text NOT NULL,
	`abstract` text NOT NULL,
	FOREIGN KEY (`doc_id`) REFERENCES `docs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stem` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`term` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stem_doc_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stem_id` integer NOT NULL,
	`doc_id` integer NOT NULL,
	`doc_type` text NOT NULL,
	`count` integer NOT NULL,
	FOREIGN KEY (`stem_id`) REFERENCES `stem`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`doc_id`) REFERENCES `docs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `twitter` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`doc_id` integer NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`doc_id`) REFERENCES `docs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `doc_id_idx` ON `doc_meta` (`doc_id`);--> statement-breakpoint
CREATE INDEX `hash_idx` ON `doc_meta` (`hash`);--> statement-breakpoint
CREATE INDEX `char_count_idx` ON `doc_meta` (`char_count`);--> statement-breakpoint
CREATE INDEX `word_count_idx` ON `doc_meta` (`word_count`);--> statement-breakpoint
CREATE INDEX `sentence_count_idx` ON `doc_meta` (`sentence_count`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `docs` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `doc_id_idx` ON `pubmed` (`doc_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `term_idx` ON `stem` (`term`);--> statement-breakpoint
CREATE INDEX `doc_id_count_idx` ON `stem_doc_stats` (`doc_id`,`count`);--> statement-breakpoint
CREATE INDEX `stem_id_count_idx` ON `stem_doc_stats` (`stem_id`,`count`);--> statement-breakpoint
CREATE INDEX `doc_type_count_idx` ON `stem_doc_stats` (`doc_type`,`count`);--> statement-breakpoint
CREATE INDEX `count_idx` ON `stem_doc_stats` (`count`);--> statement-breakpoint
CREATE UNIQUE INDEX `doc_id_idx` ON `twitter` (`doc_id`);