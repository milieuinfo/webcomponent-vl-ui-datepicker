const { VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlSideSheet extends VlElement {  
    async _getSideSheet() {
        return this.shadowRoot;
    }

    async _getCloseButton() {
        return (await this._getSideSheet()).findElement(By.css('button.vl-side-sheet__close'));
    }

    async isOpen() {
        return (await this._getSideSheet()).hasAttribute('open');
    }

    async close() {
        return (await this._getCloseButton()).click();
    }

    async getText() {
        return (await this._getSideSheet()).getText();
    }

    async getContent() {
        const slot = await this.findElement(By.css('*'));
        return slot.getText();
    }
}

module.exports = VlSideSheet;
