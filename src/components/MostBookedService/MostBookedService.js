import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./MostBookService.css"
import { FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

const MostBookedService = () => {
    const [mostBookedServicedList, setMostBookedServiceList] = useState([]);

    const getAllMostBookedServiced = async () => {
        try {
            const { data: all_service } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/all-popular-product`)
            if (all_service.success) {

                setMostBookedServiceList(all_service.all_popular_product)

            }

        } catch (error) {
            console.log("error")
        }
    }

    useEffect(() => {
        getAllMostBookedServiced()
    }, [])

    console.log("mostBookedServicedList", mostBookedServicedList)
    return (
        <div className="most_booked_service_whole_container">
            <div className="most_booked_service_heading">Most Popular</div>

            <div className="popular_product_container">
                {mostBookedServicedList?.map((ele) => (
                    <div className="every_popular_service" key={ele.id}>
                        <div className="popular_service_image"><img src={ele.product.url} alt={ele.product.name}/></div>
                        <div className="popular_service_content">
                            <div className="service_name">{ele.product.name}</div>
                            <div className="service_rating">
                                <span><FaStar/></span>
                                <span>4.75</span>
                                <span>(100)</span>
                            </div>
                            <div className="service_price"><FaIndianRupeeSign size={14}/>{ele.product.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MostBookedService
