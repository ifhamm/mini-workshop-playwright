import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/productPage";
import { ShoppingCart } from "../pages/cartPage";

test.describe("Shopping Cart", () => {
  test.beforeEach(async ({ page }) => {
    const productPage = new ProductPage(page);
    await page.goto("https://magento.softwaretestingboard.com/men/tops-men.html");
    await page.waitForTimeout(2000);
    await productPage.addToCart(0);
    await productPage.addToCart(1);
  });

  test("Edit product quantity", async ({ page }) => {
    const shoppingCart = new ShoppingCart(page);
    await page.goto("https://magento.softwaretestingboard.com/checkout/cart/");
    await shoppingCart.updateItemQty(0, 2);
    const itemDetails = await shoppingCart.getItemDetails(0);
  });

  test("Delete product from cart", async ({ page }) => {
    const shoppingCart = new ShoppingCart(page);
    await page.goto("https://magento.softwaretestingboard.com/checkout/cart/");
    await shoppingCart.removeItem(1);
  });
});


