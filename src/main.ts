import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import * as config from "config";

async function bootstrap() {
  const looger = new Logger("main");
  const app = await NestFactory.create(AppModule);

  // HTTP 헤더를 적절하게 설정하여 잘 알려진 일부 웹 취약점으로부터 앱을 보호 할 수 있습니다.
  app.use(helmet());

  // CORS (Cross-Origin Resource Sharing)는 다른 도메인에서 리소스를 요청할 수 있는 메커니즘입니다.
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // 무차별 대입 공격으로부터 애플리케이션을 보호하려면 일종의 속도 제한
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );

  const serverConfig = config.get("server");
  const port = serverConfig.port;
  looger.log(`Application running on port ${port}`);
  await app.listen(port);
}
bootstrap();
