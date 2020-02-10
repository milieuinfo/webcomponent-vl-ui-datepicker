const VlInputAddon = require('../components/vl-input-addon');
const { Page, Config } = require('vl-ui-core').Test;

class VlInputAddonPage extends Page {
    async _getInputAddon(selector) {
        return new VlInputAddon(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-input-addon.html');
    }
}

module.exports = VlInputAddonPage;
