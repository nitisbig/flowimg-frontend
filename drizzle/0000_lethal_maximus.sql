CREATE TABLE "api_key" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "api_key_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"token" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "api_key_token_unique" UNIQUE("token")
);
