import { Injectable, OnModuleInit } from '@nestjs/common';
import { Browser, BrowserContext, Page, chromium, devices } from 'playwright';

@Injectable()
export class PlaywrightService implements OnModuleInit {
  
    private browser: Browser;
    private context: BrowserContext;

    async onModuleInit() {
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext(devices['Desktop Chrome']);
    }
   
    async close() {
        await this.browser.close()
    }

    async getPage(url: string): Promise<Page> {
        const page = await this.context.newPage();
        await page.goto(url);
        return page;
    }
}
