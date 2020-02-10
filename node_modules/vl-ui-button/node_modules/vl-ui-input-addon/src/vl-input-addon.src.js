import { NativeVlElement, define } from '/node_modules/vl-ui-core/vl-core.js';

export const VlInputAddonElement = (SuperClass) => {
    return class extends NativeVlElement(SuperClass) {
        connectedCallback() {
            this.classList.add('vl-input-addon');
        }
    }
}

/**
 * VlInput-addon
 * @class
 * @classdesc Gebruik de input-addon in combinatie met de vl-ui-input-group webcomponent. Deze combinatie zorgt ervoor dat de gebruiker extra informatie ontvangt over de inhoud of de vorm van de inhoud dat ingevuld moet worden.
 * 
 * @extends NativeVlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-input-addon/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-input-addon/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-input-addon.html|Demo}
 * 
 */
export class VlInputAddon extends VlInputAddonElement(HTMLParagraphElement) {}

define('vl-input-addon', VlInputAddon, {extends: 'p'});