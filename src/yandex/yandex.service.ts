import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { PlaywrightService } from 'src/playwright/playwright.service';

@Injectable()
export class YandexService implements OnApplicationBootstrap {
    constructor(private readonly playwrightService: PlaywrightService) {}

    onApplicationBootstrap() {
        this.openBrowser()
    }

    async openBrowser() {
        const page = await this.playwrightService.getPage('https://direct.yandex.com/dna/grid/campaigns?filter=dim%20%3D%20%7C%D0%A1%D1%82%D0%B0%D1%82%D1%83%D1%81%20%3D%20%D0%92%D1%81%D0%B5%2C%20%D0%BA%D1%80%D0%BE%D0%BC%D0%B5%20%D0%B0%D1%80%D1%85%D0%B8%D0%B2%D0%BD%D1%8B%D1%85');

        // Ваши действия с page здесь
        await page.locator('#passp-field-login').fill('savvatii1991baranov');
        await page.getByRole('button', { name: 'Log in', exact: true }).click();
        
        await page.locator('#passp-field-passwd').fill('2LazF1Z4m0Wa0fngLFOm1');
        await page.getByRole('button', { name: 'Next', exact: true }).click();

        // проверка на защиту
        const restoreButton = await page.getByRole('button', { name: 'Restore access', exact: true })

        if(restoreButton) {
            restoreButton.click();
            console.log('Кнопка восстановления найдена')

            const image = await page.locator('#captcha-image').getAttribute('src');
            console.log(image)

            const text = '321'
            await page.locator('#passp-field-captcha_answer').fill(text)
            // await page.getByRole('button', { name: 'Next', exact: true }).click();
        }

        // Проверка наличия элемента passp-field-question
        // const questionElement = await page.locator('input[name=question]').isElementExists();
        // if (questionElement) {
        //     await page.locator('#passp-field-passwd').fill('63764');
        //     await page.getByRole('button', { name: 'Continue', exact: true }).click();
        // }

        

        await page.screenshot({ path: 'screenshot.png', fullPage: true });


      
        // await this.puppeteerService.close();
    }
}
