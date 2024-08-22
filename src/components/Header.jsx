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
import {cilMenu} from '@coreui/icons'

const AppHeader = (props) => {
  const headerRef = useRef()
  const {headertext, paraText} =props
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0 px-5" ref={headerRef}>
      <div>
        <CContainer className="" fluid>
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
        </CContainer>
        <CContainer className=" d-flex d-flex" fluid>
          <Typography
          sx={{color:"#010120" , fontWeight:"600", fontSize:"40px"}}
          >{headertext}</Typography>
        </CContainer>
        <CContainer className=" d-flex d-flex" fluid>
          <Typography
          sx={{color:"#878787" , fontWeight:"400", fontSize:"17px"}}
          >{paraText}</Typography>
        </CContainer>

      </div>
    </CHeader>
  )
}

export default AppHeader
