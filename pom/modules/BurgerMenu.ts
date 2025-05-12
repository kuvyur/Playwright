import { Locator, Page } from "@playwright/test";

export class BurgerMenu {
    private page: Page
    allItemsLink: Locator
    aboutLink: Locator
    logoutLink: Locator
    resetLink: Locator

    constructor(page: Page) {
        this.page = page;
        this.allItemsLink = page.locator('#inventory_sidebar_link')
        this.aboutLink = page.locator('#about_sidebar_link')
        this.logoutLink = page.locator('#logout_sidebar_link')
        this.resetLink = page.locator('#reset_sidebar_link')
    }

    async clickLogout(): Promise<void> {
        await this.logoutLink.click()
    }
}