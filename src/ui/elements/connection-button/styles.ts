import { css } from "lit";

export const styles = css`
  .connection-button {
    position: relative;
    border-radius: 50%;
  }

  .connection-button--disconnected.connection-button:before {
    background: var(--connection-button-outer-cicle-gradient--disconnected);
  }
  *:is(
      .connection-button--connecting,
      .connection-button--disconnecting
    ).connection-button:before {
    background: var(--connection-button-outer-cicle-gradient--connecting);
  }
  .connection-button--connected.connection-button:before {
    background: var(--connection-button-outer-cicle-gradient--connected);
  }

  .connection-button--disconnected .connection-button__icon {
    color: var(--connection-button-icon-color--disconnected);
  }
  *:is(.connection-button--connecting, .connection-button--disconnecting)
    .connection-button__icon {
    color: var(--connection-button-icon-color--connecting);
  }
  .connection-button--connected .connection-button__icon {
    color: var(--connection-button-icon-color--connected);
  }

  .connection-button--disconnected .connection-button__button {
    background-color: var(--connection-button-bg--disconnected);
  }
  *:is(.connection-button--connecting, .connection-button--disconnecting)
    .connection-button__button {
    background-color: var(--connection-button-bg--connecting);
  }
  .connection-button--connected .connection-button__button {
    background-color: var(--connection-button-bg--connected);
  }

  .connection-button:before {
    content: "";
    width: 125vh;
    height: 125vh;
    border-radius: 50%;
    z-index: -20;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .connection-button:after {
    content: "";
    width: 14.5rem;
    height: 14.5rem;
    border-radius: 50%;
    z-index: -10;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--connection-button-inner-cicle);
  }

  .connection-button__button {
    width: 100%;
    height: 100%;
    padding: 0rem;
    outline: none;
    border: none;
    border-radius: 50%;
    box-shadow: var(--connection-button-shadow);
    transition: all 0.5s ease;
  }

  .connection-button__icon {
    font-size: 2rem;
    transition: all 0.5s ease;
  }
`;
