
CREATE TABLE IF NOT EXISTS public."user"
(
    uid uuid NOT NULL DEFAULT gen_random_uuid(),
    email character varying(100) COLLATE pg_catalog."default",
    password character varying(100) COLLATE pg_catalog."default",
    nickname character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (uid),
	CONSTRAINT unique_email UNIQUE (email),
	CONSTRAINT unique_nickname UNIQUE (nickname)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;