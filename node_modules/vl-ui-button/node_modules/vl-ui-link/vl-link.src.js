import { NativeVlElement, define } from 'vl-ui-core';

export const VlLinkElement = (SuperClass) => {
    return class extends NativeVlElement(SuperClass) {
        static get _observedAttributes() {
            return [];
        }
    
        static get _observedClassAttributes() {
            return ['block'];
        }
    
        connectedCallback() {
            this.classList.add('vl-link');
            this._setIconLinkAttribute();
        }
    
        get _classPrefix() {
            return 'vl-link--';
        }
    
        get _iconElementen() {
            return this.querySelectorAll('[is="vl-icon"]');
        }
    
        _setIconLinkAttribute() {
            this._iconElementen.forEach((icon) => {
                icon.setAttribute('link', '');
            });
        }
    }
};

/**
 * VlLink
 * @class
 * @classdesc Gebruik de vl-link om de gebruiker door te verwijzen naar een andere URL, bijvoorbeeld een nieuwe pagina of een document.
 * 
 * @extends NativeVlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-link/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-link/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-link.html|Demo}
 */
export class VlLink extends VlLinkElement(HTMLAnchorElement) {}

/**
 * VlButtonLink
 * @class
 * @classdesc Een button gestyled als link.
 *
 * @extends NativeVlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-link/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-link/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-link.html|Demo}
 */
export class VlButtonLink extends VlLinkElement(HTMLButtonElement) {}

define('vl-link', VlLink, {extends: 'a'});
define('vl-button-link', VlButtonLink, {extends: 'button'});

