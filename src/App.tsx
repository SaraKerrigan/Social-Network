import "@radix-ui/themes/styles.css";
import Home from "./pages/Home.tsx";
import { Route, Routes } from "react-router";
import Profile from "./pages/Profile.tsx";
import Header from "./components/Header.tsx";
import { Container, Theme } from "@radix-ui/themes";
import Favorites from "./pages/Favorites.tsx";
import { useAppSelector } from "./redux/store";
import Login from "./pages/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Theme
      accentColor="blue"
      grayColor="gray"
      radius="small"
      appearance={theme}
    >
      <Container size="3">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Theme>
  );
}

export default App;
