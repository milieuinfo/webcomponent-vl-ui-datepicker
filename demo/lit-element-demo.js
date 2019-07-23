import {
  html,
  LitElement
} from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import {define} from '/node_modules/vl-ui-core/vl-core.js';
import '../vl-datepicker.src.js';

export class LitElementDemo extends LitElement {

  constructor() {
    super();
  }

  firstUpdated() {
    customElements.whenDefined('vl-datepicker').then(() => {
      console.log('datepicker is ready to be used!');
    });
  }

  render() {
    return html`    
      <vl-datepicker
        human-format="j F Y"
        format="Y-m-d"
        min-date="2019-04-10"
        max-date="2019-06-15"
        disabled-dates='["2019-04-15","2019-04-17","2019-04-19",{"from": "2019-04-25", "to": "2019-05-06"}]'>
    </vl-datepicker>`;
  }
}

define('lit-element-demo', LitElementDemo);