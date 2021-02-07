-- INIT IMAGE TYPES
INSERT INTO image_types (
    image_type
) VALUES
('PNG'), ('JPG'), ('GIF'), ('SVG'), ('RAW');

-- CREATE ADMIN USER
INSERT INTO users (
	email, username, password, verified
) VALUES (
	'admin@jazer.dev', 'jazer', '$2b$10$dxS6ZCKpwR5aYJ19dEKC8.DSdvrJTPj3ASq.1lx9a61CtJkZio9UK', true
);

-- CREATE DUMMY POST
INSERT INTO posts (
	author, slug, title, body
) VALUES (
	(SELECT user_id FROM users WHERE username='jazer'), 
	'how-to-build-an-api', 'How to build an API', 'And here''s how to do it'
);