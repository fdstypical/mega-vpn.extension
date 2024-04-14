import "./ui";
import "../styles/styles.css";

function main(root: string) {
  const app = document.querySelector<HTMLDivElement>(`${root}`);
  if (!app) throw new Error("Invalid root");
  app.innerHTML = `<main-page />`;
}

main("#app");
