import { uploads } from "../../utils/config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profile, resetMessage, update } from "../../slices/userSlice";
import { Message } from "../../components/message";

export const EditProfile = () => {
  const [profileUser, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    profileImage: "",
    previewImage: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { user, loading, message, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        bio: user.bio,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userData = {};
    if (profileUser.name) userData.name = profileUser.name;
    if (profileUser.bio) userData.bio = profileUser.bio;
    if (profileUser.profileImage) {
      userData.profileImage = profileUser.profileImage;
    }
    if (profileUser.password) userData.password = profileUser.password;

    const formData = new FormData();
    for (let key in userData) {
      formData.append(key, userData[key]);
    }
    dispatch(update(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 w-11/12 md:w-1/2 mx-auto my-10 border border-gray-100 shadow-md gap-4">
      <h2>Edite seus dados</h2>
      <p>Adicione uma imagem de perfil e nos conte mais sobre sua pessoa...</p>,
      {(user.profileImage || profileUser.previewImage) && (
        <img
          src={
            profileUser.previewImage
              ? profileUser.previewImage
              : `${uploads}/users/${user.profileImage}`
          }
          alt="user"
          className="border rounded-full border-gray-200 shadow-sm"
          width="150px"
          height="150px"
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5 w-full"
      >
        <input
          className="p-2 w-5/6"
          type="text"
          placeholder="Nome"
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, name: e.target.value }))
          }
          value={profileUser.name || ""}
        />
        <input
          className="p-2 w-5/6"
          type="text"
          placeholder="E-mail"
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, email: e.target.value }))
          }
          value={profileUser.email || ""}
          disabled
        />
        <label className="w-5/6">
          <span>Imagem do perfil:</span>
          <input
            className="w-full mt-2 bg-gray-200 shadow-md p-2 "
            type="file"
            placeholder="Imagem do perfil"
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                profileImage: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]),
              }))
            }
          />
        </label>
        <label className="w-5/6">
          <span>Bio:</span>
          <input
            type="text"
            className="p-2 w-full mt-2"
            placeholder="Descrição da bio"
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, bio: e.target.value }))
            }
            value={profileUser.bio || ""}
          />
        </label>
        <label className="w-5/6">
          <span>Alterar senha:</span>
          <input
            className="w-full mt-2"
            type="password"
            placeholder="Senha"
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, password: e.target.value }))
            }
            value={profileUser.password || ""}
          />
        </label>
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
        {!loading && (
          <button
            className="p-2 bg-gray-800 text-white border-spacing-1"
            type="submit"
          >
            Atualizar
          </button>
        )}
        {loading && (
          <button
            className="p-2 bg-gray-800 text-white border-spacing-1"
            type="submit"
            disabled
          >
            Atualizando...
          </button>
        )}
      </form>
    </div>
  );
};
