import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "./pipes/validation.pipe";
import * as cookieParser from "cookie-parser";

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
  await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}
start();
