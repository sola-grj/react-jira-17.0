import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "screens/login";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthencatedApp } from "unauthencated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthencatedApp />}
    </div>
  );
}

export default App;
