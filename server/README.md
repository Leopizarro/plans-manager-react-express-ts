# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

run migrations: ```npx typeorm-ts-node-commonjs migration:run -d ./src/data-source.ts```
