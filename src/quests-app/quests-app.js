import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@adzadzadz/global-variable/global-variable.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/app-layout/app-layout.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/iron-pages/iron-pages.js';
import '../components/firebase-helper.js';
import {ApiMixin} from '../mixins/api-mixin.js';
import {GlobalStyle} from '../styles/global-style.js';

class QuestsApp extends ApiMixin(PolymerElement) {
  static get template() {
    return html`
    <firebase-helper></firebase-helper>

    ${GlobalStyle}
    <style>
      #content {
        padding-top: 30px;
      }
      app-header-layout {
        color: var(--light-text-color);
      }
      app-toolbar {
        background-color: var(--dark-primary-color);
        color: var(--light-text-color);
      }
      .control {
        height: 60px;
      }
      paper-icon-item {
        --paper-item-icon-width: 32px;
      }
      quests-login {
        margin-left: auto;
        margin-right: auto;
      }
      #iconInsert {
        background-color: var(--accent-color);
        color: var(--light-text-color);
        cursor: pointer;
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 40px;
        padding: 3px;
        position: absolute;
        right: 50px;
        bottom: -40px;
      }
    </style>
    
    <global-variable key="auth" value="{{auth}}"></global-variable>
    <app-location id="appLocation" route="{{route}}" query-params="{{queryParams}}"></app-location>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute1}}"></app-route>
    <app-route route="{{subroute1}}" pattern="/:action" data="{{routeData2}}" tail="{{subroute2}}"></app-route>

    <div class="container-fluid">
      <iron-pages selected={{selected}} attr-for-selected="id">
        <quests-login id="login"></quests-login>

        <section id="main">
          <app-header-layout fullbleed>
            <app-header slot="header" fixed condenses>
              <app-toolbar>
                <paper-icon-button icon="menu" on-tap="__toggleDrawer"></paper-icon-button>
                <div main-title>Quests</div>
              </app-toolbar>
            </app-header>
            <!-- <paper-icon-button icon="add" id="iconInsert"></paper-icon-button> -->
          </app-header-layout>
          <div class="control"></div>

          <app-drawer id="drawer" on-tap="__toggleDrawer" style="z-index: 99;">
            <div style="height: 100%; overflow: auto;">
              <app-toolbar>
                <div main-title>Quests</div>
              </app-toolbar>
              <nav>
                <a href="/" target="self">
                  <paper-icon-item>
                    <iron-icon icon="icons:home" slot="item-icon"></iron-icon>
                    Home
                  </paper-icon-item>
                </a>
                <a href="/u" target="self">
                  <paper-icon-item>
                    <iron-icon icon="icons:face" slot="item-icon"></iron-icon>
                    Account
                  </paper-icon-item>
                </a>
                <a href="/q" target="self">
                  <paper-icon-item>
                    <iron-icon icon="icons:done-all" slot="item-icon"></iron-icon>
                    Quest
                  </paper-icon-item>
                </a>
                <a href="/" target="self">
                  <paper-icon-item on-tap="__signOutGoogle">
                    <iron-icon icon="icons:subdirectory-arrow-left" slot="item-icon"></iron-icon>
                    Logout
                  </paper-icon-item>
                </a>
              </nav>
            </div>
          </app-drawer>

          <section id="content">
            <iron-pages selected=[[content]] attr-for-selected="id">
              <section id="home">
                <h1 style="color: var(--light-text-color); text-align: center;">FOR TRAVELLERS AND BORED INDIVIDUALS</h1>
              </section>
              <account-home id="u"></account-home>
              <quests-home id="q"></quests-home>
            </iron-pages>
          </section>
        </section>
      </iron-pages>
    </div>

    `;
  }
  static get properties() {
    return {
      selected: {
        type: String,
      },

      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },

      content: {
        type: String,
        value: "home"
      }
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
    this.page = page;
  }

  _pageChanged(page) {
    if (page == "" || page == undefined || page == "/") {
      this.content = 'home';
      return;
    }
    import(this._fileControl(page)).then(null, this._showPage404.bind(this));
    this.content = page;
  }

  _fileControl(page) {
    var src;
    switch (page) {
      case 'u':
        src = './account-home.js';
        break;
      case 'q':
        src = './quests-home.js';
        break;
      default:
        break;
    }
    return src;
  }

  connectedCallback() {
    super.connectedCallback();
    let app = this;
    this.auth.onAuthStateChanged(function(user) {
      if (!user) {
        import('./quests-login.js').then(null, app._showPage404.bind(this));
        app.set('selected', 'login');
      } else {
        app.set('selected', 'main');
      }
    });
    
  }

  __signOutGoogle() {
    let app = this;
    this.auth.signOut().then(function() {
      app.set("selected", 'login');
    }).catch(function(error) {
      console.log("There has been an issue signing out.");
    });
  }

  __toggleDrawer() {
    this.$.drawer.opened = !this.$.drawer.opened;
  }
}

window.customElements.define('quests-app', QuestsApp);
