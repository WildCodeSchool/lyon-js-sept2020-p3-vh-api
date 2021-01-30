CREATE TABLE forgot_password
(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    resetPasswordToken VARCHAR(255),
    userId INT,
    expire VARCHAR(255)
);