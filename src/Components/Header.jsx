import React, { useState } from 'react'
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
import { useNavigate } from 'react-router-dom';


function Header() {
  const [openBasic, setOpenBasic] = useState(false);
  const location = useNavigate()
  const logout = () => {
    sessionStorage.clear();
    location('/')
  }

  return (
    <div>

      <MDBNavbar expand='lg' bgColor='success' className=''>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#' className='fs-4' ><i class="fa-solid fa-laptop"></i> <span className='mx-2'>Project Fair</span> </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenBasic(!openBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 d-flex justify-content-end me-3'>
            
            <button className='btn btn-dark' onClick={logout}> <span className='me-2 '>Logout </span> <i class="fa-solid fa-right-from-bracket"></i></button>

            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

    </div>
  )
}

export default Header