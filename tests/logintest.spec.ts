import { test, expect } from '@playwright/test'
import { LoginPage } from '../pom/pages/LoginPage'
import { BurgerMenu } from '../pom/modules/BurgerMenu'
import { Header } from '../pom/modules/Header'

test.describe('Login tests', () => {
    let loginPage: LoginPage;
    let header: Header
    let burgerMenu: BurgerMenu

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        header = new Header(page)
        burgerMenu = new BurgerMenu(page)
    })


    test('Successful Login', async ({ page }) => {

        await loginPage.open()
        await loginPage.enterUsername('standard_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLogin()

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('Auth without login', async () => {

        await loginPage.open()
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLogin()

        await loginPage.checkErrorMessage('Epic sadface: Username is required')
    })

    test('Auth without password', async () => {

        await loginPage.open()
        await loginPage.enterUsername('standard_user')
        await loginPage.clickLogin()

        await loginPage.checkErrorMessage('Epic sadface: Password is required')
    })

    test('Auth with incorrect password', async () => {

        await loginPage.open()
        await loginPage.enterUsername('standard_user')
        await loginPage.enterPassword('123456')
        await loginPage.clickLogin()

        await loginPage.checkErrorMessage('Epic sadface: Username and password do not match any user in this service')
    })

    test('Login into valid user, logging out, and logging into invalid user', async ({ page }) => {


        await loginPage.open()
        await loginPage.enterUsername('standard_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLogin()

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

        await header.openBurgerMenu()
        await burgerMenu.clickLogout()

        await expect(page).toHaveURL('https://www.saucedemo.com/')
        await loginPage.checkLoginElements()

        await loginPage.enterUsername('locked_out_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLogin()


        await loginPage.checkErrorMessage('Epic sadface: Sorry, this user has been locked out.')

    })

})