import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {ApiMixin} from '../mixins/api-mixin.js';
import '@polymer/paper-card/paper-card.js';
import '@adzadzadz/paper-expand/paper-expand.js';
import '@adzadzadz/global-variable/global-variable.js';
import '@polymer/paper-input/paper-input.js';
import { GlobalStyle } from '../styles/global-style.js';

class AccountHome extends ApiMixin(PolymerElement) {

  static get template() {
    return html`
      <global-variable key="firebase" value={{firebase}}></global-variable>
      <global-variable key="firestore" value={{firestore}}></global-variable>

      ${GlobalStyle}
      
      <style>
        paper-expand {
          --paper-expand-title-bg: var(--default-primary-color);
          --paper-expand-bg: var(--default-primary-color);
        }
      </style>

      <div class="row">
        <div class="col-md-offset-3 col-md-6" style="margin-bottom: 10px;">
          <paper-expand>
            <section slot="title">
              <span>Profile</span>
            </section>
            <section class="content">
              <h3>{{user.uid}}</h3>
              <img src="{{user.photoURL}}" style="width: 80px; height: 80px;">
              <paper-input name="name" value="{{user.email}}" label="Email" on-blur="_updateUData"></paper-input>
              <paper-input name="name" value="{{user.name}}" label="Name" on-blur="_updateUData"></paper-input>
            </section>
          </paper-expand>
        </div>
        <div class="col-md-offset-3 col-md-6">
          <paper-expand>
            <section slot="title">
              <span>Account Settings</span>
            </section>
            <section class="content">
              <h2>Under development.</h2>
            </section>
          </paper-expand>
        </div>
      </div>
      
    `;
  }

  static get properties() {
    return {
      user: {
        type: Object,
        value: {}
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Fetch firebase user
    this.fetchUser(this.firebase);
  }

  _updateUData(e) {
    let elem = e.target || e.srcElement;
    let data = {};
    let key = elem.name;
    data[key] = elem.value;

    this.firestore.collection("users").doc(this.uid)
      .update(data);
  }

  _uidChange(uid) {
    let app = this;
    this.firestore.collection("users").doc(uid)
      .onSnapshot(function(doc) {
        app.set('user', doc.data());
        // console.log('User: ', app.user);
      });
  }
}

customElements.define('account-home', AccountHome);