import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import "./Register.css"

const Register = () => {
  const navigate = useNavigate()
  const [loginModal, setLoginModal] = useState(false)
  const [AfterRegisterData, setAfterRegisterData] = useState(null)

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    phone:""
  })

  const handelchange = (e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>({
      ...prev, [name]:value
    }))
  }
  console.log(process.env.REACT_APP_BACKEND_URL)
  const handelSubmit = async(event)=>{
    event.preventDefault()
    try {
      
      const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`, formData)

    if(data && data.success)
    {
      console.log("successfully get the data")
      console.log(data)
      setAfterRegisterData(data)
      setLoginModal(true)
    }
    } catch (error) {
      
    }
 
  }
  return (
    <div className="register__page__whole__container">
    <div>
    {loginModal &&
    
    <Modal
      header={<div className="login__page__modal__header">GO to Login Page</div>}
      body={<div className="login__page__modal__body"><span>{AfterRegisterData.message},</span><span> Login in now to use our app</span></div>}
      footer={<div className="login__page__modal__footer"><button onClick={()=> navigate("/login")}>Login Now</button></div>}
    />
    }

 
      <div className="register__page__header">Register</div>
      <form className="register__form" onSubmit={handelSubmit}>
          <div className="form__ele">
              <label>Name</label>
              <input name="name" onChange={handelchange} value={formData.name}/>
          </div>
          <div className="form__ele">
              <label>Email</label>
              <input name="email" onChange={handelchange} value={formData.email}/>
          </div>
          <div className="form__ele">
              <label>Phone No.</label>
              <input name="phone" onChange={handelchange} value={formData.phone}/>
          </div>
          <div className="form__ele">
              <label>Password</label>
              <input name="password" onChange={handelchange} value={formData.password}/>
          </div>
          <div className="button__container">

          <button type="submit" className="btn__design register__btn">Register</button>
          </div>
      </form>
      </div>
      <div className="open__login__page">
      <span>Already Register, Login Now</span>
      <button className="btn__design" onClick={()=> navigate("/login")}>Log In</button>

      </div>
    </div>
  )
}

export default Register
