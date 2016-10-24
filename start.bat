start cmd /k node node_modules/react-native/local-cli/cli.js start
start cmd /k "cd server && npm start"
start cmd /k "cd .. && pouchdb-server -p 3456"
start /min cmd /k emulator -avd meihu
start /min cmd /k code ../meihu