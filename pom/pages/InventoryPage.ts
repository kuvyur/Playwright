import { Locator, Page } from "@playwright/test"

export class InventoryPage {
    private readonly page: Page
    private readonly pageTitle: Locator
    readonly addToCartButton: Locator
    readonly firstProductLink: Locator
    readonly firstProductName: Locator


    constructor(page: Page) {
        this.page = page
        this.pageTitle = page.getByTestId('title').filter({ hasText: 'Products' })
        this.addToCartButton = page.locator('.btn_inventory').first()
        this.firstProductLink = page.locator('#item_4_title_link')
        this.firstProductName = page.locator('.inventory_item_name').first()
    }

    async addProductToCart(): Promise<void> {
            await this.addToCartButton.click()
         }

    async getProductName() {
        return await this.firstProductName.textContent()
    }

}
