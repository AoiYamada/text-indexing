CREATE TABLE `doc` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `doc_meta` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`doc_id` integer NOT NULL,
	`hash` text NOT NULL,
	`total_char_count` integer NOT NULL,
	`non_space_char_count` integer NOT NULL,
	`word_count` integer NOT NULL,
	`sentence_count` integer NOT NULL,
	`ascii_count` integer NOT NULL,
	`non_ascii_count` integer NOT NULL,
	`space_count` integer NOT NULL,
	FOREIGN KEY (`doc_id`) REFERENCES `doc`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pubmed` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`doc_id` integer NOT NULL,
	`title` text NOT NULL,
	`abstract` text NOT NULL,
	FOREIGN KEY (`doc_id`) REFERENCES `doc`(`id`) ON UPDATE no action ON DELETE no action
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
	FOREIGN KEY (`doc_id`) REFERENCES `doc`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `twitter` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`doc_id` integer NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`doc_id`) REFERENCES `doc`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `doc_type_idx` ON `doc` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `doc_meta_doc_id_idx` ON `doc_meta` (`doc_id`);--> statement-breakpoint
CREATE INDEX `doc_meta_hash_idx` ON `doc_meta` (`hash`);--> statement-breakpoint
CREATE INDEX `doc_meta_total_char_count_idx` ON `doc_meta` (`total_char_count`);--> statement-breakpoint
CREATE INDEX `doc_meta_non_space_char_count_idx` ON `doc_meta` (`non_space_char_count`);--> statement-breakpoint
CREATE INDEX `doc_meta_word_count_idx` ON `doc_meta` (`word_count`);--> statement-breakpoint
CREATE INDEX `doc_meta_sentence_count_idx` ON `doc_meta` (`sentence_count`);--> statement-breakpoint
CREATE INDEX `doc_meta_ascii_count_idx` ON `doc_meta` (`ascii_count`);--> statement-breakpoint
CREATE INDEX `doc_meta_non_ascii_count_idx` ON `doc_meta` (`non_ascii_count`);--> statement-breakpoint
CREATE INDEX `doc_meta_space_count_idx` ON `doc_meta` (`space_count`);--> statement-breakpoint
CREATE UNIQUE INDEX `pubmed_doc_id_idx` ON `pubmed` (`doc_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `stem_term_idx` ON `stem` (`term`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_doc_id_count_idx` ON `stem_doc_stats` (`doc_id`,`count`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_stem_id_count_idx` ON `stem_doc_stats` (`stem_id`,`count`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_doc_type_count_idx` ON `stem_doc_stats` (`doc_type`,`count`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_count_idx` ON `stem_doc_stats` (`count`);--> statement-breakpoint
CREATE UNIQUE INDEX `twitter_doc_id_idx` ON `twitter` (`doc_id`);