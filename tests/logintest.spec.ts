import { test, expect } from '@playwright/test'

test.describe('Login tests', () => {
    test('Successful Login', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        const usernameField = page.locator('#user-name')
        const passwordField = page.locator('//input[@id="password"]')

        await usernameField.fill('standard_user')
        await passwordField.fill('secret_sauce')

        await page.locator('//input[@id="login-button"]').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('Auth without login', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        const passwordField = page.locator('//input[@id="password"]')

        await passwordField.fill('secret_sauce')

        await page.locator('//input[@id="login-button"]').click()
        await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username is required')
    })

    test('Auth without password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        const usernameField = page.locator('#user-name')

        await usernameField.fill('standard_user')

        await page.locator('//input[@id="login-button"]').click()
        await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Password is required')
    })

    test('Auth with incorrect password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        const usernameField = page.locator('#user-name')
        const passwordField = page.locator('//input[@id="password"]')

        await usernameField.fill('standard_user')
        await passwordField.fill('123456')

        await page.locator('//input[@id="login-button"]').click()
        await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    test('Login into valid user, logging out, and logging into invalid user', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        const usernameField = page.locator('#user-name')
        const passwordField = page.locator('//input[@id="password"]')
        const loginButton = page.locator('//input[@id="login-button"]')

        await usernameField.fill('standard_user')
        await passwordField.fill('secret_sauce')

        await loginButton.click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

        await page.locator('//button[@id="react-burger-menu-btn"]').click()
        await page.locator('//a[@id="logout_sidebar_link"]').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await expect(usernameField && passwordField && loginButton).toBeVisible()

        await usernameField.fill('locked_out_user')
        await passwordField.fill('secret_sauce')

        await loginButton.click()
        await expect(page.locator('//div[@class="error-message-container error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.')

    })

})

