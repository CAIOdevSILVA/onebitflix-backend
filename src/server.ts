import express from "express";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);
app.use(adminJs.options.rootPath, adminJsRouter);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("Conexão com o Banco de Dados estabelecida!");
  })
  console.log(`Server started successfuly at port ${PORT}.`);
});