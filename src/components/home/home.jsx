import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import SideBarRow from "./parts/sidebarRow";
import { ToastContainer, toast } from "react-toastify";
import MenuModal from "./parts/menuModal";
import AddRemoveBtn from "./parts/addRemoveButton";
import {
  useUpdateItemsMutation,
  useRemoveItemsMutation,
} from "../../redux/api";
import { storage } from "../../firebaseModule";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import Loading from "./parts/loading";
import Card from "./parts/card";

const Home = () => {
  const selector = useSelector((state) => state.csmuser);
  const [toggleNavbar, settoggleNavbar] = useState(false);
  const [copyToClipboard, setcopyToClipboard] = useState(false);
  const [errorInCopy, seterrorInCopy] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [foodImage, setfoodImage] = useState(null);
  const [foodsList, setfoodsList] = useState([]);
  const [food, setfood] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    flavour: "",
    parent: "",
    image: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setfood((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const disptach = useDispatch();

  const logoutMethod = () => {
    disptach(logout());
  };

  const [updateItems, response] = useUpdateItemsMutation();
  const [removeFood, responseRemove] = useRemoveItemsMutation();
  const [isLoading, setisLoading] = useState(false);

  function removeFoodMethod(foodId, foodUrl) {
    // you can also get the reference using the URL directly
    const imageRef = ref(storage, foodUrl);
    deleteObject(imageRef)
      .then(() => {
        removeFood({ foodId: foodId, restaurantId: selector.uniqueId });
      })
      .catch((error) => {
        toast.error("error in deleting,");
        console.log('Error deleting image:', error);
      });
  }

  useEffect(() => {
    if (responseRemove.isLoading) {
      toast.loading("deleting...");
    } else if (responseRemove.isError) {
      toast.error("error in deleting");
    } else if (responseRemove.isSuccess) {
      toast.success("successfully deleted.");

    }
  }, [responseRemove])


  const handleFetchData = () => {
    fetch(`${process.env.REACT_APP_GET_DATA}/${selector.uniqueId}/`)
      .then((response) => response.json())
      .then((data) => {
        setisLoading(false);
        if (foodsList.length == 0) {
          setfoodsList(data.menu.items);
        } else {
          setfoodsList((prev) => [...prev, ...data.menu.items]);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("error occured, try again!");
      });
  };

  useEffect(() => {
    setisLoading(true);
    handleFetchData();
  }, []);

  useEffect(() => {
    if (isLoading) {
      toast.loading("data is being loaded", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.dismiss();
    }
  }, [isLoading]);

  const url = `http://localhost:3000/restaurant/menu/${selector.uniqueId}`;

  const copy = async () => {
    setcopyToClipboard(true);
    try {
      await navigator.clipboard.writeText(url);
      setTimeout(() => {
        setcopyToClipboard(false);
        toast.success("link copied");
      }, 2000);
    } catch (error) {
      seterrorInCopy(true);
      toast.error("error in copying message");
    }
  };

  function saveDataToDabase(e) {
    e.preventDefault();
    if (
      foodImage === null ||
      food.category === "" ||
      food.description === "" ||
      food.flavour === "" ||
      food.name === "" ||
      food.price === "" ||
      food.parent === ""
    ) {
      toast.warning("all feilds should be written");
      return;
    }

    toast.loading("loading please wait");
    const imageRef = ref(storage, `foodImages/${foodImage.name}`);
    uploadBytes(imageRef, foodImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          let tempFood = { ...food };
          tempFood.image = url;
          updateItems({ restaurantId: selector.uniqueId, items: tempFood });

        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("error occured");
      });
  }

  function handlingResponse(response, successMsg) {
    // console.log(response);
    if (response.isError) {
      if ("data" in response.error) {
        let msg = response.error.data;
        toast.dismiss();
        toast.error(msg.error);
      }
    } else if (response.isSuccess) {
      toast.dismiss();
      toast.success(successMsg);
      setfood({
        name: "",
        description: "",
        price: 0,
        tempFood: "",
        category: "",
        flavour: "",
        parent: "",
      });
      setshowModal(false);
      setfoodImage(null);
    }
  }

  useEffect(() => {
    handlingResponse(response, "successfully added item");
  }, [response]);
  
  return (
    <div>
      <ToastContainer />
      <button
        onClick={() => settoggleNavbar(true)}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-60 h-screen transition-transform ${toggleNavbar ? "translate-x-0" : "-translate-x-full"
          } -translate-x-full sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 h-full flex flex-col gap-[10px]">
            <SideBarRow
              d={"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"}
              onClick={null}
              title={`Welcome ${selector.name}`}
            />
            <li>
              <QRCode value={url} />
            </li>
            <li>
              <button
                onClick={copy}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Copy to Clipboard {copyToClipboard && <Loading />}
              </button>
            </li>
            {errorInCopy && (
              <li className="bg-white p-4">
                {url.substring(0, 22)} <br />{" "}
                {url.substring(22, url.length - 1)}{" "}
              </li>
            )}
            <SideBarRow
              d={
                "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              }
              onClick={logoutMethod}
              title="Logout"
            />
          </ul>
        </div>
      </aside>

      <div
        onClick={() => settoggleNavbar(false)}
        className="p-4 relative sm:ml-64"
      >
        <div className="p-4 relative h-[90vh] overflow-auto border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <AddRemoveBtn fnToRun={() => setshowModal(true)} />
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 mt-4 gap-2">
            {foodsList.length === 0 ? (
              <Loading />
            ) : (
              foodsList.map((itm, ind) => {
                return (
                  <Card
                    key={ind}
                    removeFoodMethod={responseRemove.isLoading ? null : () => removeFoodMethod(itm.foodId, itm.image)}
                    name={itm.name}
                    price={itm.price}
                    img={itm.image}
                  />
                );
              })
            )}
          </div>
          <MenuModal
            setfoodImage={setfoodImage}
            food={food}
            setfood={handleChange}
            setshowModal={setshowModal}
            showModal={showModal}
            isLoading={response.isLoading}
            saveDataToDabase={response.isLoading ? null : saveDataToDabase}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
