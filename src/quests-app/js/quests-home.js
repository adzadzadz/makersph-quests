import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {ApiMixin} from '../mixin/api-mixin.js';
import './quests-create.js';

class QuestsHome extends ApiMixin(PolymerElement) {
  static get properties() {
    return {
      
    }
  }

  static get template() {
    return html`
      <quests-create></quests-create>
    `;
  }

  
}

customElements.define('quests-home', QuestsHome);