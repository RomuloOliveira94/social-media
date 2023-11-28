//router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import { Home } from "./pages/home/home";
import { NotFound } from "./pages/not-found";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";

//components
import { NavBar } from "./components/nav/navbar";
import { Footer } from "./components/footer/footer";

//user
import { useAuth } from "./hooks/useAuth";
import { EditProfile } from "./pages/edit-profile/edit-profile";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className="container mx-auto w-full min-h-screen">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route path="register" element={!auth ? <Register /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
