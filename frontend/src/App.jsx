import React from "react";
import { AuthProvider } from "./context/auth.context";
import { RouterProvider } from "react-router-dom";
import router from "./routes/app.routes";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
