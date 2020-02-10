const { VlElement } = require('vl-ui-core').Test;

class VlLink extends VlElement {  
    constructor(driver, selector) {
        super(driver, selector);
    }
}

module.exports = VlLink;
