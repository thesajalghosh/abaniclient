import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../layout/Layout'
import { isEmpty } from '../../utils/CommonUtilsFunction'
import "./BookingsPage.css"
import { MdCurrencyRupee } from "react-icons/md";

const BookingsPage = () => {
    const [allBookings, setAllBookings] = useState()
    const user_info = useSelector((state) => state.auth.user)

    // console.log(user_info)

    const getAllBookings = async () => {
        try {
            const get_all_bookings = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/get-single-user-order/${user_info._id}`)
            if (get_all_bookings.data.success) {
                setAllBookings(get_all_bookings.data.orders)
            }

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getAllBookings()
    }, [])
    return (
        <Layout headerEle={"Bookings"}>
            <div className="whole_booking_container">

                {!isEmpty(allBookings) && (allBookings ?? [])?.map((ele, i) => (
                    <div className="order_element_container" key={ele?._id}>
                        <div className="order_element_heading">Booking  #{i + 1}</div>
                        <div className="booking_date_slot">
                            <div className="booking_date">
                                <span>Service Booked on</span>
                                <span>{new Date(ele?.bookingDate).toLocaleDateString('en-GB')}</span>
                            </div>
                            <div className="booked_slot">
                                <span>Booked slot</span>
                                <span>{ele?.timeSlot?.value}</span>
                            </div>
                        </div>
                        <div className="order_item">
                            {ele?.items.map((item, index) => (
                                <div className="item_whole_container">
                                    <div className="item_name_price">
                                        <div className="item_name">
                                            {index + 1}. {item?.product?.name}
                                        </div>
                                        <div className="service_price">
                                            <MdCurrencyRupee size={16} /> {item?.price}
                                        </div>

                                    </div>
                                    <div className="item_order_quantity_time">

                                        <div className="expected_time">
                                            Expected time - 1 hr 35 min
                                        </div>
                                        .
                                        <div className="order_quantity">
                                            Quantity   {item?.quantity}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="payment_order_status_container">
                            <div className="status_element">
                                <span>Payment status</span>
                                <span>{ele?.paymentStatus}</span>
                            </div>
                            <div className="status_element">
                                <span>Order status</span>
                                <span>{ele?.orderStatus}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </Layout>
    )
}

export default BookingsPage
