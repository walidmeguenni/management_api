import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./apps/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./framework/utils";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || 4000;
  const apiPrefix = "api/v1";

  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.setGlobalPrefix(apiPrefix);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("My API")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(port);
}
bootstrap();
