/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@mui/material'
import {
  CContainer,
  CHeader,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import { set } from '../sidebarSlice'  // Import your slice's set action

const AppHeader = (props) => {
  const headerRef = useRef()
  const {headertext, paraText} = props
  const dispatch = useDispatch()
  
  // Accessing the 'sidebar' state from your store
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow) 

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0 px-5" style={{border:"none"}} ref={headerRef}>
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
    </CHeader>
  )
}

export default AppHeader
