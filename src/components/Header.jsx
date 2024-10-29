/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Box } from '@mui/material'
import {
  CContainer,
  CHeader,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import { set } from '../sidebarSlice'  // Import your slice's set action
import { useLocation } from 'react-router-dom'  // Import useLocation for accessing the current path
import { useParams } from 'react-router-dom'
import EditIcon from '../assets/Edit.png'

import ChangeProfileImageModal from "../components/ChangeProfileImageModal/ChangeProfileImageModal";
import CustomButton from "../components//CustomButton/CustomButton";
const AppHeader = (props) => {
  const headerRef = useRef()
  const { headertext, paraText } = props
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false); // Modal state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {id} = useParams();

  const user = useSelector(state => state.user); 
  
 

  
  

  // Accessing the 'sidebar' state from your store
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)

  // Access the current route path
  const location = useLocation()

  // List of routes where you want to conditionally render the red Box
  const routesWithBox = [
    `/dashboard`,
    `/dashboard/profile`,
    `/dashboard/profile/edit-profile`,
    `/dashboard/my-leaves/new-leave`,
    `/dashboard/remote-work/new-wfh-request`,
    `/dashboard/remote-work/edit-wfh-request/${id}`,
    `/dashboard/remote-work/wfh-detail/${id}`,
    `/dashboard/my-leaves/my-leave-detail/${id}`,
    `/dashboard/my-leaves/edit-leave/${id}`,
  ]


  const shouldRenderBox = routesWithBox.includes(location.pathname)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-0 p-0 px-4 py-5" style={{ border: "none" }} ref={headerRef}>
      <div>
        <CContainer fluid>
          <Box
          sx={{
            display:{lg:"none", xs:"block"}
          }}
          >

          <CHeaderToggler
            onClick={() => {
              dispatch(set({ sidebarShow: !sidebarShow }))
              console.log(sidebarShow)
            }}  // Dispatch the set action with payload
            style={{ marginInlineStart: '-2px' }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          </Box>

        </CContainer>
        <CContainer className="d-flex" fluid>
          <Typography sx={{ color: "#010120", fontWeight: "600", fontSize: {xl:"40px", xs:"30px", padding:"0px 8px"} }}>
            {headertext}
          </Typography>
        </CContainer>
        <CContainer className="d-flex" fluid>
          <Typography sx={{ color: "#878787", fontWeight: "400", fontSize: "17px", padding:"0px 10px" }}>
            {paraText}
          </Typography>
        </CContainer>
      </div>

      {/* Conditionally render the Box based on the current route */}
      {shouldRenderBox && (
        <Box
        sx={{
          
          position:"relative"
        }}
        >
        <Box
          sx={{
           width:{xs:"51px", xl: "81px"},
           height:{xs:"51px", xl: "81px"},
           borderRadius:"50%",
           objectFit:"cover",
           mr:"20px",
           mt:"10px",
          }}
          component="img"
          src={user.user.image}
        >
        </Box>
        {
          location.pathname.includes("/dashboard/profile") && (
          <Box
          sx={{
            height:"25px",
            width:"25px",
            position:"absolute",
           borderRadius:"50%",

            bottom:"-10px",
            left: "50%", // This centers the left edge horizontally
            transform: "translateX(-50%)", 
            backgroundColor:"rgba(21, 122, 255, 1)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            cursor:"pointer",
            ":hover":{
            backgroundColor:"rgba(21, 122, 255, .8)",
              transition:".2s ease-in"
            }
          }}
          
          >
              <img src={EditIcon} onClick={handleOpen} style={{width:"11.54px", height:"11.54px"}} alt="" />
          </Box>

          )
        }   
         <ChangeProfileImageModal open={open} handleClose={handleClose} />

        </Box>

)}
    </CHeader>
  )
}

export default AppHeader
