import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import "@adzadzadz/global-variable/global-variable.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

class FirebaseHelper extends PolymerElement {
  static get properties() {
    return {
      firebase: {
        type: Object,
        value: {},
        notify: true
      },

      firestore: {
        type: Object,
        value: {},
        notify: true
      },

      auth: {
        type: Object,
        value: {},
        notify: true
      }
    }
  }

  static get template() {
    return html`
      <global-variable 
        key="firebase" 
        value="{{firebase}}">
      </global-variable>
      <global-variable 
        key="firestore" 
        value="{{firestore}}">
      </global-variable>
      <global-variable 
        key="auth" 
        value="{{auth}}">
      </global-variable>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC3nR-yo64orQl8cV75RBA-y-npXqa7MgI",
      authDomain: "quest-84a95.firebaseapp.com",
      projectId: "quest-84a95",
      storageBucket: "quest-84a95.appspot.com",
      messagingSenderId: "530938614584"
    };
    firebase.initializeApp(config);

    // Initialize Cloud Firestore through Firebase
    var firestore = firebase.firestore();

    // Disable deprecated features
    firestore.settings({
      timestampsInSnapshots: true
    });

    this.set("firebase", firebase);
    this.set("firestore", firestore);    
    this.set("auth", firebase.auth());
  }
}

customElements.define('firebase-helper', FirebaseHelper);