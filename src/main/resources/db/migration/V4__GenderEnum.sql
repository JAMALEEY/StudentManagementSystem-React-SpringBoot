CREATE TYPE gender AS ENUM ('MALE', 'FEMALE', 'ROBOT');

ALTER TABLE student
ALTER COLUMN gender TYPE gender
USING (gender::gender)