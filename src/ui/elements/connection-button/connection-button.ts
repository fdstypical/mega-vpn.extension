import { LitElement, PropertyValueMap, html } from "lit";
import { styles } from "./styles";
import { Optional } from "@app.types/common";
import { classMap } from "lit/directives/class-map.js";
import { ConnectionStatus } from "@models/connection";
import { Colors } from "../circle-progress/colors.enum";
import { AnimationStatus, ConnectionAnimation } from "./animation";

export const PROGRESS_COLOR_MAP = {
  [ConnectionStatus.Disconnected]: Colors.Gray,
  [ConnectionStatus.Disconnecting]: Colors.Orange,
  [ConnectionStatus.Connecting]: Colors.Orange,
  [ConnectionStatus.Connected]: Colors.Green,
};

const TWO_SPIN_MOD = 200;
const ENDS_MAX_PROGRESS =
  TWO_SPIN_MOD -
  (ConnectionAnimation.DEFAULT_SPEED + ConnectionAnimation.ENDS_SPEED);

export class ConnectionButton extends LitElement {
  public static styles = [styles];

  private declare animation: ConnectionAnimation;
  private declare readonly _status: Optional<number>;

  public static get properties() {
    return { _status: { type: Number, attribute: "status" } };
  }

  constructor() {
    super();
    this.animation = new ConnectionAnimation().init(() => {
      this.requestUpdate();
      return true;
    });
  }

  public get status(): ConnectionStatus {
    return (
      ConnectionStatus[
        ConnectionStatus[this._status!] as keyof typeof ConnectionStatus
      ] ?? ConnectionStatus.Disconnected
    );
  }

  public get disabled(): boolean {
    return (
      [ConnectionStatus.Connecting, ConnectionStatus.Disconnecting].includes(
        this.status
      ) || this.animation.status != AnimationStatus.Stopped
    );
  }

  protected get classes() {
    const modifier = ConnectionStatus[this.status].toLowerCase();

    return classMap({
      "connection-button": true,
      [`connection-button--${modifier}`]: true,
    });
  }

  protected willUpdate(changed: PropertyValueMap<any>): void {
    const old: ConnectionStatus = changed.get("_status");

    if (this.isAnimationRunable(old)) this.animation.run();
    if (this.isAnimationEndable(old)) this.animation.end();
    if (this.isAnimationStoppable()) this.animation.stop();
  }

  protected isAnimationRunable(old: ConnectionStatus): boolean {
    return (
      (old == ConnectionStatus.Disconnected &&
        this.status == ConnectionStatus.Connecting) ||
      (old == ConnectionStatus.Connected &&
        this.status == ConnectionStatus.Disconnecting)
    );
  }

  protected isAnimationEndable(old: ConnectionStatus): boolean {
    return (
      (old == ConnectionStatus.Connecting &&
        this.status == ConnectionStatus.Connected) ||
      (old == ConnectionStatus.Disconnecting &&
        this.status == ConnectionStatus.Disconnected)
    );
  }

  protected isAnimationStoppable(): boolean {
    return (
      [ConnectionStatus.Connected, ConnectionStatus.Disconnected].includes(
        this.status
      ) && this.animation.progress % TWO_SPIN_MOD >= ENDS_MAX_PROGRESS
    );
  }

  private handleClick() {
    this.dispatchEvent(new CustomEvent("change-connection-status"));
  }

  protected render(): unknown {
    return html`<div class=${this.classes}>
      <circle-progress
        size="200"
        progress=${this.animation.progress}
        color=${PROGRESS_COLOR_MAP[this.status]}
      >
        <button
          class="connection-button__button"
          ?disabled=${this.disabled}
          @click="${this.handleClick}"
        >
          <svg-icon
            class="connection-button__icon"
            name="power-on"
          ></svg-icon></button
      ></circle-progress>
    </div>`;
  }
}

customElements.define("connection-button", ConnectionButton);
