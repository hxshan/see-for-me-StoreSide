import { useState } from "react";
import "./App.css";
import Login from "./pages/shared/Login";
import { UserProvider } from "./context/useAuth";

function App() {
  return (
    <>
      <UserProvider>
        <div className="w-full h-screen">
          <Login />
        </div>
      </UserProvider>
    </>
  );
}

export default App;
