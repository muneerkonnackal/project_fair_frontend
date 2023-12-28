import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cardimg from '../assets/loginimg.webp'
import { Form } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../services/allAPI'

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../Contexts/ContextShare'

function Auth({register}) {
    const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)

    const [userData , setUserData]=useState({
        //to hold the value from the input box
        username:"",
        email:"",
        password:""
    })
    console.log(userData);

    const navigate = useNavigate()

        const registerForm = register?true:false


        //register function
        const handleRegister =async (e)=>{
            e.preventDefault()

            const {username, email, password} = userData

            if(!username || !email || !password){
                toast.info("Please fill the form completely")
            }
            else{
               const result = await registerAPI(userData)
            //    console.log(result.data);
            if(result.status === 200){
                toast.success(`${result.data.username} is successfully registered`)

                setUserData({
                username:"",
                email:"",
                password:""
                })
                //move to login page 
                navigate('/login')
            }
            else{
                toast.error(result.response.data)
            }
            }
        }

        //login  function 
        const handleLogin =async (e)=>{
            e.preventDefault()

            //destructure
            const {email,password} = userData
            if(!email||!password){
                alert("Please fill the form completely")
            }
            else{
                const result = await loginAPI(userData)
                console.log(result);

                if(result.status===200){
                    alert("Login Successful")
                    setIsAuthToken(true)
                    sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                    sessionStorage.setItem("token",result.data.token)

                    setUserData({
                        username:"",
                         email:"",
                         password:""
                    })
                    

                    //*navigate to home
                    setTimeout(()=>{
                        navigate('/')
                    },2000)
                   

                }
                else{
                    alert(result.response.data)
                }
            }
        }

  return (
    <>
    
    <div style={{width:"100%",height:'100vh'}} className=' d-flex justify-content-center   align-items-center'>
        <div className='w-75 container '>
            <Link style={{textDecoration:"none",color:'blue'}} to={'/'}><i class="fa-solid fa-arrow-left me-3"></i>Back to Home</Link>
            <div className=' card bg-success rounded p-5'>

            <div className=' row  align-item-center'>
                <div className="col-lg-6">
                    <img src={cardimg} alt="" width={'100%'}/>
                </div>
                <div className="col-lg-6 p-5">
                    <div className='d-flex align-items-center flex-column fa-2x'>
                        <h1 className='text-black'><i class="fa-solid fa-spinner  me-2"></i> Project Fair</h1>
                        <h5 className='text-light mt-3 ms-5'>
                            {
                                registerForm? "Sign up to your account"  : "Sign In to your account" 
                            }
                        </h5>
                        <Form className='mt-5 w-100'>
                            {
                                registerForm &&
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text"   placeholder="Username" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
                                
                              </Form.Group>
                            }

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email ID" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} />
                                
                              </Form.Group>


                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="Password" placeholder="Password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} />
                                
                              </Form.Group>

                              {
                                registerForm?
                                <div>
                                    <button onClick={handleRegister} className='btn btn-warning round  '>Register</button>
                                    <h6 className='mt-3 text-black'>Already a user? Click here to <Link to={'/login'} style={{color:"Blue"}}>Login</Link></h6>
                                </div> :
                                 <div>
                                 <button onClick={handleLogin} className='btn btn-warning round '>Login</button>
                                 <h6 className='mt-3 text-black'>New user? Click here to <Link to={'/register'} style={{color:"Blue"}}>Register</Link></h6>
                             </div>

                              }

                        </Form>
                    </div>

                </div>
            </div>
                
         </div>
        
        </div>
        <ToastContainer  position="top-center" autoClose={2000}  />
    </div>
   
    </>
    
  )
}

export default Auth