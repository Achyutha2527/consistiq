import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import {requestNotificationPermission, onForegroundMessage} from "./firebase.ts";

// 🔔 Ask permission
requestNotificationPermission().then((token) => {
  if (token) {
    console.log("✅ Token:", token);
  }
});

// 📩 Listen messages
onForegroundMessage((payload: any) => {
  console.log("📩 Message:", payload);
});

// ✅ Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then(() => console.log("✅ SW registered"))
      .catch((err) => console.log("❌ SW error:", err));
  });
}

// 🚀 Render app
createRoot(document.getElementById("root")!).render(<App />);