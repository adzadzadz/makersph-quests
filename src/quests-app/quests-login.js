import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@adzadzadz/global-variable/global-variable.js';
import {ApiMixin} from '../mixins/api-mixin.js';
import '@polymer/paper-button/paper-button.js';

class QuestsLogin extends ApiMixin(PolymerElement) {
  static get template() {
    return html`
      <global-variable key="firebase" value={{firebase}}></global-variable>
      <style>
        .container {
          width: 100%;
          height: 100vh;
        }
        #login {
          max-width: 300px;
          max-height: 500px;
          top: 20%;
          position: relative;
          display: block;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          padding: 25px 50px 45px;
          border: 2px solid #fff;
        }
        paper-button {
          max-width: 220px;
          padding: 32px;
          display: block;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }
        .google {
          background-color: var(--accent-color);
          color: var(--light-text-color);
          font-weight: bold;
        }
        .title {
          color: var(--light-text-color);
        }
      </style>
      
      <div class="container">
        <section id="login">
          <div class="title">
            <h1>Welcome to Quests</h1>
          </div>
          <paper-button id="googleIn" on-tap="__signInGoogle" class="google" hidden>LOGIN WITH GOOGLE</paper-button>
        </section>
      </div>
    `;
  }

  ready() {
    super.ready();

    let googleIn = this.$.googleIn;

    this.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        googleIn.hidden = true;
      } else {
        googleIn.hidden = false;
      }
    });
  }

  __signInGoogle() {
    var provider = new this.firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/admin.directory.customer');
    
    let app = this;

    this.firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // If user exists, do nothing
      // else, create user document
      app.__checkUserExists();
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  __checkUserExists() {    
    let app = this;
    var user = this.firebase.auth().currentUser;
    var docRef = this.firestore.collection("users").doc(user.uid);

    docRef.get().then(function(doc) {
      if (!doc.exists) {
        app.__createUserData(docRef, user);
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  __createUserData(docRef, user) {
    // Add a new document in collection "cities"
    docRef.set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

}

window.customElements.define('quests-login', QuestsLogin);