CREATE TABLE forgot_password
(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    reset_password_token VARCHAR(255),
    userId INT,
    expire VARCHAR(255),
    is_password_modified BOOLEAN DEFAULT false
);