CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    verified BOOLEAN NOT NULL DEFAULT false,
    created TIMESTAMP NOT NULL DEFAULT current_timestamp,
    last_login TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS posts (
    post_id SERIAL PRIMARY KEY,
    author INT REFERENCES users(user_id),
    slug VARCHAR(255),
    title VARCHAR(255),
    body VARCHAR,
    created TIMESTAMP NOT NULL DEFAULT current_timestamp,
    published TIMESTAMP,
    last_updated TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS featured_posts (
    post_id INT REFERENCES posts(post_id),
    post_featured TIMESTAMP NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY(post_id, post_featured)
);

CREATE TABLE IF NOT EXISTS comments (
    commment_id SERIAL PRIMARY KEY,
    author INT REFERENCES users(user_id),
    post INT REFERENCES posts(post_id),
    comment VARCHAR(255),
    posted TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS image_types (
    image_type VARCHAR(64) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS images (
    image_id SERIAL PRIMARY KEY,
    image_type VARCHAR(64) REFERENCES image_types(image_type),
    image_data bytea,
    image_added TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE OR REPLACE VIEW featured_post AS
    SELECT * FROM posts WHERE post_id = 
        (SELECT post_id FROM featured_posts
        ORDER BY post_id DESC
        LIMIT 1);