INSERT INTO
  users (username, PASSWORD)
VALUES
  ($1, $2)
RETURNING id, username;