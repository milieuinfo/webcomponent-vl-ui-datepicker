
import '/node_modules/vl-ui-core/vl-core.src.js';

import "../node_modules/flatpickr/dist/flatpickr.js";
import "../node_modules/flatpickr/dist/l10n/nl.js";
import "../node_modules/flatpickr/dist/l10n/fr.js";
import "../node_modules/flatpickr/dist/l10n/de.js";


/**
 * vl-datepicker
 *
 * @demo demo/vl-datepicker.html
 */
export class VlDatepicker extends HTMLElement {

    constructor() {
        const html = `
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
        `;

        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = html;

        this._options = { // defaults in lijn met Webuniversum component
            locale: "nl",
            format: "d.m.Y.",
            wrap: true
        };

        let locale = this.getAttribute('locale');
        if(locale){
            this._options.locale = locale;
        }

        let format = this.getAttribute('format');
        if(format){
            this._options.dateFormat = format;
        }

        let human = this.getAttribute('human-format');
        if(human){
            this._options.altInput = true;
            this._options.altFormat = human;
        }

        let defaultDate = this.getAttribute('default-date');
        if(defaultDate){
            this._options.defaultDate = defaultDate;
        }

        let minDate = this.getAttribute('min-date');
        if(minDate){
            this._options.minDate = minDate;
        }

        let maxDate = this.getAttribute('max-date');
        if(maxDate){
            this._options.maxDate = maxDate;
        }

        let minTime = this.getAttribute('min-time');
        if(minTime){
            this._options.minTime = minTime;
        }

        let maxTime = this.getAttribute('max-time');
        if(maxTime){
            this._options.maxTime = maxTime;
        }

        if(this.hasAttribute('24-hours')){
            this._options.time_24hr = true;
        }

        let disabledDates = this.getAttribute('disabled-dates');
        if(disabledDates){
            this._options.disable = JSON.parse(disabledDates);
        }

        let type = this.getAttribute('type');
        // supported options: date | time | date-time | multiple-dates | date-range | date-time-range
        // time range or multiple times is not supported by flatpickr
        // multiple dates with times is supported but the experience is unconventional
        switch(type){

            case 'date':
                break;

            case 'time':
                this._options.enableTime = true;
                this._options.noCalendar = true;
                let iconClasslist = this.shadowRoot.querySelector('.vl-vi-calendar').classList;
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

        this._picker = flatpickr(this.shadowRoot.querySelector('#wrapper'),this._options);

    }

    static get observedAttributes() {
        return [
            'locale',           // nl (default) | en | fr | de
            'format',           // bv. 'Y-m-d' -> 2019-12-31
            'human-format',     // bv.  'l j F Y \\o\\m H:i \\u\\u\\r' -> woensdag 17 april 2019 om 12:00 uur
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

        // @TODO
        // NB: many attributes probably require re-initialization
        switch(attr){
            default:
                break;
        }
    }
}

customElements.define('vl-datepicker', VlDatepicker);