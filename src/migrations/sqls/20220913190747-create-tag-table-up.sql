CREATE TABLE IF NOT EXISTS public.tag
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    creator uuid,
    name character varying(40) COLLATE pg_catalog."default",
    "sort_order" integer DEFAULT 0,
    CONSTRAINT tag_pkey PRIMARY KEY (id),
	CONSTRAINT unique_name UNIQUE (name),
    CONSTRAINT fk_user_owner FOREIGN KEY (creator)
        REFERENCES public."user" (uid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
	
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tag
    OWNER to postgres;