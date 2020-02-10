import { VlElement, define } from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-button/vl-button.js';
import '/node_modules/vl-ui-input-field/vl-input-field.js';
import '../src/vl-modal.src.js';

export class VlModalTest extends VlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
          @import '/node_modules/vl-ui-button/style.css';
          @import '/node_modules/vl-ui-input-field/style.css';
      </style>

      <vl-modal data-title="Modal" closable not-cancellable>
        <button is="vl-button" slot="button">aanvraag starten</button>
        <input id="input-safari" is="vl-input-field" slot="content" block></input>
      </vl-modal>
    `);
  }

  open() {
    this._element.open();
  }
}

export class VlModalContainerTest extends VlElement(HTMLElement) {
  constructor() {
    super(`
      <vl-modal-test></vl-modal-test>
    `);
  }

  open() {
    this._element.open();
  }
}

customElements.whenDefined('vl-input-field').then(() => {
  define('vl-modal-test', VlModalTest);
  define('vl-modal-container-test', VlModalContainerTest);
});
