import {html} from '@polymer/polymer/polymer-element.js';
import { BootstrapGrid } from "./bootstrap-grid";

export const GlobalStyle = html`
  ${BootstrapGrid}
  <style>
    /* Paper Card */
    paper-card {
      padding: 0px !important;
      height: 300px;
      display: block; 
      --paper-card-background-color: var(--light-background-color);
      --paper-card-header: {
        background-color: var(--dark-primary-background-color);
        text-align: center;
      };
      --paper-card-header-text: {
        color: var(--light-text-color);
      };
      margin: 5px;
    }

    /* Paper Expand */
    paper-expand {
      background-color: #fff;
      height: 200px;
    }
  </style>
`;