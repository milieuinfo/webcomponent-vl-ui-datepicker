import { VlElement, define } from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-button/vl-button.js';
import '/node_modules/vl-ui-input-group/vl-input-group.js';
import '/node_modules/vl-ui-input-field/vl-input-field.js';
import '/node_modules/vl-ui-icon/vl-icon.js';
import '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js';
import '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js';
import '/dist/datepicker.js';

/**
 * VlDatepicker
 * @class
 * @classdesc Gebruik de vl-datepicker om de gebruiker op een gebruiksvriendelijke manier een datum of tijd te laten selecteren.
 * 
 * @extends VlElement
 * 
 * @property {(range | time | date-time)} type - Attribuut bepaalt het soort datepicker.
 * @property {string} format - Attribuut bepaalt het formaat van de datum/tijd waarde, standaard 'd.m.Y' (-> 31.12.2019).
 * @property {string} visual-format - Attribuut bepaalt het visueel formaat van de datum/tijd waarde.
 * @property {string} selected-date - Attribuut voor een vooringestelde datum conform het ingestelde formaat (bv. '03-10-2019') of 'today' voor vandaag.
 * @property {string} min-date - Attribuut voor een minimum datum conform het ingestelde formaat (bv. '01-01-2019') of 'today' voor vandaag.
 * @property {string} max-date - Attribuut voor een maximum datum conform het ingestelde format (bv. '31-12-2019') of 'today' voor vandaag.
 * @property {string} min-time - Attribuut voor een minimum tijd conform het ingestelde formaat (bv. '09:00').
 * @property {string} max-time - Attribuut voor een maximum tijd conform het ingestelde format (bv. '17:00').
 * @property {boolean} am-pm - Attribuut om de 12-uurs AM/PM timepicker te activeren.
 * @property {boolean} error - Attribuut om aan te geven dat de datepicker een error bevat.
 * @property {boolean} success - Attribuut om aan te geven dat de datepicker geen error bevat.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-datepicker/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-datepicker/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-datepicker.html|Demo}
 */
export class VlDatepicker extends VlElement(HTMLElement) {
    constructor() {
        super(`
            <style>
                @import "../style.css";
                @import "/node_modules/vl-ui-button/style.css";
                @import "/node_modules/vl-ui-input-field/style.css";
                @import "/node_modules/vl-ui-icon/style.css";

                #wrapper {
                    position: relative;
                }
            </style>
            <div is="vl-input-group" id="wrapper" data-vl-datepicker>
                <input id="input" is="vl-input-field" block type="text" class="js-vl-datepicker-input"/>
                <button id="button" is="vl-button-input-addon" type="button" class="js-vl-datepicker-toggle">
                    <span id="icon" is="vl-icon" icon="calendar"></span>
                </button>
            </div>
        `);
    }

    connectedCallback() {
        this.dress();
    }

    static get _observedAttributes() {
        return [
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
            'success'
        ];
    }

    /**
     * Initialiseer de datepicker config.
     */
    dress() {
        if (!this._dressed) {
            vl.datepicker.dress(this._element);
        }
    }

    get value() {
        return this._inputElement.value;
    }

    set value(value) {
        this._inputElement._flatpickr.setDate(value, false, this._format);
    }

    get _stylePath() {
        return '../style.css';
    }

    get _attributePrefix() {
        return 'data-vl-datepicker-';
    }

    get _inputElement() {
        return this._element.querySelector('#input');
    }

    get _format() {
        return this.getAttribute('format');
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

    _visual_formatChangedCallback(oldValue, newValue) {
        this._element.setAttribute(this._attributePrefix + 'visual-format', newValue);
    }

    _selected_dateChangedCallback(oldValue, newValue) {
        this._element.setAttribute(this._attributePrefix + 'selected-date', newValue);
    }

    _min_dateChangedCallback(oldValue, newValue) {
        this._element.setAttribute(this._attributePrefix + 'min-date', newValue);
    }

    _max_dateChangedCallback(oldValue, newValue) {
        this._element.setAttribute(this._attributePrefix + 'max-date', newValue);
    }

    _min_timeChangedCallback(oldValue, newValue) {
        this._element.setAttribute(this._attributePrefix + 'min-time', newValue);
    }

    _max_timeChangedCallback(oldValue, newValue) {
        this._element.setAttribute(this._attributePrefix + 'max-time', newValue);
    }

    _am_pmChangedCallback(oldValue, newValue) {
        this._element.setAttribute(this._attributePrefix + '24hr-time', (newValue == undefined));
    }

    _errorChangedCallback(oldValue, newValue) {
        if (newValue != undefined) {
            this._inputElement.setAttribute('error', '');
        } else {
            this._inputElement.removeAttribute('error');
        }
    }

    _successChangedCallback(oldValue, newValue) {
        if (newValue != undefined) {
            this._inputElement.setAttribute('success', '');
        } else {
            this._inputElement.removeAttribute('success');
        }
    }
}

define('vl-datepicker', VlDatepicker);