import React, {  useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


import ProjectCards from '../Components/ProjectCards';
import { getAllProjectAPI } from '../services/allAPIs';
import Header from '../Components/Header';


function Project() {
//to hold search value from the input tag
const [searchKey,setSearchKey]=useState("")
console.log(searchKey);

// edit function context API

  const [allProject,setAllProject]=useState([])
  const allProjects=async()=>{
    const token=sessionStorage.getItem("token")
    console.log(token);
    if(token){
    
      
      const reqHeader={
        'Content-Type':'multipart/form-data',
        "Authorization":`Bearer ${token}`,
      };
          try{

            const result= await getAllProjectAPI(searchKey,reqHeader)
          console.log(result);
          if(result.status === 200){
            setAllProject(result.data)
            console.log(allProject);
          }
          else{
            alert("Failed to retrieve Project")
          }
          }
          catch(error){
            console.log("Error fetching projects: ",error);
            alert("Failed to retrieve project")
          }     
  
    }
    
   
  }
  useEffect(()=>{
    allProjects()
  },[searchKey]) //it should be called everytime search key changes
  return (
    
   
    <div>
      <Header/>

      <Container className='py-3'>
        <h1 className='my-3 text-center '>All Projects</h1>
        <Row className='py-3 my-3'>
          <Col>
              <Form className="d-flex">
                <Form.Control onChange={e=>setSearchKey(e.target.value)}
                  type="search"  placeholder="Search by technology"   className="me-2"   aria-label="Search"  /> 
                <Button  variant="outline-success">Search</Button>
              </Form>
          </Col>
        </Row>

        <Row className='row-cols-1 row-cols-sm-1 row-cols-md-1row-cols-lg-3 row-cols-xl-3 row-cols-xxl-4 mb-5 mt-3' > 
          {
            allProject.length >  0 ?(
              allProject.map((item,index)=>(
                <Col key={index} className='mt-3'>
                <ProjectCards project={item}/>
                </Col>

              ))
            ):(
              <div className='text-center'>No projects found</div>
            )
             
          }
          
        </Row>

        <div className='d-flex justify-content-center my-5'>
        <Link to={'/dashboard'}> <button className='btn btn-danger'> <i class="fa-solid fa-left-long"></i> Back to Dashboard</button></Link>   
        </div>
   
      </Container>
    </div>
  )
}

export default Project