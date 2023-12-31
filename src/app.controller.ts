import { Controller, Get } from '@nestjs/common';
import { PlaywrightService } from './playwright/playwright.service';

@Controller()
export class AppController {
  constructor(private readonly playwrightService: PlaywrightService) {}

  @Get()
  async openBrowser() {
    const page = await this.playwrightService.getPage('https://direct.yandex.com/dna/grid/campaigns?filter=dim%20%3D%20%7C%D0%A1%D1%82%D0%B0%D1%82%D1%83%D1%81%20%3D%20%D0%92%D1%81%D0%B5%2C%20%D0%BA%D1%80%D0%BE%D0%BC%D0%B5%20%D0%B0%D1%80%D1%85%D0%B8%D0%B2%D0%BD%D1%8B%D1%85');

    // Ваши действия с page здесь
    page.locator('#passp-field-login').fill('savvatii1991baranov');

    // await this.puppeteerService.close();
  }
}