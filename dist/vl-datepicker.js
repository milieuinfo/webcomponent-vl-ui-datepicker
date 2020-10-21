import {vlElement, define, awaitUntil} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-input-addon/dist/vl-input-addon.js';
import '/node_modules/vl-ui-input-group/dist/vl-input-group.js';
import '/node_modules/vl-ui-input-field/dist/vl-input-field.js';
import {vlFormValidation, vlFormValidationElement} from '/node_modules/vl-ui-form-validation/dist/vl-form-validation-all.js';
import {vlPattern} from '/node_modules/vl-ui-pattern/dist/vl-pattern.js';
import '/node_modules/vl-ui-icon/dist/vl-icon.js';
import '/node_modules/vl-ui-datepicker/lib/datepicker.js';

Promise.all([
  vlFormValidation.ready(),
  vlPattern.ready(),
]).then(() => define('vl-datepicker', VlDatepicker));

/**
 * VlDatepicker
 * @class
 * @classdesc Gebruik de vl-datepicker om de gebruiker op een gebruiksvriendelijke manier een datum of tijd te laten selecteren.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {(range | time | date-time)} data-vl-type - Attribuut bepaalt het soort datepicker.
 * @property {string} data-vl-format - Attribuut bepaalt het formaat van de datum/tijd waarde, standaard 'd.m.Y' (-> 31.12.2019).
 * @property {string} data-vl-visual-format - Attribuut bepaalt het visueel formaat van de datum/tijd waarde.
 * @property {string} data-vl-selected-date - Attribuut voor een vooringestelde datum conform het ingestelde formaat (bv. '03-10-2019') of 'today' voor vandaag.
 * @property {string} data-vl-min-date - Attribuut voor een minimum datum conform het ingestelde formaat (bv. '01-01-2019') of 'today' voor vandaag.
 * @property {string} data-vl-max-date - Attribuut voor een maximum datum conform het ingestelde format (bv. '31-12-2019') of 'today' voor vandaag.
 * @property {string} data-vl-min-time - Attribuut voor een minimum tijd conform het ingestelde formaat (bv. '09:00').
 * @property {string} data-vl-max-time - Attribuut voor een maximum tijd conform het ingestelde format (bv. '17:00').
 * @property {boolean} data-vl-am-pm - Attribuut om de 12-uurs AM/PM timepicker te activeren.
 * @property {boolean} data-vl-error - Attribuut om aan te geven dat de datepicker een error bevat.
 * @property {boolean} data-vl-success - Attribuut om aan te geven dat de datepicker geen error bevat.
 * @property {boolean} data-vl-value - Attribuut om de waarde te definiëren.
 * @property {string} data-vl-pattern - Attribuut om aan te geven aan welk patroon de input moet voldoen.
 * @property {string} data-vl-name - Attribuut om aan de naam te definiëren.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-datepicker/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-datepicker/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-datepicker.html|Demo}
 */
export class VlDatepicker extends vlFormValidationElement(vlElement(HTMLElement)) {
  static get _observedAttributes() {
    return vlFormValidation._observedAttributes().concat([
      'type',
      'format',
      'visual-format',
      'selected-date',
      'min-date',
      'max-date',
      'min-time',
      'max-time',
      'am-pm',
      'error',
      'success',
      'value',
      'pattern',
    ]);
  }

  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-datepicker/dist/style.css';

