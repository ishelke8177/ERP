/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { FormikProvider, useFormik } from 'formik';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios'
import config from '../config/config.json'
import { handleImageUpload } from '../utils/helper';
import { categoryArrForForm } from '../data/constants';
import ItemCard from '../components/ItemCard'
import Dropdown from '../components/Dropdown'
import InputLabel from '../components/form/InputLabel';
import TextInputField from '../components/form/TextInputField';
import NumberInputField from '../components/form/NumberInputField';
import SelectInputField from '../components/form/SelectInputField';
import { addEditItemValidationSchema } from '../validation/addEditItemValidationSchema';

const Products = () => {
    const [categoryDropDown, setCategoryDropDown] = useState('All')
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const myItems = useSelector(store => store.foodItems.items)
    const [newFilteredArray, setNewFilteredArray] = useState([])
    const formik = useFormik({
        initialValues: {
            category_name: '',
            specific_item: '',
            quantity: 1,
            price: 0,
            image_name: ''
        },
        validationSchema: addEditItemValidationSchema,
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
                            <div className='flex flex-wrap justify-center gap-2'>
                                {Array.isArray(newFilteredArray) && newFilteredArray.map((item, index) => 
                                    <ItemCard {...item} key={index} />
                                )}
                            </div>
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
                                        <FormikProvider value={formik}>
                                            <form onSubmit={formik.handleSubmit} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                                <div className="mb-5">
                                                    <InputLabel>Category Name</InputLabel>
                                                    <SelectInputField label="Please choose Category" options={categoryArrForForm} {...formik.getFieldProps("category_name")}/>
                                                    {formik.touched.category_name && formik.errors.category_name && (
                                                        <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.category_name}</div>
                                                    )}
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel>Food Name</InputLabel>
                                                    <TextInputField {...formik.getFieldProps("specific_item")}/>
                                                    {formik.touched.specific_item && formik.errors.specific_item && (
                                                        <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.specific_item}</div>
                                                    )}
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel>Price</InputLabel>
                                                    <NumberInputField {...formik.getFieldProps("price")}/>
                                                    {formik.touched.price && formik.errors.price && (
                                                        <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.price}</div>
                                                    )}
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel>Quantity Available</InputLabel>
                                                    <NumberInputField {...formik.getFieldProps("quantity")}/>
                                                    {formik.touched.quantity && formik.errors.quantity && (
                                                        <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.quantity}</div>
                                                    )}
                                                </div>
                                                <div className="mb-5">
                                                    <InputLabel>Upload Image</InputLabel>
                                                    <input type="file" name='image_name' onChange={handleFileChange} onBlur={formik.handleBlur} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                                                    {formik.touched.image_name && formik.errors.image_name && (
                                                        <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.image_name}</div>
                                                    )}
                                                </div>

                                                <div className='flex justify-between'>
                                                    <button type="submit" className="text-white bg-slate-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Item</button>
                                                    <button type="button" onClick={() => setOpen(false)} ref={cancelButtonRef} className="text-white bg-slate-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</button>
                                                </div>
                                            </form>
                                        </FormikProvider>
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