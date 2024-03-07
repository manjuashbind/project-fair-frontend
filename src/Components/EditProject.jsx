import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img1 from './images/img1.jpg'
import { baseUrl} from '../services/baseUrl';
import { editUserProject } from '../services/allAPIs';
import { editUserProjectResponseContext } from '../ContextAPI/ContextShare';


function EditProject({project}) {
  //context api
  const{editUserProjectRes,setEditUserProjectRes}=useContext(editUserProjectResponseContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //to hold token
    const [token,setToken]=useState("")

//to hold project details
const[projectDetails,setProjectDetails]=useState({
   id:project._id, title:project.title,language:project.language,github:project.github,link:project.link,overview:project.overview,projectImage:""
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

 
    //projectupdate
   const updateProject=async()=>{
    const {id,title,language,github,link,overview,projectImage}=projectDetails
    
    
            //api call
            const reqBody=new FormData()
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("link",link)
            reqBody.append("overview",overview)
            preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
           
            const token=sessionStorage.getItem("token")
            console.log(token);
          
            if(token){
                  const reqHeader={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                  }

                  //apicall to edit
                  const result= await editUserProject(id,reqBody,reqHeader)
                  console.log(result);   

                  if(result.status == 200){
                    // setProjectDetails(result.data)
                    setEditUserProjectRes(result.data)
                    console.log(result.data);
                    alert("Project Details Updated Successfully")
                    handleClose()


                  }
                  else{
                      console.log(result.response.data); //error msg
                  }
                }

                 
      }
  
  
  
  return (
    <div>
         <>
         <button className='btn btn-primary fs-6' onClick={handleShow}> <i class="fa-solid fa-pen-to-square"></i></button>
     

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className='row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2'>
              <Col>
                
                <label >
                <input   type='file' onChange={e=> setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} style={{display:'none'}}/>
                {/* another way of input image giving
                 <input   type='file' onChange={e=> 
                  { if(e.target.files && e.target.files[0]){
                    setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}}
                  }
                     style={{display:'none'}}/> */}
                <img className='img-fluid' src={preview?preview:`${baseUrl}/uploads/${project.projectImage}`}   alt=""  />
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
        <Modal.Footer className='d-flex justify-content-center justify-content-xl-end '>
           <Button variant="primary" onClick={updateProject}> Update </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  )
}

export default EditProject