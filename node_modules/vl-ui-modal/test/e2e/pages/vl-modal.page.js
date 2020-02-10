const VlModal = require('../components/vl-modal');
const { Page, Config, VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlModalPage extends Page {
    async _getModal(identifier) {
        return new VlModal(this.driver, identifier);
    }

    async _openModal(selector) {
        const button = await this.driver.findElement(By.css(selector));
        return button.click();
    }

    async getModalZonderButtonEnContent() {
        return await this._getModal('#modal-zb');
    }

    async getModalClosable() {
        return await this._getModal('#modal-cl');
    }

    async getModalClosableNietAutomatisch() {
        return await this._getModal('#modal-cl-na');
    }

    async getModalClosableNietCancellable() {
        return await this._getModal('#modal-cl-nc');
    }

    async getModalClosableNietCancellableMetButtonEnContent() {
        return await this._getModal('#modal-cl-nc-bc');
    }

    async getModalClosableNietCancellableMetLinkEnIcon() {
        return await this._getModal('#modal-cl-nc-li');
    }

    async getModalManual() {
        return await this._getModal('#modal-ma');
    }

    async getModalListener() {
        return await this._getModal('#modal-lis');
    }

    async getModalSafari() {
        const container = await new VlElement(this.driver, 'vl-modal-container-test');
        const parent = container.shadowRoot;
        return await this._getModal(parent.shadowRoot);
    }

    async openModalZonderButtonEnContent() {
        return this._openModal('#button-open-modal-zb');
    }

    async openModalClosable() {
        return this._openModal('#button-open-modal-cl')
    }

    async openModalClosableNietAutomatisch() {
        return this._openModal('#button-open-modal-cl-na');
    }

    async openModalClosableNietCancellable() {
        return this._openModal('#button-open-modal-cl-nc');
    }

    async openModalClosableNietCancellableMetButtonEnContent() {
        return this._openModal('#button-open-modal-cl-nc-bc');
    }
    
    async openModalClosableNietCancellableMetLinkEnIcon() {
        return this._openModal('#button-open-modal-cl-nc-li');
    }

    async openModalManual() {
        return this._openModal('#button-open-modal-ma');
    }

    async openModalListener() {
        return this._openModal('#button-open-modal-lis');
    }

    async openModalSafari() {
        return this._openModal('#button-open-modal-safari');
    }

    async klikVoegListenerToe() {
        return this.driver.findElement(By.css('#add-listener')).click();
    }

    async getListenerText() {
        const button = await this.driver.findElement(By.css('#button-open-modal-lis'));
        return button.getText();
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-modal.html');
    }
}

module.exports = VlModalPage;
