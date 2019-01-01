import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {ApiMixin} from '../mixin/api-mixin.js';
import '@polymer/paper-input/paper-input.js';
import { GlobalStyle } from '../style/global-style.js';

class QuestsCreate extends ApiMixin(PolymerElement) {
  static get properties() {
    return {
      
    }
  }

  static get template() {
    return html`
      ${GlobalStyle}

      <style>
        #content {
          background-color: var(--default-primary-color);
          border-radius: 12px;
          padding: 32px;
        }
      </style>
      <div class="container-fluid">
        <div class="row">
          <div id="content" class="col-md-offset-3 col-md-6 col-md-offset-3">
            <h3>Create a quest.</h3>
            <paper-input name="title" label="Title"></paper-input>
            <paper-input name="description" label="Description"></paper-input>
            
            <section id="tasks">
              <paper-input name="task" label="Task"></paper-input>
            </section>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('quests-create', QuestsCreate);