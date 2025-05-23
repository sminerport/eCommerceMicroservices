-- Create the table if it does not exist
CREATE TABLE public."Users"
(
    "UserID" uuid NOT NULL,
    "PersonName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Gender" character varying(15) COLLATE pg_catalog."default",
    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID")
);

-- Sample data for insertion
INSERT INTO public."Users" ("UserID", "Email", "PersonName", "Gender", "Password")
VALUES
('c32f8b42-60e6-4c02-90a7-9143ab37189f', 'test1@example.com', 'John Doe', 'Male', 'password1'),
('8ff22c7d-18c7-4ef0-a0ac-988ecb2ac7f5', 'test2@example.com', 'Jane Smith', 'Female', 'password2');