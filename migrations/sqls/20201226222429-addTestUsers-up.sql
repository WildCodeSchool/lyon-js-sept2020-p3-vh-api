INSERT INTO
  user (
    firstname,
    lastname,
    email,
    phone_number,
    bio,
    encrypted_password,
    instagram_url,
    facebook_url,
    twitter_url,
    role
  )
VALUES
  (
    'Carla',
    'Bruni',
    'carla.bruni@gmail.com',
    "0612345678",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "$argon2i$v=19$m=4096,t=3,p=1$egFJ/mCuPyTtycIGDmFyAg$inyqpAEW7wIlW33CgFSkLg6LrKG1bjflLx4ghQbdEZE",
    "https://www.instagram.com/carlabruniofficial/",
    "https://fr-fr.facebook.com/carlabruniofficiel/",
    "https://twitter.com/carlabruni",
    "customer"
  );
INSERT INTO
  user (
    firstname,
    lastname,
    email,
    encrypted_password,
    role
  )
VALUES
  (
    'Nicolas',
    'Sarkozy',
    'nicolas.sarkozy@gmail.com',
    "$argon2i$v=19$m=4096,t=3,p=1$egFJ/mCuPyTtycIGDmFyAg$inyqpAEW7wIlW33CgFSkLg6LrKG1bjflLx4ghQbdEZE",
    "admin"
  );