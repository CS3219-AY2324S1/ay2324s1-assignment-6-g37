// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import "./App.css";
import { UserProvider, useUserContext } from "./UserContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import QuestionBank from "./components/MainQuestionBank";
import ChangePasswordPage from "./components/ChangePasswordPage";
import ChangeDisplayName from "./components/ChangeDisplayName";
import ProfilePage from "./components/ProfilePage";

import Login from "./components/Login";
import Register from "./components/Register";
import { User } from "./components/types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// useContext: create a global state, that can be accessed by any component
// localStorage: persist this global state
function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { currentUser, setCurrentUser } = useUserContext();

  // Only set localStorage at Login
  useEffect(() => {
    if (!user) {
      axios
        .get("/api/auth/current-user")
        .then((response) => {
          console.log(response.data);
          const userData: User = response.data;
          setUser(userData);
          setCurrentUser(userData);
          console.log(currentUser.displayName);
          // localStorage.setItem("user", JSON.stringify(userData));
        })
        .catch((error) => {
          console.error("Error fetching current user", error);
        })
        .finally(() => {
          setIsFetching(false);
        });
    } else {
      setIsFetching(false);
    }
  }, [user, setCurrentUser]);

  return (
    <UserProvider>
      <Router>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFetching}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {user ? (
          <Routes>
            <Route path="/question-bank" element={<QuestionBank />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route
              path="/change-display-name"
              element={<ChangeDisplayName />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/login" />} />{" "}
            {/* Catch-all route */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />{" "}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        )}
      </Router>
    </UserProvider>
  );
}

export default App;
