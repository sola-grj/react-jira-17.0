import React from "react";
import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";

export const UnauthencatedApp = () => {
  const [isRegister, setRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};
