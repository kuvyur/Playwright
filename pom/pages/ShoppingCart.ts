import { Page, Locator, expect } from '@playwright/test'

export class ShoppingCart {
    private page: Page
    private checkoutButton: Locator
    private continueButton: Locator
    private removeButton: Locator
    private productLink: Locator
    private productDescription: Locator
    private productPrice: Locator

    constructor(page: Page) {
        this.page = page
        this.checkoutButton = page.locator('#checkout')
        this.continueButton = page.locator('#continue-shopping')
        this.removeButton = page.locator('.btn.btn_secondary.btn_small.cart_button')
        this.productLink = page.locator('#item_4_title_link')
        this.productDescription = page.locator('.inventory_item_desc')
        this.productPrice = page.locator('.inventory_item_price')
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click()
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click()
    }

    async removeItem(): Promise<void> {
        await this.removeButton.click()
    }

    async goToProduct(): Promise<void> {
        await this.productLink.click()
    }

    async checkCartElements(): Promise<void> {
        await expect(this.productLink && this.productDescription && this.productPrice).toBeVisible()
        }
        
    async checkCartIsEmpty(): Promise<void> {
        await expect(this.productLink && this.productDescription && this.productPrice).toBeHidden()
        }
    
     async getProductName() {
        return await this.productLink.textContent()
    }
}