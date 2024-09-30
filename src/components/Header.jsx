/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
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

const AppHeader = (props) => {
  const headerRef = useRef()
  const { headertext, paraText } = props
  const dispatch = useDispatch()
  const {id} = useParams();

  const user = useSelector(state => state.user);

  useEffect(()=>{
    console.log("====================================================>",user)
  }, [])
  
  

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

  // Function to check if the current route matches any of the defined routes
  const shouldRenderBox = routesWithBox.includes(location.pathname)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-0 p-0 px-5 py-3" style={{ border: "none" }} ref={headerRef}>
      <div>
        <CContainer fluid>
          <CHeaderToggler
            onClick={() => {
              dispatch(set({ sidebarShow: !sidebarShow }))
              console.log(sidebarShow)
            }}  // Dispatch the set action with payload
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
        </CContainer>
        <CContainer className="d-flex" fluid>
          <Typography sx={{ color: "#010120", fontWeight: "600", fontSize: "40px" }}>
            {headertext}
          </Typography>
        </CContainer>
        <CContainer className="d-flex" fluid>
          <Typography sx={{ color: "#878787", fontWeight: "400", fontSize: "17px" }}>
            {paraText}
          </Typography>
        </CContainer>
      </div>

      {/* Conditionally render the Box based on the current route */}
      {shouldRenderBox && (
        <Box
          sx={{
           width:{xs:"51px", md: "81px"},
           height:{xs:"51px", md: "81px"},
           borderRadius:"50%",
           
           mt:"10px",
          }}
          component="img"
          src={user.user.image}
        >
         
        </Box>
      )}
    </CHeader>
  )
}

export default AppHeader
