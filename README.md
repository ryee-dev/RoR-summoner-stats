# Reeg of Regends Summoner Rookup

## Description 
This simple web application allows users to search a summoner's name and view the inputted summoner's recent match history and respective match stats.

## Serving Locally
**Step 1. Clone Repository**

- Enter `git clone https://github.com/ryee-dev/LoL-summoner-stats` in your preferred terminal.

**Step 2. Install Dependencies**

- Install server dependencies by running `yarn` or `npm install` in the terminal.
- Install client dependencies by first changing to the client directory `cd client`, then `yarn` or `npm install` again.

**Step 3. Obtain API Key**

- Visit Riot's [developer portal](https://developer.riotgames.com/) and create an account if you haven't yet, and generate and copy the API key provided.

**Step 4. Environment**
- Create a `.env` file in the root directory
- Paste your api key to the `API_KEY` variable (no quotes necessary)
- Set a `PORT` variable to `3001`
- Save
 
```
// example .env

API_KEY: (paste api key here)
PORT: 3001
```
**Step 4. Deploy**
- In the terminal (root directory), start both the server and client concurrently by running `yarn dev`

## Technologies Used

### Client
- React (Hooks, Suspense)
- TypeScript
- Styled-Components
- Axios

### Server
- Node.js
- Express
- Axios

___

Created By Roger Yee | 4/7/19

ryee.dev@gmail.com

[ryee.io](https://ryee.io)

___

Project licensed under the MIT License.

[© 2018 Riot Games, Inc. All rights reserved.](https://developer.riotgames.com/terms)
