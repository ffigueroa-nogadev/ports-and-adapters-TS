import express, { json, Request, Response, urlencoded } from "express"
import multer from "multer";
import cors from "cors";
import { RegisterRoutes } from "./build/routes";
import { errorHandler } from "./middlewares/errorHandler";
import { envs } from "./envs";
const app = express()

app.use(cors())
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
app.use(upload.array('productImages', 5));

app.get('/', (req: Request, res: Response) => {
  res.json({ name: 'coso' });
})

app.use(
  urlencoded({
    extended: true,
  })
);

app.use(json());
RegisterRoutes(app);

app.use(errorHandler);

app.listen(envs.PORT, () => {
  console.log(`The App "${envs.APP_NAME}" is running in: http://localhost:${envs.PORT}`);
})