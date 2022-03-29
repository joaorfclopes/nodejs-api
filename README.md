# nodejs-api

## Requirements 💻
- NPM
- MongoDB database
- Postman
- Docker (optional)

## Setup 🔨
1. Run `git clone git@github.com:joaorfclopes/nodejs-api.git`
2. Run `npm install`
3. In root folder, create an `.env.development` or `.env.staging` file (depending on the environment you want to run) and add your configs based on the respective `.example` file
4. Import `nodejs-api.postman_collection.json` file to postman. This is a collection with all the requests that you'll need
>**Note:** Keep the names of the .env variables if you didn't change them in the rest of the code

## Run 🚀
**Development environment:**
- In the root of the project run `npm run start:dev`

**Staging environment:**
- In the root of the project run `npm run start:stag`

## Docker 🐳 (optional)
1. In root folder, create an `.env` file and add your configs (don't forget that you can't point to your local db with docker)
2. Start docker in your machine
3. Inside the root folder run `docker compose up`

## Debug 🐞
- If you're using VS Code, just go to *"Run and Debug"* tab, select the environment that you want and press **start (F5)**

## Live example 🌍
The live nodejs-api example is hosted here: [nodejs-api](https://cryptic-sierra-83506.herokuapp.com/)
