import{VlElement,awaitScript,awaitUntil,define}from"/node_modules/vl-ui-core/vl-core.js";import"/node_modules/vl-ui-button/vl-button.js";import"/node_modules/vl-ui-input-group/vl-input-group.js";import"/node_modules/vl-ui-input-field/vl-input-field.js";import"/node_modules/vl-ui-icon/vl-icon.js";Promise.all([awaitScript("util","/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js"),awaitScript("core","/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js"),awaitScript("datepicker","/node_modules/vl-ui-datepicker/dist/datepicker.js"),awaitUntil(()=>window.vl&&window.vl.datepicker)]).then(()=>define("vl-datepicker",VlDatepicker));export class VlDatepicker extends VlElement(HTMLElement){constructor(){super(`
            <style>
                @import "/node_modules/vl-ui-datepicker/style.css";
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
        `)}connectedCallback(){this.dress()}static get _observedAttributes(){return["type","format","visual-format","selected-date","min-date","max-date","min-time","max-time","am-pm"]}get _stylePath(){return"/node_modules/vl-ui-datepicker/style.css"}get _attributePrefix(){return"data-vl-datepicker-"}dress(){if(!this._dressed){vl.datepicker.dress(this._element)}}_typeChangedCallback(oldValue,newValue){if(oldValue){console.error('The "type" attribute cannot be changed.')}else{switch(newValue){case"time":this._element.setAttribute(this._attributePrefix+"enable-time","true");this._element.setAttribute(this._attributePrefix+"disable-date","true");break;case"date-time":this._element.setAttribute(this._attributePrefix+"enable-time","true");break;default:this._element.setAttribute(this._attributePrefix+newValue,"");break}}}_formatChangedCallback(oldValue,newValue){this._element.setAttribute(this._attributePrefix+"format",newValue)}_visual_formatChangedCallback(oldValue,newValue){this._element.setAttribute(this._attributePrefix+"visual-format",newValue)}_selected_dateChangedCallback(oldValue,newValue){this._element.setAttribute(this._attributePrefix+"selected-date",newValue)}_min_dateChangedCallback(oldValue,newValue){this._element.setAttribute(this._attributePrefix+"min-date",newValue)}_max_dateChangedCallback(oldValue,newValue){this._element.setAttribute(this._attributePrefix+"max-date",newValue)}_min_timeChangedCallback(oldValue,newValue){this._element.setAttribute(this._attributePrefix+"min-time",newValue)}_max_timeChangedCallback(oldValue,newValue){this._element.setAttribute(this._attributePrefix+"max-time",newValue)}_am_pmChangedCallback(oldValue,newValue){this._element.setAttribute(this._attributePrefix+"24hr-time",newValue==undefined)}};