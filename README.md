# Reeg of Regends Summoner Rook-Up

## Description 
This simple web application allows users to search a summoner's name and view the inputted summoner's recent match history and respective match stats.

To view a working version in action, click [here](https://ror-stats-app.herokuapp.com/).
If you are unfamiliar with League of Legends or don't know of any summoner names to search, feel free to try the summoner names listed below.

These are currently the top 5 players in League of Legends:
1. tarzaned5
2. SHERNFlRE
3. SHERNICE
4. Santorin
5. TSM Johnsun

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


### Currently in the works
[] mobile/tablet compatibility
[] additional data on-hover
___

Created By Roger Yee | 4/7/19

ryee.dev@gmail.com

[ryee.io](https://ryee.io)

___

Project licensed under the MIT License.

[© 2018 Riot Games, Inc. All rights reserved.](https://developer.riotgames.com/terms)
