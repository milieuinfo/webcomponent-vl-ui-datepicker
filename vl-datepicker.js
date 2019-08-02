import{define,VlElement}from"/node_modules/vl-ui-core/vl-core.js";import"/node_modules/flatpickr/dist/flatpickr.min.js";import"/node_modules/flatpickr/dist/l10n/nl.js";import"/node_modules/flatpickr/dist/l10n/fr.js";import"/node_modules/flatpickr/dist/l10n/de.js";import"/node_modules/vl-ui-input-group/vl-input-group.js";import"/node_modules/vl-ui-input-field/vl-input-field.js";import"/node_modules/vl-ui-button/vl-button.js";import"/node_modules/vl-ui-icon/vl-icon.js";export class VlDatepicker extends VlElement(HTMLElement){constructor(){super(`
        <style>
            @import "/node_modules/vl-ui-datepicker/style.css";    
            :host {
              position: relative;
            }      
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
        `);this.__configureCommonOptions()}static get _observedAttributes(){return["type","locale","format","human-format","default-date","min-date","max-date","disabled-dates","disable-weekends","min-time","max-time","am-pm"]}get _input(){return this._element.querySelector("#input")}connectedCallback(){this.__configureTypeSpecificOptions();this.__createFlatpickr()}__configureCommonOptions(){this._options={locale:"nl",dateFormat:"d-m-Y",time_24hr:true,wrap:true,onChange:()=>{this.__onChange()}}}__onChange(){this.value=this._picker.selectedDates.map(d=>window.flatpickr.formatDate(d,this._options.dateFormat));this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}}))}__configureTypeSpecificOptions(){const type=this.getAttribute("type");switch(type){case"time":this.__configureTimeOptions();break;case"date-time":this.__configureDateTimeOptions();break;case"multiple-dates":this.__configureMultipleDatesOptions();break;case"date-range":this.__configureDateRangeOptions();break}}__configureDateRangeOptions(){this._options.mode="range"}__configureMultipleDatesOptions(){this._options.mode="multiple"}__configureDateTimeOptions(){this._options.enableTime=true}__configureTimeOptions(){this._options.enableTime=true;this._options.noCalendar=true;this._element.querySelector("#icon").setAttribute("icon","clock")}attributeChangedCallback(attr,oldValue,newValue){super.attributeChangedCallback(attr,oldValue,newValue);this.__createFlatpickr()}_typeChangedCallback(oldValue,newValue){console.error('The "type" attribute cannot be changed.')}_localeChangedCallback(oldValue,newValue){this._options.locale=newValue?newValue:"nl"}_formatChangedCallback(oldValue,newValue){this._options.dateFormat=newValue?newValue:"d-m-Y"}_human_formatChangedCallback(oldValue,newValue){this._options.altInput=!!newValue;this._options.altFormat=newValue}_default_dateChangedCallback(oldValue,newValue){this._options.defaultDate=newValue}_min_dateChangedCallback(oldValue,newValue){this._options.minDate=newValue}_max_dateChangedCallback(oldValue,newValue){this._options.maxDate=newValue}_min_timeChangedCallback(oldValue,newValue){this._options.minTime=newValue}_max_timeChangedCallback(oldValue,newValue){this._options.maxTime=newValue}_am_pmChangedCallback(oldValue,newValue){this._options.time_24hr=!this.hasAttribute("am-pm")}_disabled_datesChangedCallback(oldValue,newValue){this.__disableDates()}_disable_weekendsChangedCallback(oldValue,newValue){this.__disableDates()}__disableDates(){const disabledDates=this.getAttribute("disabled-dates");this._options.disable=disabledDates?JSON.parse(disabledDates):[];if(this.hasAttribute("disable-weekends")){this._options.disable.push(function(date){return date.getDay()===0||date.getDay()===6})}}__createFlatpickr(){this._options.appendTo=this._element;this._options.onOpen=((selectedDates,dateStr,instance)=>{requestAnimationFrame(()=>{this.__moveCalendarToInput(instance)})});this._picker=window.flatpickr(this._element,this._options)}__moveCalendarToInput(instance){const calendar=instance.calendarContainer;const input=instance.input;calendar.style.top=this.__calculateTop(calendar,input);calendar.style.left="auto";calendar.style.right="auto"}__calculateTop(calendar,input){if(calendar.classList.contains("arrowTop")){const inputStyle=window.getComputedStyle(input);return`calc(${inputStyle.height} + 5px)`}if(calendar.classList.contains("arrowBottom")){const calendarStyle=window.getComputedStyle(calendar);return`calc(-${calendarStyle.height} - 5px)`}return"auto"}};define("vl-datepicker",VlDatepicker);