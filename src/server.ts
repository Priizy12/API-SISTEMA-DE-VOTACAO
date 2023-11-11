import express from 'express';
import cors from 'cors'
import { router } from './routes'
import path from 'path'
import  './shared/services/Translation'
import '../src/shared/config/env'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET: string;
        }
    }
}

const app = express();
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
});
app.use("/images", express.static(path.join(__dirname, "..", "..", "uploads")))
app.use(router)

app.listen(3000, () => {
    console.log('listening on 3000')
})


export {app}