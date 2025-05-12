import { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

export class LoginPage {
    private page: Page
    private usernameInput: Locator
    private passwordInput: Locator
    private loginButton: Locator
    private errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('#user-name')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('#login-button')
        this.errorMessage = page.locator('.error-message-container.error')
    }

        async open(): Promise<void> {
            await this.page.goto('https://www.saucedemo.com/')
        }

        async enterUsername(username: string): Promise<void> {
            await this.usernameInput.fill(username)
        }

        async enterPassword(password: string): Promise<void> {
            await this.passwordInput.fill(password)
        }
        
        async clickLogin(): Promise<void> {
            await this.loginButton.click()
        }

        async checkErrorMessage(text: string): Promise<void> {
            await expect(this.errorMessage).toHaveText(text)
        }

        async checkLoginElements(): Promise<void> {
            await expect(this.usernameInput && this.passwordInput && this.loginButton).toBeVisible()
        }
}
