import { Link,useNavigate } from "react-router-dom";
import "./auth.css";

import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../../slices/authSlice.js";
import { Message } from "../../components/message.jsx";

export const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    dispatch(loginUser(login));
    e.preventDefault();
    if (success) {
      navigate("/");
    }
  };

  //clear states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 w-11/12 md:w-1/2 mx-auto mt-10 border border-gray-100 shadow-md gap-4">
      <h2 className="text-3xl">RominGram</h2>
      <p>Cadastre-se nessa joça</p>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center gap-5 w-full"
      >
        <input
          className="p-2 w-5/6"
          type="email"
          placeholder="E-mail"
          onChange={(e) =>
            setLogin((prev) => ({ ...prev, email: e.target.value }))
          }
          value={login.email || ""}
        />
        <input
          className="p-2 w-5/6"
          type="password"
          placeholder="Senha"
          onChange={(e) =>
            setLogin((prev) => ({ ...prev, password: e.target.value }))
          }
          value={login.password || ""}
        />

        {error && <Message msg={error} type="error" />}
        {success && (
          <Message type="success" msg={success && "Logado com sucesso!"} />
        )}
        {!loading && (
          <button
            className="p-2 bg-gray-800 text-white border-spacing-1"
            type="submit"
          >
            Logar
          </button>
        )}
        {loading && (
          <button
            className="p-2 bg-gray-800 text-white border-spacing-1"
            type="submit"
            disabled
          >
            Logando...
          </button>
        )}
      </form>
      <p>
        Não tem conta? <Link to="/register">Cadastra!</Link>
      </p>
    </div>
  );
};
