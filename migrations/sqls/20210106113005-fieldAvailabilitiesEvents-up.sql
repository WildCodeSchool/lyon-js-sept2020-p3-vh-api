ALTER TABLE
  event
ADD
  availabilities int;
ALTER TABLE
  event
ADD
  wine_id int;
ALTER TABLE
  event
ADD
  CONSTRAINT event_fk_wine FOREIGN KEY (wine_id) REFERENCES wine(id);
UPDATE
  event
SET
  availabilities = 10
WHERE
  id = 1;
UPDATE
  event
SET
  availabilities = 15
WHERE
  id = 2;