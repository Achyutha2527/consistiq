import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { requestPermission } from "./firebase";

function Home() {
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home Page ✅</h1>
      <p>Notifications enabled (check permission popup)</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard ✅</h1>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 ❌ Page Not Found</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
