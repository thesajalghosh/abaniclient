import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./CategoryComponent.css"
import Loader from "../../components/Loader/Loader"

const CategoryComponent = () => {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const getAllCategory = async () => {
      setLoading(true)
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/get-all-category`);
          if (data.success) {
            setCategories(data.category);
          }
        } catch (error) {
          console.log(error);
        
        }finally{
          setLoading(false)
        }
      };

    useEffect(()=>{
        getAllCategory()
    },[])  


    const handelCategoryProduct = (id)=>{
            navigate(`/category-product/${id}`)
    }
  return (
    <div className="category_component_whole_container">
    {/* {!loading && <Loader/>} */}
    <div className="category_component_content_container">
        {categories?.map((ele, index)=>(
            
                <div className="category_content" key={ele._id} onClick={()=>handelCategoryProduct(ele._id)}>
                    <div className="category_image">
                        <img src={ele.url} alt={ele.name}/>
                    </div>
                    <div className="category_name">{ele.name}</div>
                </div>
            
        ))}
    </div>
      
    </div>
  )
}

export default CategoryComponent
