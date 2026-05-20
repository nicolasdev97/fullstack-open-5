CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES (
  'Nicolás',
  'https://fullstackopen.com',
  'Full Stack Open Notes'
);

INSERT INTO blogs (author, url, title, likes)
VALUES (
  'Ada Lovelace',
  'https://postgresql.org',
  'Learning PostgreSQL',
  10
);

SELECT * FROM blogs;