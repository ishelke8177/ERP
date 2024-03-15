/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axios from 'axios'
import config from '../config/config.json'
import ItemCard from '../components/ItemCard'
import Dropdown from '../components/Dropdown'
import { handleImageUpload } from '../utils/helper';
import { categoryArrForForm } from '../data/constants';

const Products = () => {
    const [currentCategoryD, setCurrentCategoryD] = useState('All') // for dynamic UI
    const [open, setOpen] = useState(false)
    const [itemData, setItemData] = useState({
        category_name: "",
        specific_item: "",
        quantity: "",
        price: "",
    })
    const [file, setFile] = useState();
    const cancelButtonRef = useRef(null)
    const [currentCategory, setCategory] = useState('Dosa'); // for form
    const myItems = useSelector(store => store.foodItems.items)
    const [newFilteredArray, setNewFilteredArray] = useState([])

    useEffect(() => {
        let arr;
        if(currentCategoryD === 'Dosa'){
            arr = myItems.filter((item) => item.category_name === 'Dosa')
        }
        else if(currentCategoryD === 'Burger'){
            arr = myItems.filter((item) => item.category_name === 'Burger')
        }
        else if(currentCategoryD === 'Chinese'){
            arr = myItems.filter((item) => item.category_name === 'Chinese')
        }
        else{
            arr = myItems.filter((item) => item)
        }
        setNewFilteredArray(arr)
    }, [currentCategoryD])
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItemData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const onOptionChangeHandler = (event) => {
        setCategory(event.target.value);
    };

    console.log('newFilteredArray: ', newFilteredArray);
    console.log('myItems: ', myItems);

    async function handleSubmit(e) {
        e.preventDefault();
        const obj = { ...itemData, category_name: currentCategory, image_name: file.name }
        try {
            const resp = await axios.post(`${config.HOST_LINK}/items`, obj)

            if(resp.status === 201){
                handleImageUpload(file);
                // setCurrentCategoryD('Dosa'); 
                toast.success('Item Added.')
                itemData.category_name = "";
                itemData.specific_item = "";
                itemData.quantity = "";
                itemData.price = "";
            }
        } catch (error) {
            toast.error('Failed to Add Item.')
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <div className='flex justify-between'>
                    <div className='ml-6 mt-3'>
                        <Dropdown currentCategoryD={currentCategoryD} setCurrentCategoryD={setCurrentCategoryD}/>
                    </div>
                    <div className='mt-3'>
                        <button type="button" onClick={() => setOpen(true)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add Item</button>
                    </div>
                </div>
                {/* {newFilteredArray.length===0 ? <div className='text-center'>No Items to show...</div>:
                    <div className='flex flex-wrap justify-center gap-2'>
                        {Array.isArray(newFilteredArray) && newFilteredArray.map((item, index) => 
                            <ItemCard {...item} key={index} />
                        )}
                    </div>

                    
                } */}
                {myItems.length===0 ? <div className='text-center'>No Items to show...</div>:
                    <>
                        {newFilteredArray.length===0 ?
                            <div className='flex flex-wrap justify-center gap-2'>
                                {Array.isArray(myItems) && myItems.map((item, index) => 
                                    <ItemCard {...item} key={index} />
                                )}
                            </div> 
                            :
                            <>
                                <div className='flex flex-wrap justify-center gap-2'>
                                    {Array.isArray(newFilteredArray) && newFilteredArray.map((item, index) => 
                                        <ItemCard {...item} key={index} />
                                    )}
                                </div>
                            </>
                        }
                    </>
                    /* <div className='flex flex-wrap justify-center gap-2'>
                        {Array.isArray(newFilteredArray) && newFilteredArray.map((item, index) => 
                            <ItemCard {...item} key={index} />
                        )}
                    </div> */


                }
            </div>

            <div>
                <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
            
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Category Name
                                        </label>
                                        <select onChange={onOptionChangeHandler} name='category_name' className="shadow appearance-none border rounded w-full py-2 px-1 text-black">
                                            {categoryArrForForm.map((option, index) => {
                                                return (
                                                    <option key={index}>
                                                        {option}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Food Name
                                        </label>
                                        <input name="specific_item" value={itemData.specific_item} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Price
                                        </label>
                                        <input name="price" value={itemData.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Quantity Available
                                        </label>
                                        <input name="quantity" value={itemData.quantity} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        <label className="block text-black text-sm font-bold mb-1">
                                           Upload Image
                                        </label>
                                        <input type='file' onChange={(e) => setFile(e.target.files[0])} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                    </form>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        onClick={handleSubmit}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
                </Transition.Root>
            </div>
        </>
    )
}

export default Products