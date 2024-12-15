import { Locator, Page } from "@playwright/test";

export class ShoppingCart {

    cartItems: Locator;
    itemName: Locator;
    itemSize: Locator;
    itemColor: Locator;
    itemPrice: Locator;
    itemQtyInput: Locator;
    itemRemoveButton: Locator;
    proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.cartItems = page.locator("tbody.cart.item");

        this.itemName = page.locator(".product-item-name");
        this.itemSize = page.locator("dt:has-text('Size') + dd"); 
        this.itemColor = page.locator("dt:has-text('Color') + dd"); 
        this.itemPrice = page.locator(".cart-price .price");

        this.itemQtyInput = page.locator('input.qty'); 
        this.itemRemoveButton = page.locator('[title="Remove item"]'); 

        this.proceedToCheckoutButton = page.locator('button[title="Proceed to Checkout"]');
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async getItemDetails(index: number) {

        const name = await this.itemName.nth(index).textContent();
        const size = await this.itemSize.nth(index).textContent();
        const color = await this.itemColor.nth(index).textContent();
        const price = await this.itemPrice.nth(index).textContent();

        return { name, size, color, price };
    }

    async updateItemQty(index: number, qty: number) {

        const qtyInput = this.itemQtyInput.nth(index);
        await qtyInput.fill(qty.toString());
        await qtyInput.press('Enter'); 
    }

    async removeItem(index: number) {

        const removeButton = this.itemRemoveButton.nth(index);
        await removeButton.click();
        await removeButton.waitFor({ state: "detached" }); 
    }
}
