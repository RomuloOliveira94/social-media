import "./auth.css";

import { Link } from "react-router-dom";
import { Message } from "../../components/message.jsx";

import { useEffect, useState} from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../../slices/authSlice.js";

export const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const addData = () => {
  //   setRegister({
  //     name: "Romin",
  //     email: `test${Math.random()}@gmail.com`,
  //     password: "123456",
  //     confirmPassword: "123456",
  //   });
  // };

  const dispatch = useDispatch();

  const { loading, error} = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(register));
  };
  
  useEffect(() => { 
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 w-11/12 md:w-1/2 mx-auto mt-10 border border-gray-100 shadow-md gap-4">
      <h2 className="text-3xl">RominGram</h2>
      <p>Cadastre-se nessa joça</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5 w-full"
      >
        <input
          className="p-2 w-5/6"
          type="text"
          placeholder="Nome"
          onChange={(e) =>
            setRegister((prev) => ({ ...prev, name: e.target.value }))
          }
          value={register.name || ""}
        />
        <input
          className="p-2 w-5/6"
          type="email"
          placeholder="E-mail"
          onChange={(e) =>
            setRegister((prev) => ({ ...prev, email: e.target.value }))
          }
          value={register.email || ""}
        />
        <input
          className="p-2 w-5/6"
          type="password"
          placeholder="Senha"
          onChange={(e) =>
            setRegister((prev) => ({ ...prev, password: e.target.value }))
          }
          value={register.password || ""}
        />
        <input
          className="p-2 w-5/6"
          type="password"
          placeholder="Confirmação da senha"
          onChange={(e) =>
            setRegister((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          value={register.confirmPassword || ""}
        />

        {!loading && (
          <button
            className="p-2 bg-gray-800 text-white border-spacing-1"
            type="submit"
          >
            Cadastrar
          </button>
        )}

        {loading && (
          <button
            className="p-2 bg-gray-800 text-white border-spacing-1"
            type="submit"
            disabled
          >
            Cadastrando...
          </button>
        )}
        {error && <Message msg={error} type="error" />}
      </form>
      {/* <button onClick={addData} type="button">Dev Button</button> */}
      <p>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};
