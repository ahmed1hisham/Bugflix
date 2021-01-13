# Bugflix

### To run this app:

- Make sure you have the environment setup correctly. Guide can be found here: https://reactnative.dev/docs/environment-setup
- Clone this repo.
- Run `npm install` in the repo directory
- Run this command to install pods for iOS `cd ios && pod install && cd ..`
- To run iOS: `npx react-native run-ios`
- To run Android: `npx react-native run-android`


### To run tests:

#### Detox end-to-end testing:

- Make sure you have detox and its dependencies setup correctly using this guide: https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md
- Run the App either on ios or android using the above commands.
- According to the platform you chose, run one of these commands for detox build: `detox build -c ios` for ios or `detox build -c android` for android.
- Then this command to finally run the tests: `detox test -c ios` for ios or `detox test -c android` for android.


#### Jest unit testing:

- Make sure you ran `npm install`.
- Run the following command `npm run test`.
