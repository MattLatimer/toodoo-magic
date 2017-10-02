# Toodoo: A smart to-do list!

## Getting Started
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## App Features
- User registration, login & logout, edit user profile
  - Passwords hashed with bcrypt and cookies encrypted with cookie-session
- Categorization of to-do item on insert into one of the four categories if possible, else into unsorted
  - Leverages Wolfram Fast Query API
- Delete item, edit & update item
  - On edit, if the item is a book, provides additional info via the Google Books API
- Styled using Zurb Foundations 5 & Sass

## Screenshots
![Login](https://github.com/MattLatimer/toodoo-magic/blob/master/screenshots/1.png "Login")
![Main](https://github.com/MattLatimer/toodoo-magic/blob/master/screenshots/2.png "Main")
![Book Edit](https://github.com/MattLatimer/toodoo-magic/blob/master/screenshots/3.png "Book Edit")

## Dependencies
- Node 5.10.x or above
- NPM 3.8.x or above
- PostgreSQL
- Express
- Knex
- EJS
