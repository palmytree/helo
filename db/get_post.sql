SELECT
  p.id AS post_id,
  p.author_id,
  p.title,
  p.content,
  p.img,
  u.username AS author,
  u.profile_pic AS authorPicture
FROM
  posts p
  JOIN users u ON u.id = p.author_id
WHERE
  p.id = $1;