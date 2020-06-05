INSERT INTO posts
(author_id, title, content, img)
VALUES
($1, $2, $3, $4)
RETURNING *;