export const ApiMixin = (superClass) => class extends superClass {
  static get properties() {
    return {
      /**
       * The user id string pulled from firebase
       */
      uid: {
        type: String,
        observer: "_uidChange"
      }
    }
  }

  /**
   * Fetch firebase user
   */
  fetchUser() {
    console.log("Fetching user data.");
    
    let app = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        app.setUID(user.uid);
      }
    });
  }

  /**
   * Set the user id string
   * @param {string} uid 
   */
  setUID(uid) {
    this.set('uid', uid);
    return this.get('uid');
  }

  _uidChange(uid) {
    console.log("Placeholder observer");
  }

  _showPage404(elem) {
    // window.location = "/";
    console.log("404 PAGE NOT FOUND!");
  }
}