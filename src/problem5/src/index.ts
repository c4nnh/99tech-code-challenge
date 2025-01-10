import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { router } from "./router";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { exceptionFilter } from "./middlewares/exception-filter.middleware";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crude API",
      version: "1.0.0",
      description: "A simple Crude API",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/**/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
// logger middleware should be the first middleware
app.use(loggerMiddleware);

app.use("/api", router);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// exception filter should be the last middleware to catch all exceptions
app.use(exceptionFilter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
