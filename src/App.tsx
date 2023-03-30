import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { LoginScreen } from "screens/login";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthencatedApp } from "unauthencated-app";
import { ErrorBoundary } from "component/error-boundary";
import { FullPageErrorFallback } from "component/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthencatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
