// const app = require('./src/app')
import {server} from './src/app.js'
const PORT = 8080

server.listen(PORT, () => {
   console.log(`Example app listening on port http://localhost:${PORT}`);
})