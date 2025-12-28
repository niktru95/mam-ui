import { expect } from '@playwright/test';

class BasePage {
    /**
    * @param {import('playwright').Page} page
    */
    constructor(page) {
        this.page = page;
    }

    async goto(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async checkTitle(title) {
        await expect(this.page).toHaveTitle(title);
    }

    async checkUrl(url) {
        await expect(this.page).toHaveURL(url);
    }

    async checkText(text) {
        await expect(this.page).toHaveText(text);
    }

    async checkVisible(selector) {
        await expect(this.page.locator(selector)).toBeVisible();
    }

    async click(selector) {
        await this.page.locator(selector).click();
    }
}

export default BasePage;