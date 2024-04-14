import { LitElement, html } from "lit";

import { icons } from "../svgs";
import { classMap } from "lit/directives/class-map.js";
import { styles } from "./styles";

export type IconName = keyof typeof icons;

export class SvgIcon extends LitElement {
  public static styles = [styles];

  protected declare readonly name: IconName;
  protected declare readonly stroked?: boolean;

  public static get properties() {
    return {
      name: { type: String },
      stroked: { type: Boolean },
    };
  }

  protected render(): unknown {
    return html`
      <div
        class=${classMap({
          "svg-icon": true,
          "svg-icon--stroked": !!this.stroked,
        })}
      >
        ${icons[this.name]}
      </span>
    `;
  }
}

customElements.define("svg-icon", SvgIcon);
