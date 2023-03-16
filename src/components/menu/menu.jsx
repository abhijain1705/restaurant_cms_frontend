import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../home/parts/loading';
import Card from '../home/parts/card';

const Menu = () => {

  const [toggleNavbar, settoggleNavbar] = useState(false);

  const selector = useSelector(state => state.csmuser);
  const [foodsList, setfoodsList] = useState([]);
  const [extraFoodList, setextraFoodList] = useState([]);
  const [filterNumber, setfilterNumber] = useState(0);
  const [topFilterNumber, settopFilterNumber] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [currentSideFilter, setcurrentSideFilter] = useState('');
  const [topFilter, settopFilter] = useState('');


  const handleFetchData = () => {
    fetch(`${process.env.REACT_APP_GET_DATA}/${selector.uniqueId}/`)
      .then((response) => response.json())
      .then((data) => {
        setisLoading(false);
        setfoodsList(data.menu.items);
        setextraFoodList(data.menu.items);
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
      toast.loading("data is loading...", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.dismiss();
    }
  }, [isLoading])


  const sideFilter = ["Food", "Bevarges", "Desserts", "Tobacco"];
  const topFoodFilter = ["APPETIZERS", "SALADS",
    "PASTA",
    "MAIN COURSE",
    "SANDWICH",
    "PIZZAS",
    "BURGERS",
    "KIDS MEAL",
    "ADD"];
  const topDessertsFilter = ["Desserts"];
  const topBevargesFilter = ["HOT BEVERAGES",
    "SMOOTHIES",
    "MILK SHAKES",
    "LEMONADE AND ICE TEA",
    "FRAPPE",
    "COLD BEVERAGES",
    "FRESH JUICE"];
  const topTobaccoFilter = ['ARGUILE'];

  useEffect(() => {
    let temp = [...foodsList];
    if (filterNumber !== 0) {
      temp = temp.filter((itm) => itm.category === currentSideFilter);
    } else {
      temp = [...extraFoodList];
    }
    if (topFilterNumber !== 0) {
      temp = temp.filter((itm) => itm.parent === topFilter);
    }
    setfoodsList(temp);
  }, [filterNumber, topFilter, topFilter, currentSideFilter]);

  return (
    <div className=''>
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
            <li className='flex items-center justify-center gap-3 flex-col'>
              <img src={selector.profilePic} alt='' className='w-[100px] h-[100px] rounded-full' />
              <span>{selector.name}</span>
            </li>
            <li className='text-xl font-bold'>Menu</li>
            {sideFilter.map((itm, ind) => {
              return (
                <li key={ind} onClick={() => { setfilterNumber(ind); setcurrentSideFilter(itm) }} className={`mt-2 ${filterNumber === ind ? 'bg-[#d1d5db]' : 'bg-blue-600'} ${filterNumber === ind ? 'text-black' : 'text-white'} text-center max-w-[120px] px-2 py-[4px] rounded-md cursor-pointer hover:bg-blue-400`}>{itm}</li>
              )
            })}
          </ul>
        </div>
      </aside>

      <div onClick={() => settoggleNavbar(false)} className="p-4 sm:ml-64">
        <div className="p-4 relative h-[90vh] overflow-auto border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <ul className="space-y-2 h-max flex gap-[10px]">
            {[filterNumber === 0 ? [...topFoodFilter] : filterNumber === 1 ? [...topBevargesFilter] : filterNumber === 2 ? [...topDessertsFilter] : [...topTobaccoFilter]].flat(1).map((itm, ind) => {
              return (
                <li key={ind} onClick={() => { settopFilterNumber(ind); settopFilter(itm) }} className={`mt-2 ${topFilterNumber === ind ? 'bg-[#d1d5db]' : 'bg-blue-600'} ${topFilterNumber === ind ? 'text-black' : 'text-white'} text-center max-w-[120px] px-2 py-[4px] rounded-md cursor-pointer hover:bg-blue-400`}>{itm}</li>
              )
            })}
          </ul>
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 mt-4 gap-2">
            {foodsList.length === 0 ? (
              <Loading />
            ) : (
              foodsList.map((itm, ind) => {
                return (
                  <Card
                    key={ind}
                    endUser={true}
                    name={itm.name}
                    price={itm.price}
                    img={itm.image}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Menu