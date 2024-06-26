# Pomo Tasker

Access the live app [here](https://pomo-tasker-405fd1be4689.herokuapp.com/). You will need to create an account to access the dashboard. The app currently has three sections: productivity stats which are still in development, a pomodoro timer, and a task section. A Pomodoro Timer is a time management tool designed to enhance focus and productivity by breaking work into intervals, traditionally 25 minutes in length, separated by short breaks. This method, named after the Italian word for 'tomato' due to its inventor Francesco Cirillo's use of a tomato-shaped kitchen timer, encourages individuals to work with the time they have—rather than against it.

Here's how it works:

- Focus Session: You start a focus session by clicking on the play icon while in "work" mode which starts a 25 minute timer. During this time, you work solely on one task, minimizing all distractions.
- Short Break: Once the session ends, take a 5-minute break using the break timer which you can access by clicking on the "break" mode above the timer. This is crucial for your brain to rest and recharge, making it ready for the next focus session.

## Available Scripts

**In the project server directory, you can run:**

### `yarn dev`

Runs the node app in the development mode.

**In the project root directory, you can run:**

### `yarn dev`

Runs the React app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn install`

Install the project dependencies.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `heroku plugins:install heroku-builds`

### `heroku builds:cache:purge -a pomo-tasker`

### `git commit --allow-empty -m "Purge build cache"`

### `git push heroku master:main`

Prepares and deploys the app to heroku.

### `heroku logs --tail --app pomo-tasker`

Shows any build or deployment errors.

## Features in development

- Spotify widget that allows user to login to their account and select their playlist of choice. It will then start playing when the timer starts.
- Additional audio to indicate to the user when their session is over.
- In session task section that tracks how long the user works on their in session tasks.
- Productivity stats.
