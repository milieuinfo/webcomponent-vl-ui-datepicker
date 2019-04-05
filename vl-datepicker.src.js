import { VlElement } from '/node_modules/vl-ui-core/vl-core.js';

import "/node_modules/flatpickr/dist/flatpickr.min.js";
import "/node_modules/flatpickr/dist/l10n/nl.js";
import "/node_modules/flatpickr/dist/l10n/fr.js";
import "/node_modules/flatpickr/dist/l10n/de.js";

(() => {
    const id = 'flatpickr-style';
    addStyle();

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
 * @demo demo/vl-datepicker.html
 */
export class VlDatepicker extends VlElement(HTMLElement) {

    constructor() {
        super(`
            <style>
                @import "../style.css";
            </style>
            <div id="wrapper" class="vl-input-group">
                <input data-input
                        id="input"
                    class="vl-input-field vl-input-field--block"
                    type="text"/>
                <button data-toggle
                        type="button"
                        name="button"
                        class="vl-input-addon">
                    <i class="vl-vi vl-vi-calendar" aria-hidden="true"></i>
                </button>
            </div>
        `);

        this._options = { // defaults in lijn met Webuniversum component
            locale: "nl",
            format: "d.m.Y.",
            wrap: true
        };
    }

    connectedCallback() {
        this.__createFlatpickr();
    }

    static get _observedAttributes() {
        return [
            'locale',           // nl (default) | en | fr | de
            'format',           // bv. 'Y-m-d' -> 2019-12-31
            'human-format',     // bv.  'l j F Y \\o\\m H:i \\u\\u\\r' -> woensdag 17 april 2019 om 12:00 uur
            'default-date',
            'selected-date',    // conform format (default Y-m-d)
            'min-date',         // conform format (default Y-m-d)
            'max-date',         // conform format (default Y-m-d)
            'disabled-dates',   // JSON array of dates and date ranges. Note that JSON requires double quotes!
            'min-time',
            'max-time',
            '24hr-time',        // true | false
            'type'              // date (default) | time | date-time | date-range | date-time-range | multiple-dates
        ];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        super.attributeChangedCallback(attr, oldValue, newValue);
        this.__createFlatpickr();
    }

    _typeChangedCallback(oldValue, newValue) {
        // supported options: date | time | date-time | multiple-dates | date-range | date-time-range
        // time range or multiple times is not supported by flatpickr
        // multiple dates with times is supported but the experience is unconventional
        switch(newValue) {
            case 'time':
                this._options.enableTime = true;
                this._options.noCalendar = true;
                let iconClasslist = this._element.querySelector('.vl-vi-calendar').classList;
                iconClasslist.remove('vl-vi-calendar');
                iconClasslist.add('vl-vi-clock');
                break;

            case 'date-time':
                this._options.enableTime = true;
                break;

            case 'multiple-dates':
                this._options.mode = 'multiple';
                break;

            case 'date-range':
                this._options.mode = 'range';
                break;

            case 'date-time-range':
                this._options.enableTime = true;
                this._options.mode = 'range';
                break;

            default:
                break;
        }
    }

    _localChangedCallback(oldValue, newValue) {
        if (newValue){
            this._options.locale = newValue;
        }
    }

    _formatChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._options.dateFormat = newValue;
        }
    }

    _human_formatChangedCallback(oldValue, newValue) {
        if(newValue) {
            this._options.altInput = true;
            this._options.altFormat = newValue;
        }
    }

    _default_dateChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._options.defaultDate = newValue;
        }
    }

    _min_dateChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._options.minDate = newValue;
        }
    }

    _max_dateChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._options.maxDate = newValue;
        }
    }

    _min_timeChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._options.minTime = newValue;
        }
    }

    _max_timeChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._options.maxTime = newValue;
        }
    }

    _24_hoursChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._options.time_24hr = true;
        }
    }

    _disabled_datesChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._options.disable = JSON.parse(newValue);
        }
    }

    __createFlatpickr() {
        this._picker = flatpickr(this._element, this._options);
    }
}

customElements.define('vl-datepicker', VlDatepicker);
