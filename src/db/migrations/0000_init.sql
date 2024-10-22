CREATE TABLE `doc` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`file_id` integer NOT NULL,
	FOREIGN KEY (`file_id`) REFERENCES `file`(`id`) ON UPDATE no action ON DELETE cascade
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
	FOREIGN KEY (`doc_id`) REFERENCES `doc`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `file` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`filename` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gdelt` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`doc_id` integer NOT NULL,
	`url` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`doc_id`) REFERENCES `doc`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `pubmed` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`doc_id` integer NOT NULL,
	`title` text NOT NULL,
	`abstract` text NOT NULL,
	FOREIGN KEY (`doc_id`) REFERENCES `doc`(`id`) ON UPDATE no action ON DELETE cascade
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
	`doc_analyzer` text NOT NULL,
	`count` integer NOT NULL,
	FOREIGN KEY (`stem_id`) REFERENCES `stem`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`doc_id`) REFERENCES `doc`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `doc_file_id_idx` ON `doc` (`file_id`);--> statement-breakpoint
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
CREATE UNIQUE INDEX `gdelt_doc_id_idx` ON `gdelt` (`doc_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `pubmed_doc_id_idx` ON `pubmed` (`doc_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `stem_term_idx` ON `stem` (`term`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_doc_id_count_idx` ON `stem_doc_stats` (`doc_id`,`count`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_stem_id_count_idx` ON `stem_doc_stats` (`stem_id`,`count`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_doc_type_count_idx` ON `stem_doc_stats` (`doc_type`,`count`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_doc_analyzer_count_idx` ON `stem_doc_stats` (`doc_analyzer`,`count`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_doc_type_analyzer_count_idx` ON `stem_doc_stats` (`doc_type`,`doc_analyzer`,`count`);--> statement-breakpoint
CREATE INDEX `stem_doc_stats_count_idx` ON `stem_doc_stats` (`count`);