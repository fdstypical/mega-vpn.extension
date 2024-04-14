import { LitElement, html } from "lit";
import { styles } from "./styles";
import { Optional } from "@app.types/common";
import { classMap } from "lit/directives/class-map.js";
import { ConnectionStatus as Status } from "@models/connection";

const CONNECTION_STATUS_TEXTS = {
  [Status.Disconnected]: "Disconnected",
  [Status.Disconnecting]: "Disconnecting...",
  [Status.Connecting]: "Connection...",
  [Status.Connected]: "Connected",
};

export class ConnectionStatus extends LitElement {
  public static styles = [styles];

  private declare readonly _status: Optional<number>;

  public static get properties() {
    return { _status: { type: Number, attribute: "status" } };
  }

  public get status(): Status {
    return (
      Status[Status[this._status!] as keyof typeof Status] ??
      Status.Disconnected
    );
  }

  protected get classes() {
    const modifier = Status[this.status].toLowerCase();

    return classMap({
      "connection-status": true,
      [`connection-status--${modifier}`]: true,
    });
  }

  protected render(): unknown {
    return html`
      <div class=${this.classes}>
        <span class="connection-status__text">
          ${CONNECTION_STATUS_TEXTS[this.status]}
        </span>
      </div>
    `;
  }
}

customElements.define("connection-status", ConnectionStatus);
