
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  if (import.meta.env.MODE === "colorexperiment") {
    import("./styles/theme-experiment.css");
  }

  createRoot(document.getElementById("root")!).render(<App />);
  