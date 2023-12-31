import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
  private browser: puppeteer.Browser;

  async init() {
    this.browser = await puppeteer.launch({ headless: false });
  }

  async close() {
    await this.browser.close()
  }

  async getPage(url: string) {
    const page = await this.browser.newPage();
    await page.goto(url);
    return page;
  }
}