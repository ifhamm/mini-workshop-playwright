import { Locator, Page } from "@playwright/test";

export class ProductPage {
    productItems: Locator;
    sizeOptions: Locator;
    colorOptions: Locator;
    addToCartButtons: Locator;
    cartSuccessMessage: Locator;

    constructor(page: Page) {
        this.productItems = page.locator('.product-item'); 
        this.sizeOptions = page.locator('.swatch-option.text'); 
        this.colorOptions = page.locator('.swatch-option.color'); 
        this.addToCartButtons = page.locator('button[title="Add to Cart"]'); 
        this.cartSuccessMessage = page.locator('div[data-ui-id="message-success"]'); 
    }

    async addToCart(productIndex: number) {
        const product = this.productItems.nth(productIndex);
        await product.hover();

        const sizeButton = product.locator('.swatch-option.text').first();
        if (await sizeButton.isVisible()) {
            await sizeButton.click();
        }

        const colorButton = product.locator('.swatch-option.color').first();
        if (await colorButton.isVisible()) {
            await colorButton.click();
        }

        const addToCartButton = product.locator('button[title="Add to Cart"]');
        await addToCartButton.click();
    }

    async verifyAddToCartSuccess() {
        await this.cartSuccessMessage.waitFor();
        const message = await this.cartSuccessMessage.textContent();
        return message;
    }
 }