import { test, expect } from '@playwright/test'
import { LoginPage } from '../pom/pages/LoginPage'
import { Header } from '../pom/modules/Header'
import { InventoryPage } from '../pom/pages/InventoryPage'
import { ShoppingCart } from '../pom/pages/ShoppingCart'

test.describe('Shopping cart tests', () => {
    let loginPage: LoginPage;
    let header: Header
    let inventoryPage: InventoryPage
    let shoppingCart: ShoppingCart
    let productInventoryName

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        header = new Header(page)
        inventoryPage = new InventoryPage(page)
        shoppingCart = new ShoppingCart(page)

        await loginPage.open();
        await loginPage.loginWithCredentials('standard_user', 'secret_sauce')
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

        productInventoryName = await inventoryPage.getProductName()
        await inventoryPage.addProductToCart()
        await header.openShoppingCart()

    })


    test('Check adding a product in the cart', async ({ page }) => {
        await shoppingCart.checkCartElements()

       let productCartName = await shoppingCart.getProductName()

       //Check that the correct product was added
       await expect(productInventoryName).toBe(productCartName)

    })

    test('Check deleting a product from the cart', async ({ page }) => {
        await shoppingCart.removeItem()
        await shoppingCart.checkCartIsEmpty()
    })

    test('Check proceeding to the checkout', async ({ page }) => {
        await shoppingCart.clickCheckout()
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    })

    test('Check returning to the inventory', async ({ page }) => {
        await shoppingCart.clickContinue()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    
})
