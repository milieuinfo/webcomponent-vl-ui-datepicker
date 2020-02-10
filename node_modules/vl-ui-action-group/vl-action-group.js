import { NativeVlElement, define } from '/node_modules/vl-ui-core/vl-core.js';

/**
 * VLActionGroup
 * @class
 * @classdesc Toon meerdere knoppen of links. De groep zorgt ervoor dat ze correct zijn uitgelijnd.
 *
 * @extends NativeVlElement
 *
 * @property {string} align - Attribuut wordt gebruikt om ervoor te zorgen dat de onderliggende elementen worden gealigneerd. Mogelijkheden: align="center" of align="right".
 * @property {boolean} space-between - Attribuut wordt gebruikt om aan te duiden dat de ruimte tussen de elementen volledig moet worden opgevuld.
 * @property {boolean} bordered - Attribuut wordt gebruikt om aan te duiden dat de tussenliggende elementen een rand krijgen.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-action-group/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-action-group/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-action-group.html|Demo}
 */
export class VlActionGroup extends NativeVlElement(HTMLDivElement) {
  connectedCallback() {
    this.classList.add('vl-action-group');
  }

  get _classPrefix() {
    return 'vl-action-group--';
  }

  get _stylePath() {
    return '/node_modules/vl-ui-action-group/style.css';
  }


  static get _observedClassAttributes() {
    return ['align', 'space-between', 'bordered'];
  }

  _alignChangedCallback(oldValue, newValue) {
    this._changeClass(this, ('align-' + oldValue), ('align-' + newValue), this._classPrefix);
  }
}

define('vl-action-group', VlActionGroup, { extends: 'div' });
