# commands to be executed by Docker when creating the container
npm run dev & # Run server

sleep 5

npx typeorm-ts-node-commonjs migration:run -d ./src/data-source.ts # Run migrations

# Keep the server running (this ensures the container doesn't exit)
wait