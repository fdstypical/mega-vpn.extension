import { LitElement, html } from "lit";
import { styles } from "./styles";
import { ConnectionClient, ConnectionStatus } from "@models/connection";

const statues = [
  ConnectionStatus.Disconnected,
  ConnectionStatus.Connecting,
  ConnectionStatus.Connected,
  ConnectionStatus.Disconnecting,
];

export const PROJECT_NAME = "MEGA VPN";

export class MainPage extends LitElement {
  public static styles = [styles];

  private declare client: ConnectionClient;

  constructor() {
    super();
    this.client = new ConnectionClient().init(() => {
      this.requestUpdate();
      return true;
    });
  }

  private handleClick(_: CustomEvent) {
    this.client.toggle();
  }

  protected render(): unknown {
    return html`
      <main class="main-page">
        <div class="header">
          <svg-icon name="logo"></svg-icon>

          <div class="project-name">
            <h1>${PROJECT_NAME}</h1>
          </div>
        </div>

        <connection-button
          status=${this.client.status}
          @change-connection-status="${this.handleClick}"
        ></connection-button>

        <div class="footer">
          <connection-status status="${this.client.status}"></connection-status>
        </div>
      </main>
    `;
  }
}

customElements.define("main-page", MainPage);
