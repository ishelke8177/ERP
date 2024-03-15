/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchItemById, updateItemById } from '../features/apiCalls'
import { categoryArrForForm } from '../data/constants'

const EditItem = () => {
  const { itemId } = useParams()
  const dispatch = useDispatch()
  const {isLoading, item} = useSelector(state => state.foodItems)
  const [currentCategory, setCategory] = useState('');
  const [imageFile, setImageFile] = useState('');
  const navigate = useNavigate()
  const [itemData, setItemData] = useState({
    category_name: item?.category_name,
    specific_item: item?.specific_item,
    quantity: item?.quantity,
    price: item?.price,
    image_name: item?.image_name
  })

  useEffect(() => {
    dispatch(fetchItemById(itemId));
  }, [])

  const onOptionChangeHandler = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setItemData(prevItemData => ({
      ...prevItemData,
      category_name: selectedCategory
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === 'image_name'){
      setImageFile(event.target.files[0])
      setItemData((prevFormData) => ({ ...prevFormData, [name]: event.target.files[0].name }));
    }
    else{
      setItemData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  function handleUpdate(e) {
    e.preventDefault();
    dispatch(updateItemById({ itemId, itemData, imageFile }));
  }

  return (
    <div>
      {isLoading ? <h1>shimmer</h1>: 
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label htmlFor="category_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
            <select onChange={onOptionChangeHandler} name='category_name' value={item?.category_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {categoryArrForForm.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                      );
                })}
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="specific_item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Food Item</label>
            <input type="text" name='specific_item' onChange={handleChange} value={itemData?.specific_item} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
            <input type="text" name='quantity' onChange={handleChange} value={itemData?.quantity} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="text" name='price' onChange={handleChange} value={itemData?.price} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label htmlFor="image_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Image</label>
            <span>{itemData?.image_name}</span>
            <input type='file' name='image_name' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <button type="submit" onClick={handleUpdate} className="text-white bg-slate-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
        </form>
      }
    </div>
  )
}

export default EditItem