import { createRoot } from "react-dom/client";
import App from "./app";

const rootElement = document.getElementById("root");

if (!rootElement) {
    console.error("Error: Root element not found!");
    throw new Error("Root element with id 'root' not found in the DOM");
}

const root = createRoot(rootElement);

root.render(
    <App />
)
