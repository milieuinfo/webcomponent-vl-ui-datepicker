import { VlElement, NativeVlElement, define } from '/node_modules/vl-ui-core/vl-core.js';

export const VlPillElement = (SuperClass) => {
  return class extends VlElement(SuperClass) {
    static get _observedAttributes() {
      return ['type'];
    }
  
    get _classPrefix() {
      return 'vl-pill--';
    }
  
    _typeChangedCallback(oldValue, newValue) {
      if (["success", "warning", "error"].indexOf(newValue) >= 0) {
        this._changeClass(this._element, oldValue, newValue);
      } else {
        this._element.classList.remove(this._classPrefix + oldValue);
      }
    }
  }
};

/**
 * VlPill
 * @class
 * @classdesc Gebruik de pill om keywoorden (filters of tags) te visualiseren.
 *
 * @extends VlElement
 *
 * @property {(success | warning | error)} type - Attribuut bepaalt de soort van pill: succes, probleem of fout.
 * @property {closable} type - Attribuut bepaalt of de pill kan worden verwijderd.
 * @property {checkable} type - Attribuut bepaalt of de pill aangechecked kan worden dmv een checkbox.
 * 
 * @see {@link http://www.github.com/milieuinfo/webcomponent-vl-ui-pill/releases/latest|Release notes}
 * @see {@link http://www.github.com/milieuinfo/webcomponent-vl-ui-pill/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-pill.html|Demo}
 */
export class VlPill extends VlPillElement(HTMLElement) {
  static get pillTemplate() {
    return `
      <span class="vl-pill">
        <slot></slot>
      </span>
    `;
  }

  constructor() {
    super(`
      <style>
          @import "../style.css";
      </style>
      ${VlPill.pillTemplate}
    `);
  }

  static get _observedAttributes() {
    return super._observedAttributes.concat(['closable']);
  }

  _getPillTemplate() {
    return this._template(VlPill.pillTemplate);
  }

  _getClosablePillTemplate() {
    return this._template(`
      <div class="vl-pill vl-pill--closable">
          <slot></slot>
        <button class="vl-pill__close" type="button">
          <span class="vl-u-visually-hidden">Verwijderen</span>
        </button>
      </div>
    `);
  }

  _closableChangedCallback(oldValue, newValue) {
    this._shadow.lastElementChild.replaceWith((newValue != undefined ? this._getClosablePillTemplate() : this._getPillTemplate()));
  }
}

export class VlLabelPill extends VlPillElement(NativeVlElement(HTMLLabelElement)) {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('vl-pill');
    this.classList.add('vl-pill--checkable');
    const input = this._inputElement;
    input.classList.add("vl-pill--checkable__checkbox");
    input.insertAdjacentHTML('afterend', this._inputStyleElement);
  }

  get _inputElement() {
    return this._element.querySelector('input');
  }

  get _inputStyleElement() {
    return `
      <span></span>
    `;
  }
}

define('vl-pill', VlPill);
define('vl-label-pill', VlLabelPill, {extends: 'label'});
