import { awaitScript, awaitUntil } from '/node_modules/vl-ui-core/vl-core.js';

awaitScript('util', '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js');
awaitScript('core', '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js');
awaitScript('form-validation', '/node_modules/@govflanders/vl-ui-form-validation/dist/js/form-validation.js');

/**
 * VlFormValidation
 * @class
 * @classdesc De formulier validatie verzekert dat bij het invullen van het formulier de input van de gebruiker geldig is.
 * 
 * @property {string} data-required - Attribuut wordt gebruikt om aan te duiden dat het veld verplicht is.
 * @property {string} data-vl-error-message - Attribuut wordt gebruikt om de tekst die verschijnt in de vl-form-validation component te bepalen.
 * @property {string} data-vl-error-placeholder - Attribuut wordt gebruikt om de koppeling met de bijhorende vl-form-validation component te maken met id attribuut `data-vl-error-id`.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-validation/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-validation/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-form-validation.html|Demo}
 */
export const VlFormValidation = (SuperClass) => {
    return class extends SuperClass {
        /**
         * Wacht tot de form validatie initialisatie klaar is.
         * 
         * @returns {Promise}
         */
        static awaitUntilReady() {
            return awaitUntil(() => window.vl && window.vl.formValidation);
        }
    
        /**
         * Initialiseer de form validatie.
         * 
         * @param {HTMLElement} element
         */
        dress(element) {
            if (element.getAttribute('novalidate') == undefined) {
                vl.formValidation.dress(element);
            }
        }
    };
};