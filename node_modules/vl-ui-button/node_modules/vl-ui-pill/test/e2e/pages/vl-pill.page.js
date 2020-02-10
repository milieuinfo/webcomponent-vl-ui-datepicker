const VlPill = require('../components/vl-pill');
const { Page, Config } = require('vl-ui-core').Test;

class VlPillPage extends Page {
    async _getPill(selector) {
        return new VlPill(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-pill.html');
    }
}

module.exports = VlPillPage;
