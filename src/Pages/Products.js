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
import { useFormik } from 'formik';
import { addItemValidationSchema } from '../validation/AddItemValidationSchema';

const Products = () => {
    const [categoryDropDown, setCategoryDropDown] = useState('All') // for dynamic UI
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const myItems = useSelector(store => store.foodItems.items)
    const [newFilteredArray, setNewFilteredArray] = useState([])
    const formik = useFormik({
        initialValues: {
            category_name: 'Dosa',
            specific_item: '',
            quantity: 1,
            price: 0,
            image_name: ''
        },
        validationSchema: addItemValidationSchema,
        onSubmit: handleSubmit,
      });

    useEffect(() => {
        let arr;
        if(categoryDropDown === 'Dosa'){
            arr = myItems.filter((item) => item.category_name === 'Dosa')
        }
        else if(categoryDropDown === 'Burger'){
            arr = myItems.filter((item) => item.category_name === 'Burger')
        }
        else if(categoryDropDown === 'Chinese'){
            arr = myItems.filter((item) => item.category_name === 'Chinese')
        }
        else{
            arr = myItems.filter((item) => item)
        }
        setNewFilteredArray(arr)
    }, [categoryDropDown])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('image_name', file);
      };

    async function handleSubmit(values) {
        const obj = { ...values, image_name: values.image_name.name }
        try {
            const resp = await axios.post(`${config.HOST_LINK}/items`, obj)

            if(resp.status === 201){
                handleImageUpload(values.image_name);
                toast.success('Item Added.')
                // itemData.category_name = "";
                // itemData.specific_item = "";
                // itemData.quantity = "";
                // itemData.price = "";
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
                        <Dropdown categoryDropDown={categoryDropDown} setCategoryDropDown={setCategoryDropDown}/>
                    </div>
                    <div className='mt-3'>
                        <button type="button" onClick={() => setOpen(true)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add Item</button>
                    </div>
                </div>
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
                                    <form onSubmit={formik.handleSubmit} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">

                                        <label htmlFor="category_name" className="block text-black text-sm font-bold mb-1">
                                            Category Name
                                        </label>
                                        <select name='category_name' onChange={formik.handleChange} value={formik.values.category_name} className="shadow appearance-none border rounded w-full py-2 px-1 text-black">
                                            {categoryArrForForm.map((option, index) => {
                                                return (
                                                    <option key={index}>
                                                        {option}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {formik.touched.category_name && formik.errors.category_name && (
                                            <div className="error">{formik.errors.category_name}</div>
                                        )}

                                        <label htmlFor='specific_item' className="block text-black text-sm font-bold mb-1">
                                            Food Name
                                        </label>
                                        <input type="text" name="specific_item" onChange={formik.handleChange} value={formik.values.specific_item} onBlur={formik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        {formik.touched.specific_item && formik.errors.specific_item && (
            <                               div className="error">{formik.errors.specific_item}</div>
                                        )}

                                        <label htmlFor='price' className="block text-black text-sm font-bold mb-1">
                                            Price
                                        </label>
                                        <input type="number" name="price" onChange={formik.handleChange} value={formik.values.price} onBlur={formik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        {formik.touched.price && formik.errors.price && (
            <                               div className="error">{formik.errors.price}</div>
                                        )}

                                        <label htmlFor='quantity' className="block text-black text-sm font-bold mb-1">
                                            Quantity Available
                                        </label>
                                        <input type="number" name="quantity" onChange={formik.handleChange} value={formik.values.quantity} onBlur={formik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        {formik.touched.quantity && formik.errors.quantity && (
            <                               div className="error">{formik.errors.quantity}</div>
                                        )}

                                        <label htmlFor='image_name' className="block text-black text-sm font-bold mb-1">
                                           Upload Image
                                        </label>
                                        <input type='file' name='image_name' onChange={handleFileChange} onBlur={formik.handleBlur} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        {/* <input type='file' name='image_name' onChange={(e) => setFile(e.target.files[0])} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" /> */}
                                        {formik.touched.image_name && formik.errors.image_name && (
            <                               div className="error">{formik.errors.image_name}</div>
                                        )}

                                        <button type="submit" className="text-white bg-slate-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Item</button>
                                    </form>

                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

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