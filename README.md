# Dailys

## Development

Add firebase config to `firebase.js`.

```
expo start
# for web
w
```

## Upload New Dailys
* to upload new dailys, update `db/database.json` with new daily objects
* add `"type": "module",` to `package.json`
* run `node uploadScript.js` in `db/`

## Built with
* React/React Native (Component based UI framework)
* React Navigation (React Native navigation)
* Redux (global store)
* React Native Elements (React Native components)
* Firebase - Firestore (DB store)

## Screens

`LaunchScreen`

<img src='assets/readme/launchscreen.png' height="500" />

`Signup`

<img src='assets/readme/signup.png' height="500" />

`Login`

<img src='assets/readme/login.png' height="500" />

`ForgotPassword`

<img src='assets/readme/forgotpassword.png' height="500" />

`HomeScreen`

<img src='assets/readme/homescreen.png' height="500" />

`StatsScreen > PersonalStats`

<img src='assets/readme/personalstats.png' height="500" />

`StatsScreen > PersonalStats > DailyOverlay`

<img src='assets/readme/dailyoverlay.png' height="500" />

`StatsScreen > GlobalStats`

<img src='assets/readme/globalstats.png' height="500" />

`ProfileScreen`

<img src='assets/readme/profilescreen.png' height="500" />
