import { Locator, Page } from "@playwright/test"

export class Header {
    private page: Page
    private burgerMenuIcon: Locator
    private cartIcon: Locator

    constructor(page: Page) {
        this.page = page;
        this.burgerMenuIcon = page.locator('#react-burger-menu-btn')
        this.cartIcon = page.locator('.shopping_cart_link')
    }

    async openBurgerMenu(): Promise<void> {
        await this.burgerMenuIcon.click()
    }

     async openShoppingCart(): Promise<void> {
        await this.cartIcon.click()
    }
}