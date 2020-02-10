const { VlElement } = require('vl-ui-core').Test;

class VlIcon extends VlElement {
    constructor(driver, selector) {
        super(driver, selector);
    }

    get _iconPrefix() {
        return 'vl-vi-';
    }

    async getIcon() {
        const classList = await this.getClassList();
        return classList.find((clazz) => {
            return clazz.includes(this._iconPrefix);
        }).substring(this._iconPrefix.length);
    }

    async isBefore() {
        return this.hasAttribute('before');
    }

    async isAfter() {
        return this.hasAttribute('after');
    }

    async getSize() {
        return this.getAttribute('size');
    }

    async isSmallSize() {
        return (await this.getSize()) === 'small';
     }
     
     async isLargeSize() {
        return (await this.getSize()) === 'large';
     }

    async isLight() {
        return this.hasAttribute('light');
    }

    async is90Degrees() {
        return this.hasAttribute('90deg');
    }

    async is180Degrees() {
        return this.hasAttribute('180deg');
    }
}

module.exports = VlIcon;
