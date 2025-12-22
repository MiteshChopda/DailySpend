import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import InputsForm from "./components/InputsForm.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Profile from "./components/Profile.tsx";
import Container from "@mui/material/Container";

function AppContent() {
  const [params] = useSearchParams();
  const comp = params.get("comp");
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // when user is NOT logged in, only allow Home, Login and Register
  if (!isLoggedIn) {
    if (comp === "login") return <Login />;
    if (comp === "register") return <Register />;
    // any other comp (including dashboard/new/etc) falls back to Home
    return <Home />;
  }

  // logged-in users can access dashboard or new entry form
  if (comp === "profile") return <Profile />;
  if (comp === "dashboard") return <Dashboard />;
  // default to the new record form (for ?comp=new or empty)
  return <InputsForm />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container sx={{ mt: 2 }}>
        <Routes>
          <Route path="*" element={<AppContent />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

