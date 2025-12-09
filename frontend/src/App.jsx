
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import InputsForm from './components/InputsForm'
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar'
import Container from '@mui/material/Container';


function NotFound() {
  return (
    <>
      <h1>Page not found!</h1>
    </>
  )
}
function AppContent() {
  const [params] = useSearchParams();
  const comp = params.get("comp");

  switch (comp) {
    case "dashboard":
      return <Dashboard />;
    case "new":
      return <InputsForm />
    default:
      return <InputsForm />
  }
}

function App() {
  return (
    <>
      <Navbar />
      <Container
        sx={{ display: "block", margin: "0 auto", width: "100%" }}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<AppContent />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>

  );
}

export default App