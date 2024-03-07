import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddProject from './AddProject'
import { deleteProjectAPI, getUserProjectsAPI } from '../services/allAPIs'
import { addProjectResponseContext, editUserProjectResponseContext } from '../ContextAPI/ContextShare';
import EditProject from './EditProject';


//React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyProject() {

  //context APIfor add
  const { addProjectRes, setAddProjectRes } = useContext(addProjectResponseContext)

  //contextAPi for editproject
  const { editUserProjectRes, setEditUserProjectRes } = useContext(editUserProjectResponseContext)

  const [userProjects, setUserProjects] = useState([])

  //function to get all projects of logged in user
  const allUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    console.log(token);

    if (token) {

      const reqHeader = {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`,
      };

      try {

        const result = await getUserProjectsAPI(reqHeader)
        console.log(result);
        if (result.status === 200) {
          setUserProjects(result.data)
          console.log(userProjects);
        }
        else {
          alert("Failed to retrieve Project")
        }
      }
      catch (error) {
        console.log("Error fetching projects: ", error);
        alert("Failed to retrieve project")
      }

    }


  }
  useEffect(() => {
    allUserProjects()
  }, [addProjectRes, editUserProjectRes])

  const deleteProject = async (pid) => {

    const token = sessionStorage.getItem("token")
    console.log(token);

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
      try {
        const result = await deleteProjectAPI(pid, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.error("Project deleted successfully")
          //alert("Project Deleted Successfully")
          //to display rest of the projects after deleting
          allUserProjects()
        }
      }
      catch (err) {
        console.log("Cannot Delete Project");
        alert("Failed to delete Project")
      }


    }
  }


  return (
    <div>
      <Container>
        <Row>
          <Col >
            <div className='d-flex justify-content-between flex-column-reverse flex-sm-column-reverse flex-md-column-reverse flex-lg-row flex-xl-row flex-xxl-row my-3 '>
              <h3 className='fs-3 text-primary fw-bold my-2'>My Projects</h3>
              <div className='my-2'>
                <AddProject />

              </div>
            </div>
            {/* display all user projects */}

            <Row className='row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 row-cols-xxl-1'>
              {userProjects.length > 0 ?

                (
                  userProjects.map((item, index) => (

                    <Col key={index}>
                      {/* <div className='d-flex justify-content-between p-2 border border-dark'> */}

                      <div className='d-flex flex-row justify-content-between border border-2 p-1'>
                        <h5 className='text-black'>{item.title}</h5>
                        <div>
                          <button className='btn text-info me-2'>  <EditProject project={item} /> </button>
                          <a href={item?.github} target="_blank" className='me-2'><button className='btn btn-info'><i class="fa-brands fa-github"></i></button></a>
                          <button className='btn btn-danger   me-2' onClick={() => deleteProject(item?._id)}><i class="fa-solid fa-trash"></i></button>
                        </div>
                      </div>
                      {/* </div> */}
                    </Col>
                  ))
                )
                :
                (
                  <div className='text-center'>No projects found</div>
                )
              }
            </Row>
          </Col>
        </Row>
      </Container>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </div>
  )
}

export default MyProject
