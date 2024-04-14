import { css } from "lit";

export const styles = css`
  .connection-status {
    display: inline-block;
  }

  .connection-status--disconnected .connection-status__text {
    color: var(--pale-cyan);
  }

  .connection-status--connecting .connection-status__text {
    color: var(--orange);
  }

  .connection-status--disconnecting .connection-status__text {
    color: var(--orange);
  }

  .connection-status--connected .connection-status__text {
    color: var(--green);
  }

  .connection-status__text {
    font-size: 1.375rem;
    line-height: 1.27;
    font-weight: 700;
    transition: color 0.6s ease;
  }
`;
