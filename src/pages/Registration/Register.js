import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Register.css"

const Register = () => {
  const navigate = useNavigate()

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
  const handelSubmit = (event)=>{
    event.preventDefault()
    console.log(formData)
  }
  return (
    <div className="register__page__whole__container">
    <div>

 
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
