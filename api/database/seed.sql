INSERT INTO image_types (
    image_type
) VALUES
('PNG'), ('JPG'), ('GIF'), ('SVG'), ('RAW');

INSERT INTO users (
	email, username, password, verified
) VALUES (
	'admin@jazer.dev', 'admin', 'admin', true
), (
	'jazer@jazer.dev', 'jazer', 'dev', false
);

INSERT INTO posts (
	author, slug, title, body
) VALUES (
	(SELECT user_id FROM users WHERE username='jazer'), 
	'how-to-build-an-api', 'How to build an API', 'And here''s how to do it'
);