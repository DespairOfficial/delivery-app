CREATE TABLE IF NOT EXISTS public.user_tag
(
    user_id uuid NOT NULL,
    tag_id integer NOT NULL,
    CONSTRAINT fk_tag_id FOREIGN KEY (tag_id)
        REFERENCES public.tag (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public."user" (uid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_tag
    OWNER to postgres;