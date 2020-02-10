import '/node_modules/document-register-element/build/document-register-element.js';

export const VlElement = (SuperClass) => {
    /**
     * VlElement
     * @class
     * @classdesc De root element class voor custom HTML elementen.
     * 
     * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-core/releases/latest|Release notes}
     * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-core/issues|Issues}
     */
    class VlElement extends SuperClass {
        /**
         * VlElement constructor die een shadow DOM voorziet op basis van de HTML {Literal} parameter.
         * 
         * @param {Literal} html - HTML literal die de DOM representeert
         * @returns {void}
         */
        constructor(html) {
            super();
            if (html) {
                this.shadow(html);
            }
        }

        static get observedAttributes() {
            return this._observedAttributes.concat(this._observedClassAttributes).concat(this._observedChildClassAttributes);
        }

        /**
         * Een lijst van attributen die geobserveerd zullen worden. Bij een wijziging van de attribuut waarde zal een functie (`_attribuutChangedCallback`) functie aangeroepen worden met de oude en nieuwe waarde als parameters. Indien de attribuut `-` bevat in de naam zal dit vervangen worden door `_` bij het aanroepen van de functie (`_attribuut_naamChangedCallback`).
         * 
         * @protected
         * @returns {Array} array van attributen waar naar geluisterd moet worden
         */
        static get _observedAttributes() {
            return [];
        }

        /**
         * Een lijst van attributen die geobserveerd zullen worden. Bij een wijziging van de attribuut waarde zal een class toegevoegd worden aan het root element. De naam van de class is gebaseerd op de element prefix (`_classPrefix`) en de naam van het attribuut.
         * 
         * @protected
         * @returns {Array} array van attributen waar naar geluisterd moet worden
         */
        static get _observedClassAttributes() {
            return [];
        }

        /**
         * Een lijst van attributen die geobserveerd zullen worden. Bij een wijziging van de attribuut waarde zal een class toegevoegd worden aan het eerste shadow DOM element. De naam van de class is gebaseerd op de element prefix (`_classPrefix`) en de naam van het attribuut.
         * 
         * @protected
         * @returns {Array} array van attributen waar naar geluisterd moet worden
         */
        static get _observedChildClassAttributes() {
            return [];
        }

        attributeChangedCallback(attr, oldValue, newValue) {
            if (this.constructor._observedClassAttributes) {
                this.constructor._observedClassAttributes.filter(attribute => {
                    return attribute == attr;
                }).forEach(attribute => {
                    this.__changeAttribute(this, oldValue, newValue, attribute);
                });
            }

            if (this.constructor._observedChildClassAttributes) {
                this.constructor._observedChildClassAttributes.filter(attribute => {
                    return attribute == attr;
                }).forEach(attribute => {
                    this.__changeAttribute(this._element, oldValue, newValue, attribute);
                });
            }

            const callback = this['_' + attr.split('-').join('_') + 'ChangedCallback'];
            if (callback) {
                callback.call(this, oldValue, newValue);
            } else if ((!this.constructor._observedClassAttributes || this.constructor._observedClassAttributes.indexOf(attr) == -1) && (!this.constructor._observedChildClassAttributes || this.constructor._observedChildClassAttributes.indexOf(attr) == -1)) {
                console.info('_' + attr + 'ChangedCallback is not defined');
            }
        }

        /**
         * De class prefix bepaalt de prefix van het class attribuut dat automatisch toegevoegd wordt op basis van attributen.
         * 
         * @protected
         * @returns {void}
         */
        get _classPrefix() {
            console.error('class prefix is undefined');
        }

        /**
         * DOM element getter.
         * 
         * @protected
         * @returns {Element}
         */
        get _element() {
            if (this._shadow) {
                return this._shadow.lastElementChild;
            } else {
                return this;
            }
        }

        /**
         * Genereert een {HTMLTemplateElement} template met de HTML Literal.
         * 
         * @protected
         * @param {Literal} html - HTML literal
         * @returns {HTMLTemplateElement}
         */
        _template(html) {
            const template = document.createElement('template');
            template.innerHTML = html;
            return template.content;
        }

        /**
         * Het class attribuut op basis van de oude waarde zal vervangen worden door het class attribuut op basis van de nieuwe waarde.
         * 
         * @protected
         * @param {Element} element - HTML element
         * @param {Object} oldValue - oude waarde
         * @param {Object} newValue - nieuwe waarde
         * @param {String} classPrefix - class prefix 
         * @returns {void}
         */
        _changeClass(element, oldValue, newValue, classPrefix) {
            if (element.classList.contains((classPrefix || this._classPrefix) + oldValue)) {
                element.classList.remove((classPrefix || this._classPrefix) + oldValue);
            }

            if (newValue != undefined) {
                element.classList.add((classPrefix || this._classPrefix) + newValue);
            }
        }

        /**
         * Zal op basis van de attribuut waarde de class verwijderen of toevoegen.
         * 
         * @protected
         * @param {Element} element - HTML element
         * @param {Object} value - attribuut waarde
         * @param {String} clazz - class waarde 
         * @returns {void}
         */
        _toggleClass(element, value, clazz) {
            if (value != undefined || !!value) {
                element.classList.add(clazz);
            } else {
                element.classList.remove(clazz);
            }
        }

        /**
         * Definieer shadow DOM.
         * 
         * @protected
         * @param {Literal} html - HTML literal
         * @returns {void}
         */
        shadow(html) {
            this._shadow = this.attachShadow({ mode: 'open' });
            this._shadow.innerHTML = html;
        }

        /**
         * @private
         */
        __changeAttribute(element, oldValue, newValue, attribute, classPrefix) {
            if (oldValue != newValue) {
                if (this.getAttribute(attribute) != undefined) {
                    element.classList.add((classPrefix || this._classPrefix) + attribute);
                } else {
                    element.classList.remove((classPrefix || this._classPrefix) + attribute);
                }
            }
        }
    }

    return VlElement;
};

export const NativeVlElement = (SuperClass) => {
    /**
     * NativeVlElement
     * @class
     * @classdesc De root element class voor native HTML elementen.
     * 
     * @extends VlElement
     */
    class NativeVlElement extends VlElement(SuperClass) {
        /**
         * DOM element getter.
         * 
         * @returns {Element}
         */
        get _element() {
            return this;
        }
    }

    return NativeVlElement;
};

/**
 * Definieert een class als custom element enkel wanneer deze nog niet gedefinieerd werd.
 *
 * @param {String} name - custom HTML element naam
 * @param {Object} constructor - constructor voor de class
 * @param {Object} options - opties
 * @returns {void}
 */
export const define = (name, constructor, options) => {
    if (customElements.get(name)) {
        console.warn(`${name} werd reeds gedefinieerd als custom element`);
    } else {
        customElements.define(name, constructor, options);
    }
};

/**
 * Asynchroon een script downloaden maar synchroon in volgorde uitvoeren.
 * 
 * @param {String} id - script id
 * @param {String} src - script src path
 * @returns {void}
 */
export const awaitScript = (id, src) => {
    if (document.head.querySelector('script#' + id)) {
        console.log(`script with id '${id}' is already loaded`);
        return Promise.resolve();
    }

    let script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = false;

    const promise = new Promise((resolve, reject) => {
        script.onload = () => { resolve(); };
        script.onerror = () => { reject(); };
    });

    document.head.appendChild(script);
    return promise;
};

/**
 * Wacht tot conditie geldig is.
 * 
 * @param {Function} conditie - conditionele functie 
 */
export const awaitUntil = (condtion) => {
    return new Promise(async (resolve, reject) => {
        while(!condtion()) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        resolve();
    });
};