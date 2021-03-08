# PolyQuiz: Server application

The PolyQuiz server application.

## Requirements

1. Install Node 12+.

```bash
nvm use 
```

2. Install the dependencies.

```bash
npm install
```

3. Set up a PostgreSQL database.

4. *(Optional)* Update the [database configuration](app/config).

5. Migrate the database.

```bash
npx sequelize db:migrate
```

6. *(Optional)* Populate the database.

```bash
npx sequelize db:seed:all
```

## Usage

- Run the server for production.

```bash
npm start
```

- Run the server for development.

```bash
npm run dev
```

## Structure

- [app/](app): The application source code.
    - [config/](app/config): The configuration files.
    - [controllers/](app/controllers): The logic of the application.
    - [migrations/](app/migrations): The migrations of the database.
    - [models/](app/models): The models of the application.
    - [routes/](app/routes): The routes of the application.
    - [seeders/](app/seeders): The initial data of the database.
    - [utils/](app/utils): The utilities of the application.
        - [errors/](app/utils/errors): The custom errors.
        - [handlers/](app/utils/handlers): The custom error handlers.
- [postman/](postman): The Postman testing collection.

## Dependencies

- [Express](https://www.npmjs.com/package/express) : Framework for building web applications and APIs.
- [Body Parser](https://www.npmjs.com/package/body-parser) : Middleware for parsing request bodies.
- [Morgan](https://www.npmjs.com/package/morgan) : Middleware for logging requests.
- [CORS](https://www.npmjs.com/package/cors) : Middleware for enabling cross origin headers.
- [Sequelize](https://www.npmjs.com/package/sequelize) : Library for managing SQL databases.
- [PG](https://www.npmjs.com/package/pg) : PostgreSQL client.
- [PG Hstore](https://www.npmjs.com/package/pg-hstore) : Library for managing Hstore format.

## Authors

- [João Brilhante](https://github.com/JoaoBrlt)
- [Martin Bouteiller](https://github.com/mbouteiller)
- [Olivier Doussaud](https://github.com/Dawwen)
- [Valentin Roccelli](https://github.com/RoccelliV)