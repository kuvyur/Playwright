import { Locator, Page } from "@playwright/test"

export class Header {
    private page: Page
    private burgerMenuIcon: Locator
    private cartIcon: Locator

    constructor(page: Page) {
        this.page = page;
        this.burgerMenuIcon = page.locator('#react-burger-menu-btn')
        this.cartIcon = page.getByTestId('shopping-cart-link')
    }

    async openBurgerMenu(): Promise<void> {
        await this.burgerMenuIcon.click()
    }

    
}