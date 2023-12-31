import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YandexService } from './yandex/yandex.service';
import { PlaywrightService } from './playwright/playwright.service';
import { ConfigModule } from '@nestjs/config';
import { AntiCaptchaModule } from './anticaptcha/anticaptcha.module';

@Module({
  imports: [ConfigModule.forRoot(), AntiCaptchaModule.register({ clientKey: 'c4e60d77d8b5431f57623d67f145db4c' })],
  controllers: [AppController],
  providers: [AppService, YandexService, PlaywrightService],
})

export class AppModule {}
