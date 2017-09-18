DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT FALSE
);
