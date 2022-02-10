## Weather-App

- [weather-app](https://weather-app-76d35.web.app/)

## Technologies used

- [Next.js](https://nuxtjs.org) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Firebase](https://firebase.google.com/) – used as a backend-as-a-service with Firestore realtime database, authentication, cloud functions, and hosting.
- [TailwindUI](https://tailwindui.com/) – Beautiful UI components, crafted with Tailwind CSS.
- [React-google-autocomplete](https://www.npmjs.com/package/react-google-autocomplete) – google autcomplete library for react.

## Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) click `Add project`, enter any name, click `Continue`, uncheck `Enable Google Analytics for this project`, click `Continue`.
2. Under `Get started by adding Firebase to your app` click 3d icon (Web), enter name `Web`, uncheck `Firebase Hosting`, click `Register app`, copy generated `firebaseConfig`.
3. Go to `Authentication`, switch to tab `Sign-in method`, click and enable `Email/Password` and `Google` authentication.
4. Go to `Cloud Firestore`, click `Create database`, select `Start in test mode`, click `Next`, choose region `eur3`.
5. Transform `firebaseConfig` value (from step 2) to one line JSON. [This tool](https://www.convertjson.com/javascript-object-to-json.htm) might help you.
6. Visit [weather-api](https://www.visualcrossing.com/weather-api), create an account to get an api key
7. Visit [google-console-credential-page](https://console.cloud.google.com/project/_/google/maps-apis/credentials?_ga=2.77611421.866078946.1644408841-1313984520.1644153206) select this firebase project and get google api key 
7. Clone this repository and open the project folder.
8. Copy `.env.example` file to `.env` file and set value of `FIREBASE_CONFIG` to one line JSON you got from step 6.

## Additional info

- follow guide for hosting on firebase [hosting](https://firebase.google.com/docs/hosting/quickstart)

- firebase /functions uses node -v 14


## Run locally

1. [Install nvm](https://github.com/nvm-sh/nvm)
2. Run `nvm install 14`
3. Run `nvm use 14` to switch to node version
4. Run `npm  install` to install dependencies
5. Run `npm run dev` to launch app