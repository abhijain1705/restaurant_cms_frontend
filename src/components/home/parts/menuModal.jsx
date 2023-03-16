import React, { useState } from 'react'
import InputComponent from '../../common/components/input';

const MenuModal = ({ saveDataToDabase, isLoading, setshowModal, showModal, food, setfood, setfoodImage }) => {

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setfoodImage(file);
        }
    };


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

    const [toggleDropdownCategory, settoggleDropdownCategory] = useState(false);
    const [toggleDropdownParent, settoggleDropdownParent] = useState(false);

    return (
        <div id='menuModal' className={`border-2 border-grey-500 border-dashed absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${showModal ? "block" : 'hidden'} overflow-auto max-h-[400px] min-w-[300px] md:w-[400px] `}>
            <div className="relative w-full h-full max-w-md md:h-auto">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={() => setshowModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add new Item to Menu</h3>
                        <form action='#' onSubmit={isLoading ? null : saveDataToDabase} className="space-y-6">
                            <InputComponent value={food.name} setValue={setfood} name='name' label={'Food Name'} />
                            <InputComponent value={food.description} setValue={setfood} name='description' label={'Food description'} />
                            <button onClick={() => settoggleDropdownCategory(!toggleDropdownCategory)} id="dropdownRadioButton" data-dropdown-toggle="dropdownDefaultRadio" className="w-full text-black bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center justify-between inline-flex items-center dark:bg-gray-50 dark:hover:bg-gray-100 dark:focus:ring-gray-300" type="button">Food Category <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                            <div id="dropdownDefaultRadio" className={`z-10 ${toggleDropdownCategory ? 'block' : 'hidden'} w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                    {sideFilter.map((itm, ind) => {
                                        return (
                                            <li key={ind}>
                                                <div className="flex items-center">
                                                    <input onChange={setfood} id="default-radio-1" type="radio" value={itm} name='category' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{itm}</label>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            {/* <InputComponent value={food.category} setValue={setfood} name='category' label={'Food category'} /> */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                <input name='image' accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG (MAX. 800x400px).</p>
                            </div>
                            <InputComponent value={food.price} setValue={setfood} name='price' label={'Food Price'} />
                            <InputComponent value={food.flavour} setValue={setfood} name='flavour' label={'Food flavour'} />
                            <button onClick={() => settoggleDropdownParent(!toggleDropdownParent)} id="dropdownRadioButton" data-dropdown-toggle="dropdownDefaultRadio" className="w-full text-black bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center justify-between inline-flex items-center dark:bg-gray-50 dark:hover:bg-gray-100 dark:focus:ring-gray-300" type="button">Food Parent Name <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                            <div id="dropdownDefaultRadio" className={`z-10 ${toggleDropdownParent ? 'block' : 'hidden'} w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                    {[food.category === sideFilter[0] ? [...topFoodFilter] : food.category === sideFilter[1] ? [...topBevargesFilter] : food.category === sideFilter[2] ? [...topDessertsFilter] : [...topTobaccoFilter]].flat(1).map((itm, ind) => {
                                        return (
                                            <li key={ind}>
                                                <div className="flex items-center">
                                                    <input id="default-radio-1" onChange={setfood} type="radio" value={itm} name="parent" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label for="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{itm}</label>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <button disabled={isLoading} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuModal;