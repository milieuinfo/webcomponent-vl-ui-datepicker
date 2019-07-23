import {VlElement, define} from '/node_modules/vl-ui-core/vl-core.js';

import "/node_modules/flatpickr/dist/flatpickr.min.js";
import "/node_modules/flatpickr/dist/l10n/nl.js";
import "/node_modules/flatpickr/dist/l10n/fr.js";
import "/node_modules/flatpickr/dist/l10n/de.js";
import "/node_modules/vl-ui-input-group/vl-input-group.js";
import "/node_modules/vl-ui-input-field/vl-input-field.js";
import "/node_modules/vl-ui-button/vl-button.js";
import "/node_modules/vl-ui-icon/vl-icon.js";

(() => {
  const id = 'flatpickr-style';
  addStyle();

  //nodig zolang de datepicker niet binnen de shadowDOM kan worden gehouden

  function addStyle() {
    if (!document.head.querySelector('#' + id)) {
      var style = getStyle();
      document.head.appendChild(style);
    }
  }

  function getStyle() {
    var link = document.createElement('link');
    link.setAttribute('id', id);
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', '../style.css');
    return link;
  }
})();

/**
 * vl-datepicker
 *
 * ### Custom attributen
 * Attribuut | Type | Toelichting | Default en mogelijke waarden
 * ----------|------|-------------|-----------------------------
 * type | {string} | bepaalt het soort picker | 'date' (default), 'time', 'date-time', 'date-range' en 'multiple-dates'
 * locale | {string} | bepaalt de taal en daaraan gekoppelde aspecten zoals eerste dag van de week | 'nl' (default), 'en', 'fr' en 'de'
 * format |{string} | bepaalt het formaat van de datum/tijd waarde | default 'd-m-Y' (-> 31-12-2019)
 * human-format | {string} | bepaalt hoe de gekozen datum/tijd weergegeven wordt | bv. 'l j F Y \\o\\m H:i \\u\\u\\r' (-> woensdag 17 april 2019 om 12:00 uur)
 * default-date | {string} | een vooringestelde datum | conform het ingestelde format (bv. '03-10-2019') of 'today' voor vandaag
 * min-date | {string} | een minimum datum | conform het ingestelde format (bv. '01-01-2019') of 'today' voor vandaag
 * max-date | {string} | een maximum datum | conform het ingestelde format (bv. '31-12-2019') of 'today' voor vandaag
 * disabled-dates | {string} | een set datums en datum-ranges als JSON array | /!\ JSON requires double quotes /!\
 * disable-weekends | {boolean} | optie om weekeinden te disabelen | [geen waarde]
 * min-time | {string} | conform het ingestelde format (bv. 09:00)
 * max-time | {string} | conform het ingestelde format (bv. 17:00)
 * am-pm | {boolean} | optie om de 12-uurs AM/PM timepicker te gebruiken ipv de (standaard) 24-uurs timepicker | [geen waarde]
 *
 * @demo demo/vl-datepicker.html
 */
export class VlDatepicker extends VlElement(HTMLElement) {

  constructor() {
    super(`
        <style>
            @import "../style.css";          
        </style>
        <vl-input-group>
          <input 
            id="input"
            is="vl-input-field"
            data-input
            type="text"
            block
          />
          <button 
            id="button" 
            is="vl-button" 
            type="button" 
            name="button"
            class="vl-input-addon"
            secondary 
            data-toggle>
              <span 
                id="icon" 
                is="vl-icon" 
                icon="calendar" 
                class="vl-vi"
                aria-hidden="true"></span>
          </button>
        </vl-input-group>
        `);
    this.__configureCommonOptions();
  }

  static get _observedAttributes() {
    return [
      'type',
      'locale',
      'format',
      'human-format',
      'default-date',
      'min-date',
      'max-date',
      'disabled-dates',
      'disable-weekends',
      'min-time',
      'max-time',
      'am-pm'
    ];
  }

  connectedCallback() {
    this.__configureTypeSpecificOptions();
    this.__createFlatpickr();
  }

  __configureCommonOptions() {
// defaults in lijn met Webuniversum component
    this._options = {
      locale: "nl",
      dateFormat: "d-m-Y",
      time_24hr: true,
      wrap: true
    };

    //@TODO: set option to append datepicker inside shadowDOM for encapsulation, so that global CSS is not needed
    //WARNING: causes positioning issue: https://github.com/flatpickr/flatpickr/issues/1024
    //WARNING: may cause issues wrt z-index and stacking context
    this._options.appendTo = this._element;
  }

  /**
   * Options specific to the type of picker
   * supported types: date | time | date-time | multiple-dates | date-range
   * Time range and multiple times are not supported by flatpickr
   * multiple dates with times and date-range with times are supported by flatpickr, but not in this component, because unconventional UX
   */
  __configureTypeSpecificOptions() {
    const type = this.getAttribute('type');
    switch (type) {
      case 'time':
        this.__configureTimeOptions();
        break;

      case 'date-time':
        this.__configureDateTimeOptions();
        break;

      case 'multiple-dates':
        this.__configureMultipleDatesOptions();
        break;

      case 'date-range':
        this.__configureDateRangeOptions();
        break;
    }
  }

  __configureDateRangeOptions() {
    this._options.mode = 'range';
  }

  __configureMultipleDatesOptions() {
    this._options.mode = 'multiple';
  }

  __configureDateTimeOptions() {
    this._options.enableTime = true;
  }

  __configureTimeOptions() {
    this._options.enableTime = true;
    this._options.noCalendar = true;
    this._element.querySelector('#icon').setAttribute('icon', 'clock');
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    this.__createFlatpickr();
  }

  _typeChangedCallback(oldValue, newValue) {
    console.error('The "type" attribute cannot be changed.');
  }

  _localeChangedCallback(oldValue, newValue) {
    this._options.locale = (newValue) ? newValue : 'nl';
  }

  _formatChangedCallback(oldValue, newValue) {
    this._options.dateFormat = (newValue) ? newValue : 'd-m-Y';
  }

  _human_formatChangedCallback(oldValue, newValue) {
    this._options.altInput = !!(newValue);
    this._options.altFormat = newValue;
  }

  _default_dateChangedCallback(oldValue, newValue) {
    this._options.defaultDate = newValue;
  }

  _min_dateChangedCallback(oldValue, newValue) {
    this._options.minDate = newValue;
  }

  _max_dateChangedCallback(oldValue, newValue) {
    this._options.maxDate = newValue;
  }

  _min_timeChangedCallback(oldValue, newValue) {
    this._options.minTime = newValue;
  }

  _max_timeChangedCallback(oldValue, newValue) {
    this._options.maxTime = newValue;
  }

  _am_pmChangedCallback(oldValue, newValue) {
    this._options.time_24hr = (!this.hasAttribute('am-pm'));
  }

  _disabled_datesChangedCallback(oldValue, newValue) {
    this.__disableDates();
  }

  _disable_weekendsChangedCallback(oldValue, newValue) {
    this.__disableDates();
  }

  __disableDates() {
    const disabledDates = this.getAttribute('disabled-dates');
    this._options.disable = (disabledDates) ? JSON.parse(disabledDates) : [];

    if (this.hasAttribute('disable-weekends')) {
      this._options.disable.push(function (date) {
        return (date.getDay() === 0 || date.getDay() === 6)
      });
    }
  }

  __createFlatpickr() {
    this._picker = window.flatpickr(this._element, this._options);
  }
}

define('vl-datepicker', VlDatepicker);
