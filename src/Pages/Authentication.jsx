import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Form, Link, useNavigate } from 'react-router-dom';
import login from '../Components/images/login.gif'
import { loginAPI, registerAPI } from '../services/allAPIs';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

function Authentication({ register }) {

  const isRegisterForm = register ? true : false
  const location = useNavigate()

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    github:"",
    link:""
  })
  console.log(userData);

  //register data function
  const registerData = async () => {

    const { username, email, password,github,link } = userData

    if (!username || !email || !password || !github  || !link) {

      alert("Please Enter valid details")
    }
    else {
      //api call
      const result = await registerAPI(userData)

      if (result.status == 200) {
        alert(result.data); //user registration success
        location('/login')

      }
      else {
        alert(result.response.data)//use already registered
      }
    }


  }

  //login function
  const loginData = async () => {
    const { email, password } = userData
    if (!email || !password) {
      alert("please enter all fields")
    }
    else {
      const result = await loginAPI(userData)
      console.log(result);
      if (result.status == 200) {
        alert("Login Successfull")
        //set user object into session storage
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        location('/dashboard')
      }
      else {
        alert("Please Enter Valid details")
      }
    }
  }
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <div>
      {/* =============================== */}
      {/* Header */}
      {/* header */}
      <MDBNavbar expand='lg' bgColor='success' className=''>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'><i class="fa-solid fa-laptop"></i> Project Fair</MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenBasic(!openBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className='mr-auto mb-2 d-flex mb-lg-0 me-4 justify-content-end '>

              <Link to={'/'}><MDBNavbarItem >
              <MDBNavbarLink  active aria-current='page' href='#'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem></Link>

            </MDBNavbarNav>

           
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>




      {/* ============================== */}

      <Container className='my-3'>
        <Row className='row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2'>

          <Col>
            <img className='img-fluid' style={{ height: '30rem' }} src={login} alt="" />
          </Col>

          <Col className='d-flex flex-column align-item-center justify-content-center text-center  '>
            <h3>Project Fair</h3>
            <h5 className='text-danger'>  {isRegisterForm ? 'Register Here' : "Login Here"}  </h5><br />
            <form>
              {
                isRegisterForm && //truthy operator 
                <>
                <input type="text" value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} placeholder='Enter Name' className='form-control mb-3' />
                <input type="text" value={userData.github} onChange={e => setUserData({ ...userData, github: e.target.value })} placeholder='github link' className='form-control mb-3' />
                <input type="text" value={userData.link} onChange={e => setUserData({ ...userData, link: e.target.value })} placeholder='Linkedin link' className='form-control mb-3' />
                </>
              }

              <input type="text" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder='Enter Email' className='form-control mb-3' />
              <input type="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} placeholder='Enter Password' className='form-control mb-3' />

            </form>
            {
              isRegisterForm ?
                <div>
                  <button onClick={registerData} className='btn btn-primary'>   Register       </button><br /><br />
                  <Link to={'/login'} className='text-decoration-none'><span className='text-danger'>Already registered ? login here</span></Link>
                </div>
                :
                <div>
                  <button onClick={loginData} className='btn btn-primary'> Login    </button><br /><br />
                  <Link to={'/register'} className='text-decoration-none'> <span className='text-danger'>New to Here ? Register here</span> </Link>
                </div>
            }

          </Col>
        </Row>



        <Row>
          <Col>
            <div className='text-center text-dark'>
              <Link to={'/'}> <Button variant="success " className='btn btn-success text-dark'><i class="fa-solid fa-left-long"></i> Go to Home</Button></Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Authentication