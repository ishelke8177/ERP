import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FormikProvider, useFormik } from 'formik';
import { orderItem } from '../features/apiCalls';
import InputLabel from '../components/form/InputLabel';
import TextInputField from '../components/form/TextInputField';
import DateInput from '../components/form/DateInput';
import SelectInputField from '../components/form/SelectInputField';
import { orderValidationSchema } from '../validation/orderValidationSchema';

const ProceedOrder = () => {
  const { item } = useSelector((state) => state.foodItems)
  const [statusArr] = useState(['Confirmed'])
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    dispatch(orderItem(values));
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
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <InputLabel>Customer Name</InputLabel>
            <TextInputField {...formik.getFieldProps("customer_name")} />
            {formik.touched.customer_name && formik.errors.customer_name && (
              <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.customer_name}</div>
            )}
          </div>
          <div className="mb-5">
           <InputLabel>Order Date</InputLabel>
           <DateInput {...formik.getFieldProps("order_date")}/>
            {formik.touched.order_date && formik.errors.order_date && (
              <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.order_date}</div>
            )}
          </div>
          <div className="mb-5">
            <InputLabel>Item Name</InputLabel>
            <TextInputField {...formik.getFieldProps("order_item_name")} />
            {formik.touched.order_item_name && formik.errors.order_item_name && (
              <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.order_item_name}</div>
            )}
          </div>
          <div className="mb-5">
            <InputLabel>Status</InputLabel>
            <SelectInputField label="Please choose Status" options={statusArr} {...formik.getFieldProps("status")}/>
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
      </FormikProvider>
    </div>
  )
}

export default ProceedOrder
