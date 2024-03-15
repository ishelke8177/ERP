import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { orderItem } from '../features/apiCalls';
import { orderValidationSchema } from '../validation/orderValidationSchema';

const ProceedOrder = () => {
  const { item } = useSelector((state) => state.foodItems)
  const { isSuccess } = useSelector((state) => state.orders)
  const [statusArr] = useState(['Confirmed'])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    dispatch(orderItem(values));
    if(isSuccess === true){ // not working
      navigate('/products')
    }
  };

  const formik = useFormik({
    initialValues: {
      order_item_name: item?.specific_item,
      customer_name: '',
      order_date: '',
      status: '',
      imageName: item?.image_name,
      quantity: 1,
      pricePerItem: Number(item?.price),
      totalPrice: Number(item?.price)
    },
    validationSchema: orderValidationSchema,
    onSubmit: handleSubmit,
  });

  function onIncrement() {
    if(formik.values.quantity < item?.quantity){
      formik.values.quantity += 1
      formik.values.totalPrice += formik.values.pricePerItem
    }
  }
  
  function onDecrement() {
    if(formik.values.quantity > 1){
      formik.values.quantity -= 1
      formik.values.totalPrice -= formik.values.pricePerItem
    }
  }

  return (
    <div>
        <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label htmlFor="customer_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Name</label>
            <input type="text" name='customer_name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.customer_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            {formik.touched.customer_name && formik.errors.customer_name && (
              <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.customer_name}</div>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="order_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Date</label>
            <input type="date" name='order_date' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.order_date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            {formik.touched.order_date && formik.errors.order_date && (
              <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.order_date}</div>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="order_item_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Name</label>
            <input type="text" name='order_item_name' value={formik.values.order_item_name} readOnly="readOnly" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            {formik.touched.order_item_name && formik.errors.order_item_name && (
              <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.order_item_name}</div>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
            <select onBlur={formik.handleBlur} onChange={formik.handleChange} name='status' value={formik.values.status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Please choose Status</option>
                {statusArr.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.status}</p>
            )}
          </div>

          <div className='mb-5 flex justify-between'>
            <div><p>Quantity</p></div>
            <div className='flex gap-2'>
              <button onClick={onIncrement}>+</button>
              {formik.values.quantity}
              <button onClick={onDecrement}>-</button>
            </div>
          </div>

          <div className="mb-5">
            <div className='flex justify-between'>
              <div><p>Total Price</p></div>
              <div>{formik.values.totalPrice} Rs</div>
            </div>
          </div>

          <button type="submit" className="text-white bg-slate-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Place Order</button>
        </form>
    </div>
  )
}

export default ProceedOrder
