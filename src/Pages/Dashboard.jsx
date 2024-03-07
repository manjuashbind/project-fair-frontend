import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import MyProject from '../Components/MyProject';
import MyProfile from '../Components/MyProfile';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';


function Dashboard() {
  const existingUser=JSON.parse(sessionStorage.getItem('existingUser'))
  console.log(existingUser);
  return (
    <div>
      <Header/>
      <Container fluid className='py-5 px-1 px-sm-1 px-md-1 px-lg-3 px-xl-5 px-xxl-5'>
        
        <Row className='d-flex flex-column-reverse flex-sm-column-reverse flex-md-column-reverse  flex-lg-row flex-xl-row  '>
          <Col className='mt-3'>
          {/* My projects */}
          <h1 className='text-secondary'>Welcome <span>{existingUser.username}..</span></h1>
          <MyProject/>
          </Col>
          <Col className='mt-3 col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4'>
          {/* My Profile */}
          <MyProfile user={existingUser}/>
          </Col>
        </Row>
        {/* view allproject */}
        <Link to={'/project'} >
          <div className=' mx-auto text-center my-5'>
          <Button className='text-dark fw-bold btn btn-lg' variant="info">View All Projects</Button>
          </div>
          </Link>

      </Container>
    </div>
  )
}

export default Dashboard