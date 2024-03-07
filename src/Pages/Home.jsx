import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import img1 from '../Components/images/img1.jpg'
import ProjectCards from '../Components/ProjectCards';
import { Link } from 'react-router-dom'
import { getHomeProjectAPI } from '../services/allAPIs';
import './Home.css'

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


function Home() {
  //to hold home projects details 3 nos
  const [homeProject, setHomeProject] = useState({})

  //API Call to get home project details from the mongo db
  const getHomeProject = async () => {
    const result = await getHomeProjectAPI() //function  from allAPIs.js also import it in the front
    console.log(result);
    if (result.status == 200) {
      setHomeProject(result.data)
    }
    else {
      console.log(homeProject);
    }
  }
  useEffect(() => {
    getHomeProject()
  }, [])
  console.log(homeProject);
  // for header
  const [openBasic, setOpenBasic] = useState(false);
  return (
    <div>
      {/* header */}
      <MDBNavbar expand='lg' bgColor='success' className=''>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'><i class="fa-solid fa-laptop"></i><span className='ms-2'>Project Fair</span> </MDBNavbarBrand>

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

              <Link to={'/'}><MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='#'>
                  <i class="fa-solid fa-house"></i>
                </MDBNavbarLink>
              </MDBNavbarItem></Link>

              <Link to={'/login'}><MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='#'>
                  <i class="fa-solid fa-right-to-bracket"></i>
                </MDBNavbarLink>
              </MDBNavbarItem></Link>

              <Link to={'/register'}>  <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='#'>
                  Signup
                </MDBNavbarLink>
              </MDBNavbarItem></Link>


            </MDBNavbarNav>


          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>


      <Container>
        <Row className='my-3 py-3 text-start row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 d-flex flex-column-reverse flex-lg-row flex-xl-row flex-xxl-row'>
          <Col>
            <h1 className='py-3 fw-bold display-3'>Welcome to Project Fair</h1>
            <h3 className='text-success text-shadow'>Your Complete Project Management Solution</h3>
            <p className='text-start text-dark py-2'>Are you tired of juggling multiple tools and spreadsheets to manage your projects effectively? Look no further! Project-Fair is your all-in-one project management solution designed to streamline your workflow and empower you to achieve project success with ease.     </p>
            <Link to={'/login'}><Button variant="dark">Get Started</Button></Link>
          </Col>
          <Col className='d-flex align-items-center'>
            <img className='img-fluid' src={img1} alt="" />
          </Col>
        </Row>


        <Row className='my-5 py-5 bg-dark-subtle '>
          <h1 className='text-black text-center'>Explore Our Projects</h1>
          <Col>
            <marquee behavior="" direction=""  >
              <Row className='py-4'>
                {
                  homeProject.length > 0 ? homeProject.map(item => (

                    <Col>
                      <ProjectCards project={item} />
                    </Col>


                  )) : "empty"
                }

              </Row>
            </marquee>
          </Col>
        </Row>

        <Row  className='my-5 py-2'>
          <Col className='p-3'>
            <h3 className='text-center text-danger fw-bold my-2'>Key Features:</h3><br />
            <p className='text-black'>1) <span className='text-danger'> Add Projects : </span> Start by creating projects effortlessly. Define project details, set deadlines, and assign team members in just a few clicks.</p>
            <p className='text-black'>2) <span className='text-danger'>View Projects : </span>  Access all your projects in one centralized dashboard. Stay organized and gain visibility into project statuses, timelines, and milestones at a glance.</p>
            <p className='text-black'>3) <span className='text-danger'>Edit Projects : </span>  Need to make changes to your projects? No problem! Edit project details, update task assignments, and modify details.</p>
            <p className='text-black'>4) <span className='text-danger'>Delete Projects : </span>  Say goodbye to clutter! Remove outdated or completed projects from your dashboard with the click of a button. Keep your workspace clean and focused on what matters most.</p>
          </Col>
        </Row>

      </Container>


    </div>
  )
}

export default Home