import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

function App() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("guest") === "true";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("guest");

    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          TaskPlanet Social
        </Link>

        <div>
          {token || isGuest ? (
            <button onClick={logout} className="logout-btn">
              {isGuest ? "Exit Guest" : "Logout"}
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={token || isGuest ? <Feed /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={token || isGuest ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/signup"
          element={token || isGuest ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </>
  );
}

export default App;