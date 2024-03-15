/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchFoodItems, getOrderItems } from '../features/apiCalls'

const Header = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchFoodItems());
    dispatch(getOrderItems());
  }, [])

  return (
    <div className="flex h-16 align-middle py-1 justify-between bg-pink-100 shadow-lg">
      <div className='ml-3 flex items-center font-bold'>
        <h2>MyStore</h2>
      </div>
      <div className='flex items-center mr-3'>
        <ul className="flex items-center">
          <li className='px-2'>
            <Link to={'/'}>Dashboard</Link>
          </li>
          <li className='px-2'>
            <Link to={'/products'}>Products</Link>
          </li>
          <li className='px-2'>
            <Link to={'/orders'}>Orders</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
