import { uploads } from "../../utils/config";
import { Pencil, Eye, X } from "lucide-react";

import { Message } from "../../components/message";
import { Link, useParams } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import { details } from "../../slices/userSlice";
import {
  listPhotos,
  publishPhoto,
  resetMessage,
  listPhotosById,
  listPhotosByUser,
  removePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [photoUser, setPhotoUser] = useState({
    title: "",
    image: "",
  });

  const newPhotoForm = useRef(null);
  const editPhotoForm = useRef(null);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    if (photoUser.title) formData.append("title", photoUser.title);
    if (photoUser.image) formData.append("image", photoUser.image);
    dispatch(publishPhoto(formData));
    setPhotoUser(() => ({
      title: "",
      image: "",
    }));
    resetComponentMessage();
    e.preventDefault();
  };

  const handleDelete = (photoId) => {
    dispatch(removePhoto(photoId));
    resetComponentMessage();
  };

  useEffect(() => {
    dispatch(details(id));
    dispatch(listPhotosByUser(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col items-center justify-center  my-0 mx-auto">
      {loading && <Message msg={"Carregando..."} type="error" />}
      {error && <Message msg={error} type="error" />}
      <div className=" w-3/4 flex flex-wrap items-center p-4 border-b-2">
        {user.profileImage && (
          <img
            className="w-40 h-40 rounded-full object-cover mr-2"
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
          />
        )}
        <div>
          <h2 className="text-2xl">{user.name}</h2>
          <p className="text-lg">{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div
            className="flex flex-col items-center justify-center p-4 bg-gray-100 w-3/4 mx-auto my-2 border border-gray-100 shadow-md gap-4"
            ref={newPhotoForm}
          >
            <h3>Compartilhe algum momemento seu:</h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center gap-5 w-full"
            >
              <label className="w-full">
                <span>Titulo para foto</span>
                <input
                  type="text"
                  placeholder="Insira o titula"
                  className="p-2 w-full mt-2"
                  onChange={(e) =>
                    setPhotoUser((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  value={photoUser.title || ""}
                />
              </label>
              <label className="w-full">
                <span>Imagem:</span>
                <input
                  type="file"
                  className="w-full mt-2 bg-gray-200 shadow-md p-2 "
                  placeholder="Imagem"
                  onChange={(e) =>
                    setPhotoUser((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                />
              </label>
              {!loadingPhoto && (
                <button
                  type="submit"
                  className="p-2 bg-gray-800 text-white border-spacing-1"
                >
                  Postar
                </button>
              )}
              {loadingPhoto && (
                <button
                  type="submit"
                  className="p-2 bg-gray-800 text-white border-spacing-1"
                  disabled
                >
                  Postar
                </button>
              )}
              {errorPhoto && <Message msg={errorPhoto} type="error" />}
              {messagePhoto && <Message msg={messagePhoto} type="success" />}
            </form>
          </div>
        </>
      )}
      <div className="w-3/4 h-4/5 grid lg:grid-cols-3 grid-cols-1 gap-3 flex-wrap flex-1">
        {photos &&
          photos.map((photo) => (
            <div
              key={photo._id}
              className="flex flex-col items-center justify-around p-5 bg-gray-100 border border-gray-100 shadow-md"
              ref={editPhotoForm}
            >
              <img
                className="w-36 h-36 object-cover mr-2"
                src={`${uploads}/photos/${photo.image}`}
                alt={photo.title}
              />
              <h3 className="truncate ... w-full text-center">{photo.title}</h3>
              {id === userAuth._id ? (
                <div className="flex gap-2">
                  <Link to={`/photos/${photo._id}`}>
                    <Eye className="w-4" />
                  </Link>
                  <Link to={`/photos/${photo._id}/edit`}>
                    <Pencil className="w-4" />
                  </Link>
                  <Link
                    to={`/users/${id}`}
                    type="submit"
                    onClick={() => handleDelete(photo._id)}
                  >
                    <X className="w-4" />
                  </Link>
                </div>
              ) : (
                <Link to={`/photos/${photo._id}`}>Ver mais</Link>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
