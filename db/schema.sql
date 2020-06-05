CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  PASSWORD VARCHAR(20),
  profile_pic TEXT
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(45),
  img TEXT,
  content TEXT,
  author_id INT REFERENCES users(id)
);