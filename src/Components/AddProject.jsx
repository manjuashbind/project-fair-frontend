import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img1 from './images/img1.jpg'
import { addProjectAPI } from '../services/allAPIs';
import { addProjectResponseContext } from '../ContextAPI/ContextShare';



function AddProject() {
  //ContextAPI linking
  const {addProjectRes,setAddProjectRes}=useContext(addProjectResponseContext)
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //to hold token
    const [token,setToken]=useState("")

//to take token from session storage and give to setToken
useEffect(()=>{
if(sessionStorage.getItem("token")){
  setToken(sessionStorage.getItem("token"));
}
},[])

 //to hold project details
  const[projectDetails,setProjectDetails]=useState({
    title:"",language:"",github:"",link:"",overview:"",projectImage:""
  });
  console.log(projectDetails);
  
  //toholdimage url
  const[preview,setPreview]=useState("")
  console.log(preview);

  //function to add image on load
  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }

  },[projectDetails.projectImage])

//function to add project
const projectAdd=async()=>{
  const{title,language,github,link,overview,projectImage}=projectDetails
  if(!title || !language || !github || !link || !overview || !projectImage){
   alert("Enter All Details")
  }
  else{
    //api call
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("github",github)
    reqBody.append("link",link)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)

    const reqHeader={
      "Content-Type":"multipart/form-data", // to denote req contains a fileupload content(image)
      "Authorization":`Bearer ${token}`  // this is the syntax for sending token from frontend to backend
    }
    //API Call
    const result=await addProjectAPI(reqBody,reqHeader)
    console.log(result);

    if(result.status === 200){
      console.log(result.data); //successfull
      alert("Project Added Successfully")
      handleClose() //toclose modal automatically
      //Context acces the AddProject Data
      setAddProjectRes(result.data)
      //to empty all fields after entering inputs
      setProjectDetails({
        title:"",language:"",github:"",link:"",overview:"",projectImage:""
      })
      //to empty images field
      setPreview("")
    }
    else{
      alert(result.response.data)  //Project Already Exists
      console.log(result.response.data); //error msg
    
    }

  }

}
  return (
    <div>
        
        <>
      <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className='row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2'>
              <Col>
                
                <label >
                <input   type='file' onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} style={{display:'none'}}/>
                <img className='img-fluid' src={preview?preview:img1}   alt=""  />
                </label>

              </Col>

              <Col>
              <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} className='form-control mb-2' type="text" placeholder='Project Title' />
              <input value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})}  className='form-control mb-2' type="text" placeholder='Language' />
              <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}  className='form-control mb-2' type="text" placeholder='Github Link' />
              <input value={projectDetails.link} onChange={e=>setProjectDetails({...projectDetails,link:e.target.value})}  className='form-control mb-2' type="text" placeholder='Website Link' />
              <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}  className='form-control mb-2' type="text" placeholder='Project Description' />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center justify-content-xl-end'>
           <Button variant="primary" onClick={projectAdd}> Add </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  )
}

export default AddProject