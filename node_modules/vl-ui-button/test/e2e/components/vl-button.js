const { VlElement } = require('vl-ui-core').Test;
const { VlIcon } = require('vl-ui-icon').Test;

class VlButton extends VlElement {  
    constructor(driver, selector) {
        super(driver, selector);
    }

    async getIcon() {
        return new VlIcon(this.driver, this.selector + ' [is="vl-icon"]');
    }

    async isError() {
        return this.hasAttribute('error');
    }

    async isBlock() {
        return this.hasAttribute('block');
    }

    async isLarge() {
        return this.hasAttribute('large');
    }

    async isWide() {
        return this.hasAttribute('wide');
    }

    async isNarrow() {
        return this.hasAttribute('narrow');
    }

    async isLoading() {
        return this.hasAttribute('loading');
    }

    async isSecondary() {
        return this.hasAttribute('secondary');
    }

    async isTertiary() {
        return this.hasAttribute('tertiary');
    }

    async isLink() {
        return this.hasClass('vl-link');
    }

    async isPill() {
        return this.hasClass('vl-pill');
    }

    async getPillType() {
        return this.getAttribute('data-vl-type');
    }

    async isSuccessPill() {
        return (await this.getPillType()) === 'success';
    }

    async isWarningPill() {
        return (await this.getPillType()) === 'warning';
    }

    async isErrorPill() {
        return (await this.getPillType()) === 'error';
    }

    async isInputAddon() {
        return this.hasClass('vl-input-addon');
    }

    async hasIcon() {
        try {
            await this.getIcon();
            return true;
        } catch(e) {
            return false;
        }
    }
}

module.exports = VlButton;
