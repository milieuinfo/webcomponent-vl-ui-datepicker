import { VlElement, awaitScript, awaitUntil, define } from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-button/vl-button.js';
import '/node_modules/vl-ui-input-group/vl-input-group.js';
import '/node_modules/vl-ui-input-field/vl-input-field.js';
import '/node_modules/vl-ui-icon/vl-icon.js';

import "/node_modules/flatpickr/dist/flatpickr.js";
import "/node_modules/flatpickr/dist/l10n/nl.js";
import "/node_modules/flatpickr/dist/l10n/fr.js";
import "/node_modules/flatpickr/dist/l10n/de.js";

Promise.all([
    awaitScript('util', '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js'),
    awaitScript('core', '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js'),
    awaitScript('datepicker', '/node_modules/@govflanders/vl-ui-datepicker/dist/js/datepicker.min.js'),
    awaitUntil(() => window.vl && window.vl.datepicker)
]).then(() => define('vl-datepicker', VlDatepicker));

/**
 * vl-datepicker
 *
 * ### Custom attributen
 * Attribuut | Type | Toelichting | Default en mogelijke waarden
 * ----------|------|-------------|-----------------------------
 * type | {string} | bepaalt het soort picker | 'range', 'time' en 'date-time'
 * format | {string} | bepaalt het formaat van de datum/tijd waarde | default 'd.m.Y' (-> 31.12.2019)
 * visual-format | {string} | bepaalt het visueel formaat van de datum/tijd waarde
 * selected-date | {string} | een vooringestelde datum | conform het ingestelde format (bv. '03-10-2019') of 'today' voor vandaag
 * min-date | {string} | een minimum datum | conform het ingestelde format (bv. '01-01-2019') of 'today' voor vandaag
 * max-date | {string} | een maximum datum | conform het ingestelde format (bv. '31-12-2019') of 'today' voor vandaag
 * min-time | {string} | conform het ingestelde format (bv. 09:00)
 * max-time | {string} | conform het ingestelde format (bv. 17:00)
 * am-pm | {boolean} | optie om de 12-uurs AM/PM timepicker te gebruiken ipv de (standaard) 24-uurs timepicker | [geen waarde]
 *
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
            </style>
            <vl-input-group id="wrapper" data-vl-datepicker>
                <input id="input" is="vl-input-field" block type="text" class="js-vl-datepicker-input"/>
                <button id="button" is="vl-button-input-addon" type="button" class="js-vl-datepicker-toggle">
                    <span is="vl-icon" icon="calendar"></span>
                </button>
            </vl-input-group>
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
            'am-pm'
        ];
    }

    get _stylePath() {
        return '../style.css';
    }

    get _attributePrefix() {
        return 'data-vl-datepicker-';
    }

    /**
     * Initialiseer de modal config.
     */
    dress() {
        if (!this._dressed) {
            vl.datepicker.dress(this._element);
        }
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
}