CREATE TABLE "links" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"short_code" varchar(64) NOT NULL,
	"original_url" text NOT NULL,
	"clerk_user_id" varchar(255),
	"click_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "links_short_code_unique" ON "links" USING btree ("short_code");--> statement-breakpoint
CREATE INDEX "links_clerk_user_id_idx" ON "links" USING btree ("clerk_user_id");