import { NativeVlElement, define } from '/node_modules/vl-ui-core/vl-core.js';
import { VlPillElement } from "/node_modules/vl-ui-pill/vl-pill.js";
import { VlInputAddonElement } from "/node_modules/vl-ui-input-addon/vl-input-addon.js";

export const VlButtonElement = (SuperClass) => {
    return class extends NativeVlElement(SuperClass) {
        static get _observedAttributes() {
            return [];
        }

        static get _observedClassAttributes() {
            return ['disabled', 'error', 'block', 'large', 'wide', 'narrow', 'secondary', 'tertiary', 'loading'];
        }

        connectedCallback() {
            this.classList.add('vl-button');
            setTimeout(() => {
                this._setIconClass();
            });
        }

        get _classPrefix() {
            return 'vl-button--';
        }

        get _stylePath() {
            return '../style.css';
        }

        _setIconClass() {
            const icon = this.querySelector('[is="vl-icon"]');
            if (icon) {
                let suffix = '';
                suffix += icon.hasAttribute('before') ? '-before' : '';
                suffix += icon.hasAttribute('after') ? '-after' : '';
                this.classList.add(this._classPrefix + 'icon' + suffix);
                icon.classList.add('vl-button__icon');
                if (suffix) {
                    icon.classList.add('vl-button__icon-' + suffix);
                }
                icon.classList.remove('vl-icon--before');
                icon.classList.remove('vl-icon--after');
            }
        }
    }
};

/**
 * VlButton
 * @class
 * @classdesc Gebruik de vl-button om een ​​call-to-action toe te voegen. Het type call-to-action wordt bepaald door het label of de pictogram.
 * 
 * @extends NativeVlElement
 * 
 * @property {boolean} disabled - Attribuut wordt gebruikt om aan de gebruiker aan te duiden dat de functionaliteit niet actief is.
 * @property {boolean} error - Attribuut wordt gebruikt om het belang of de gevolgen van een actie te benadrukken.
 * @property {boolean} block - Attribuut wordt gebruikt om ervoor te zorgen dat de knop getoond wordt als een block element en bijgevol de breedte van de parent zal aannemen.
 * @property {boolean} large - Attribuut wordt gebruikt om de aandacht van de gebruiker te trekken door de font-size te vergroten.
 * @property {boolean} wide - Attribuut zorgt ervoor dat de knop breder op het scherm zal getoond worden.
 * @property {boolean} narrow - Attribuut zorgt ervoor dat de knop smaller op het scherm zal getoond worden.
 * @property {boolean} loading - Attribuut wordt gebruikt om aan de gebruiker aan te geven dat zijn actie momenteel verwerkt wordt.
 * @property {boolean} secondary - Attribuut wordt gebruikt in combinatie met een gewone knop om alternatieve acties te voorzien.
 * @property {boolean} tertiary - Attribuut wordt gebruikt in combinatie met gewone en secondary knoppen om alternatieve acties te voorzien.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-button/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-button/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-button.html|Demo}
 */
export class VlButton extends VlButtonElement(HTMLButtonElement) {}

/**
 * VlLinkButton
 * @class
 * @classdesc Gebruik de vl-link-button om een ​​call-to-action toe te voegen.
 *
 * @extends NativeVlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-link/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-link/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-link.html|Demo}
 */
export class VlLinkButton extends VlButtonElement(HTMLAnchorElement) {}

export class VlButtonPill extends VlPillElement(NativeVlElement(HTMLButtonElement)) {
    constructor() {
        super();
        this.classList.add('vl-pill');
        this.classList.add('vl-pill--clickable');
    }

    get _stylePath() {
        return '../style.css';
    }
}

export class VlButtonInputAddon extends VlInputAddonElement(NativeVlElement(HTMLButtonElement)) {
    
} 

define('vl-button', VlButton, {extends: 'button'});
define('vl-button-pill', VlButtonPill, {extends: 'button'});
define('vl-button-input-addon', VlButtonInputAddon, {extends: 'button'});
define('vl-link-button', VlLinkButton, {extends: 'a'});