# nodejs-api

## Requirements 💻
- NPM
- MongoDB database
- Postman

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

## Live example 🌍
The live nodejs-api example is hosted here: [nodejs-api](https://cryptic-sierra-83506.herokuapp.com/)
