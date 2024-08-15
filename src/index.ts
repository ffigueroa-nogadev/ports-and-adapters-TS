import express, { json, Request, Response, urlencoded } from "express"
import { RegisterRoutes } from "./build/routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express()

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

app.listen(3000, () => {
  console.log('running in the port 3000');
})