const { WebElement } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

class VlElement extends WebElement {
    constructor(driver, identifier) {
        return (async () => {
            if (typeof identifier === 'string') {
                super(driver, await driver.findElement(By.css(identifier)).getId())
                this.selector = identifier;
            } else {
                super(driver, await identifier.getId());
            }
            this.driver = driver;
            if (await this.driver.executeScript('return arguments[0].shadowRoot != undefined', this)) {
                this.shadowRoot = await new VlElement(this.driver, await this.driver.executeScript('return arguments[0].shadowRoot.lastElementChild', this));
            }
            return this;
        })();
    }

    async findElement(selector) {
        const element = await super.findElement(selector);
        return await new VlElement(this.driver, element);
    }

    async getClassList() {
        return (await this.getAttribute('class')).split(' ');
    }

    async isDisabled() {
        return !(await this.isEnabled());
    }

    async hasClass(clazz) {
        return (await this.getClassList()).includes(clazz);
    }

    async hasAttribute(name) {
        return (await super.getAttribute(name)) != null;
    }

    async hasText() {
        return (await this.getText()) != '';
    }

    async getInnerHTML() {
        return this.getAttribute("innerHTML");
    }

    async hasFocus() {
        const getActiveElement = async (element) => {
            if (element.shadowRoot) {
                const activeElement = await (this.driver.executeScript('return arguments[0].shadowRoot.activeElement', element));
                return getActiveElement(await new VlElement(this.driver, activeElement));
            } else {
                return element;
            }
        }
        const activeElement = await getActiveElement(await new VlElement(this.driver, await this.driver.switchTo().activeElement()));
        return WebElement.equals(this, activeElement);
    }
}

module.exports = VlElement;
