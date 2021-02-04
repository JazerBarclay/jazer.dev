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