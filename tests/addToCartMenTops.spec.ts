import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/productPage";

test("add a product to cart and verify success message", async ({ page }) => {
    const productPage = new ProductPage(page);

    await page.goto("https://magento.softwaretestingboard.com/men/tops-men.html");
    await page.waitForTimeout(2000);

    await productPage.addToCart(3);

    const successMessage = await productPage.verifyAddToCartSuccess();
    console.log("Success Message:", successMessage);

    expect(successMessage).toContain("You added");
});
