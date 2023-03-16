import React, { useRef, useState } from "react";
import { storage } from "../../../firebaseModule";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../../redux/userSlice";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Loading from "./loading";

const SideBarRow = ({ onClick, title, d }) => {
  const inputRef = useRef();
  const [profilePic, setprofilePic] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.csmuser);

  function pickProfile() {
    inputRef.current.click();
  }

  function handleProfilePicChange(event) {
    setprofilePic(event.target.files[0]);

    // Show a toast notification with a button that uploads the image
    toast.dark(
      <div>
        <div>Select an image to upload</div>
        <button className="bg-white p-3 text-black text-[20px]" onClick={() => handleUpload(event.target.files[0])}>Upload</button>
      </div>,
      { autoClose: false }
    );
  }

  function handleUpload(profilePic) {
    if (profilePic) {
      setisLoading(true);

      const imageRef = ref(storage, `profile/profile_picture${selector.uniqueId}`);
      uploadBytes(imageRef, profilePic)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            dispatch(
              logIn({
                email: selector.email,
                name: selector.name,
                uniqueId: selector.uniqueId,
                restaurantName: selector.restaurantName,
                _id: selector._id,
                profilePic: url,
              })
            );
            setisLoading(false);
            toast.success("Profile picture uploaded successfully!");
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error occurred while uploading profile picture");
        });
    }
  }

  return (
    <li onClick={onClick === null ? pickProfile : onClick}>
      <a
        href="#"
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <input
          type={"file"}
          onChange={handleProfilePicChange}
          ref={inputRef}
          className="hidden"
        />
        {isLoading && onClick === null ? (
          <Loading />
        ) : selector.profilePic !== "" && onClick === null ? (
          <img
            alt="profile"
            className="w-[30px] h-[30px] rounded-full"
            src={selector.profilePic}
          />
        ) : (
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill-rule="evenodd" d={d} clip-rule="evenodd"></path>
          </svg>
        )}
        <span className="flex-1 ml-3 whitespace-wrap">{title}</span>
      </a>
    </li>
  );
};

export default SideBarRow;
