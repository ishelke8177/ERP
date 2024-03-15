/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector } from 'react-redux'
import KeyCard from '../components/KeyCard'

const Body = () => {
  const myItems = useSelector(store => store.foodItems.items)
  const myOrders = useSelector(store => store.orders.ordersArr)

  const totalProducts = myItems.length
  const totalOrders = myOrders.length

  return (
      <div className='flex flex-wrap gap-4 justify-center mt-10'>
        <KeyCard num={totalProducts} text="Total Number of Products"/>
        <KeyCard num={totalOrders} text="Total Orders till now"/>
        <KeyCard num={3} text="Total Categories Available"/>
      </div>
  )
}

export default Body
