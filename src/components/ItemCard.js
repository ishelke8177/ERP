/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AWS from "aws-sdk";
import config from '../config/config.json'
import { deleteFoodItem, fetchItemById } from '../features/apiCalls';

const ItemCard = ({ id, category_name, specific_item, quantity, price, image_name}) => {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [fileUrl, setFileURL] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    handleGet();
    dispatch(fetchItemById(id));
  }, [])
  
  async function handleGet(){
    const s3 = new AWS.S3();
    const params = {
        Bucket: config.S3_BUCKET_NAME,
        Key: image_name
    };
    const GETEndpoint = await s3.getSignedUrlPromise('getObject', params)

    try {
        const resp = await axios.get(GETEndpoint)
        setFileURL(resp?.config?.url)
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className="w-[200px] h-[230px] p-2 m-2 shadow-lg bg-pink-50 rounded-lg">
        <img src={fileUrl} alt='logo' style={{ height: "120px", width: "95%", backgroundSize: "auto", position: "relative", borderRadius: "10px 10px 0 0" }}/>
        <div className="font-bold text-xl">{specific_item}</div>
        <div>Price: {price}</div>
        <div>Quantity: {quantity}</div>
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
                      <div className="sm:flex sm:items-start">
                        <img src={fileUrl} alt='aaa' />
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <Link to={'/proceed-order/' + id}>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                      >
                        Order
                      </button>
                      </Link>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                        onClick={() => dispatch(deleteFoodItem(id))}
                      >
                        Delete
                      </button>
                      <Link to={'/edit-order/' + id}>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                        >
                          Edit
                        </button>
                      </Link>
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

export default ItemCard