        #wrapper {
          position: relative;
        }

        .flatpickr-calendar {
          display: none;
        }
      </style>
      <div is="vl-input-group" id="wrapper" data-vl-datepicker>
        <input id="input" is="vl-input-field" data-vl-block type="text" class="js-vl-datepicker-input"/>
        <button id="button" is="vl-button-input-addon" type="button" class="js-vl-datepicker-toggle">
          <span id="icon" is="vl-icon" data-vl-icon="calendar"></span>
        </button>
      </div>
    `);
  }

  connectedCallback() {
    this.dress();
    this._registerChangeEvent();
  }

  get value() {
    return this._inputElement.value;
  }

  set value(value) {
    if (this._inputElement._flatpickr) {
      this._inputElement._flatpickr.setDate(value, true, this._format);
    } else {
      this._inputElement.value = value;
    }
  }

  /**
   * Initialiseer de datepicker config.
   */
  dress() {
    if (!this._dressed) {
      awaitUntil(() => this._inputElement.classList.contains('vl-input-field')).then(() => {
        vl.datepicker.dress(this._element);
        this._dressFormValidation();
        this._dressPattern();
      });
    }
  }

  /**
   * Geeft focus aan het datepicker input element.
   */
  focus() {
    this._visibleInputElement.focus();
  }

  get _attributePrefix() {
    return 'data-vl-datepicker-';
  }

  get _inputElement() {
    return this._element.querySelector('#input');
  }

  get _visibleInputElement() {
    return this._element.querySelector('input:not([type="hidden"])');
  }

  get _format() {
    return this.getAttribute('format');
  }

  get _dressed() {
    return this._inputElement._flatpickr != undefined;
  }

  _typeChangedCallback(oldValue, newValue) {
    if (oldValue) {
      console.error('The "type" attribute cannot be changed.');
    } else {
      switch (newValue) {
        case 'time':
          this._element.setAttribute(this._attributePrefix + 'enable-time', 'true');
          this._element.setAttribute(this._attributePrefix + 'disable-date', 'true');
          break;
        case 'date-time':
          this._element.setAttribute(this._attributePrefix + 'enable-time', 'true');
          break;
        default:
          this._element.setAttribute(this._attributePrefix + newValue, '');
          break;
      }
    }
  }

  _formatChangedCallback(oldValue, newValue) {
    this._element.setAttribute(this._attributePrefix + 'format', newValue);
  }

  _visualFormatChangedCallback(oldValue, newValue) {
    this._element.setAttribute(this._attributePrefix + 'visual-format', newValue);
  }

  _selectedDateChangedCallback(oldValue, newValue) {
    this._element.setAttribute(this._attributePrefix + 'selected-date', newValue);
  }

  _minDateChangedCallback(oldValue, newValue) {
    this._element.setAttribute(this._attributePrefix + 'min-date', newValue);
  }

  _maxDateChangedCallback(oldValue, newValue) {
    this._element.setAttribute(this._attributePrefix + 'max-date', newValue);
  }

  _minTimeChangedCallback(oldValue, newValue) {
    this._element.setAttribute(this._attributePrefix + 'min-time', newValue);
  }

  _maxTimeChangedCallback(oldValue, newValue) {
    this._element.setAttribute(this._attributePrefix + 'max-time', newValue);
  }

  _amPmChangedCallback(oldValue, newValue) {
    this._element.setAttribute(this._attributePrefix + '24hr-time', (newValue == undefined));
  }

  _errorChangedCallback(oldValue, newValue) {
    if (newValue != undefined) {
      this._inputElement.setAttribute('data-vl-error', '');
    } else {
      this._inputElement.removeAttribute('data-vl-error');
    }
  }

  _valueChangedCallback(oldValue, newValue) {
    this.value = newValue;
  }

  _successChangedCallback(oldValue, newValue) {
    if (newValue != undefined) {
      this._inputElement.setAttribute('data-vl-success', '');
    } else {
      this._inputElement.removeAttribute('data-vl-success');
    }
  }

  _patternChangedCallback(oldValue, newValue) {
    this._inputElement.setAttribute('data-vl-pattern', newValue);
  }

  _registerChangeEvent() {
    this._inputElement.addEventListener('change', () => this.dispatchEvent(new Event('change')));
  }

  _dressPattern() {
    vl.pattern.undressAll();
    Object.assign(this, vlPattern);
    this.dress(this._inputElement);
    this.dress = this._dress;
  }
}
