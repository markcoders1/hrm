import React from 'react'
import { CCard, CCardBody, CCardTitle, CCardText, CButton } from "@coreui/react";

export const LoggedCards = () => {

    

    return (
        <div >

            <CCard style={{ width: '18rem' }}>
                <CCardBody>
                    <CCardTitle >Special title treatment</CCardTitle>
                    <CCardText>With supporting text below as a natural lead-in to additional content.</CCardText>
                    <CButton color="primary">Go somewhere</CButton>
                </CCardBody>
            </CCard>
        </div>
    )
}
