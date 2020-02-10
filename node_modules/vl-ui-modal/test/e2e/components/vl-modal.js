const { VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlModal extends VlElement {  
    async isDisplayed() {
        const dialog = await this._getDialog();
        return dialog.isDisplayed();
    }

    async isCancellable() {
        return this._exists(() => this._getCancelButton());
    }

    async cancel() {
        const button = await this._getCancelButton();
        return button.click();
    }

    async isClosable() {
        return this._exists(() => this._getCloseButton());
    }

    async close() {
        const button = await this._getCloseButton();
        return button.click();
    }

    async isSubmittable() {
        return this._exists(() => this._getActionButton());
    }

    async submit() {
        const button = await this._getActionButton();
        return button.click();
    }

    async getContent() {
        return await this._getContent();
    }

    async _getDialog() {
        return this.shadowRoot.findElement(By.css('dialog'));
    }

    async _getCancelButton() {
        return this.shadowRoot.findElement(By.css('#modal-toggle-cancellable'));
    }

    async _getCloseButton() {
        return this.shadowRoot.findElement(By.css('#close'));
    }

    async _getContent() {
        return this.findElement(By.css('[slot="content"]'));
    }

    async _getActionButton() {
        return this.findElement(By.css('[slot="button"]'));
    }

    async _exists(getter) {
        try {
            await getter();
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = VlModal;
