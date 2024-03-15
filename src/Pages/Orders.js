import React from 'react'
import { useSelector } from 'react-redux'

const Orders = () => {
    const { ordersArr } = useSelector((state) => state.orders)

    return (
        <>
            {ordersArr.length===0 ? <div className='text-center mt-5'>No Items to show...</div>:
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Customer Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Item Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Order Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersArr.map(order => {
                                return (
                                    <tr key={order?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">
                                            {order?.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {order?.customer_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order?.order_item_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order?.order_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order?.status}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default Orders
