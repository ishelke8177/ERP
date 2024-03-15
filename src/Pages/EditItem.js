/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FormikProvider, useFormik } from 'formik'
import InputLabel from '../components/form/InputLabel'
import SelectInputField from '../components/form/SelectInputField'
import TextInputField from '../components/form/TextInputField'
import NumberInputField from '../components/form/NumberInputField'
import { categoryArrForForm } from '../data/constants'
import { fetchItemById, updateItemById } from '../features/apiCalls'
import { addEditItemValidationSchema } from '../validation/addEditItemValidationSchema'

const EditItem = () => {
  const { itemId } = useParams()
  const dispatch = useDispatch()
  const {isLoading, item} = useSelector(state => state.foodItems)
  const [imageFile, setImageFile] = useState('');

  const formik = useFormik({
    initialValues: {
      category_name: item?.category_name,
      specific_item: item?.specific_item,
      quantity: item?.quantity,
      price: item?.price,
      image_name: item?.image_name
    },
    validationSchema: addEditItemValidationSchema,
    onSubmit: handleUpdate,
  });

  useEffect(() => {
    dispatch(fetchItemById(itemId));
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    formik.setFieldValue('image_name', file.name);
  };

  function handleUpdate(values) {
    dispatch(updateItemById({ itemId, values, imageFile }));
  }

  return (
    <div>
      {isLoading ? <h1>shimmer</h1>: 
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <InputLabel>Category Name</InputLabel>
              <SelectInputField label="Please choose Category" options={categoryArrForForm} {...formik.getFieldProps("category_name")}/>
              {formik.touched.category_name && formik.errors.category_name && (
                <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.category_name}</div>
              )}
            </div>
            <div className="mb-5">
              <InputLabel>Item Name</InputLabel>
              <TextInputField {...formik.getFieldProps("specific_item")}/>
              {formik.touched.specific_item && formik.errors.specific_item && (
                  <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.specific_item}</div>
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
              <InputLabel>Price</InputLabel>
              <NumberInputField {...formik.getFieldProps("price")}/>
              {formik.touched.price && formik.errors.price && (
                <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.price}</div>
              )}
            </div>
            <div className="mb-5">
              <InputLabel>Upload Image</InputLabel>
              <input type='file' name='image_name' onChange={handleFileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              {formik.touched.image_name && formik.errors.image_name && (
                <div className="error" style={{ fontSize: '0.8rem', color: 'red' }}>{formik.errors.image_name}</div>
              )}
            </div>

            <button type="submit" className="text-white bg-slate-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
          </form>
        </FormikProvider>
      }
    </div>
  )
}

export default EditItem