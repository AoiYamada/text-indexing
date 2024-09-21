CREATE TABLE IF NOT EXISTS "doc" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "doc_meta" (
	"id" serial PRIMARY KEY NOT NULL,
	"doc_id" integer NOT NULL,
	"hash" text NOT NULL,
	"char_count" integer NOT NULL,
	"word_count" integer NOT NULL,
	"sentence_count" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pubmed" (
	"id" serial PRIMARY KEY NOT NULL,
	"doc_id" integer NOT NULL,
	"title" text NOT NULL,
	"abstract" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stem" (
	"id" serial PRIMARY KEY NOT NULL,
	"term" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stem_doc_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"stem_id" integer NOT NULL,
	"doc_id" integer NOT NULL,
	"doc_type" text NOT NULL,
	"count" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twitter" (
	"id" serial PRIMARY KEY NOT NULL,
	"doc_id" integer NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doc_meta" ADD CONSTRAINT "doc_meta_doc_id_doc_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."doc"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pubmed" ADD CONSTRAINT "pubmed_doc_id_doc_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."doc"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stem_doc_stats" ADD CONSTRAINT "stem_doc_stats_stem_id_stem_id_fk" FOREIGN KEY ("stem_id") REFERENCES "public"."stem"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stem_doc_stats" ADD CONSTRAINT "stem_doc_stats_doc_id_doc_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."doc"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "twitter" ADD CONSTRAINT "twitter_doc_id_doc_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."doc"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "doc_type_idx" ON "doc" USING btree ("type");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "doc_meta_doc_id_idx" ON "doc_meta" USING btree ("doc_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "doc_meta_hash_idx" ON "doc_meta" USING btree ("hash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "doc_meta_char_count_idx" ON "doc_meta" USING btree ("char_count");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "doc_meta_word_count_idx" ON "doc_meta" USING btree ("word_count");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "doc_meta_sentence_count_idx" ON "doc_meta" USING btree ("sentence_count");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "pubmed_doc_id_idx" ON "pubmed" USING btree ("doc_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "stem_term_idx" ON "stem" USING btree ("term");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stem_doc_stats_doc_id_count_idx" ON "stem_doc_stats" USING btree ("doc_id","count");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stem_doc_stats_stem_id_count_idx" ON "stem_doc_stats" USING btree ("stem_id","count");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stem_doc_stats_doc_type_count_idx" ON "stem_doc_stats" USING btree ("doc_type","count");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stem_doc_stats_count_idx" ON "stem_doc_stats" USING btree ("count");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "twitter_doc_id_idx" ON "twitter" USING btree ("doc_id");