import React from 'react';
import { CCard, CCardBody, CCardTitle, CButton } from "@coreui/react";


export const LoggedCards = () => {
    return (
        <div key={ind}>
            <CCard style={{ width: '18rem', height: '100%' }}>
                <CCardBody style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <CCardTitle style={{ fontSize: "16px", color: "black", fontWeight: "500", letterSpacing: "1px" }}>
                            title is here
                        </CCardTitle>
                        
                    </div>
                    <div>
                        <CButton  color="primary">button</CButton>
                    </div>
                </CCardBody>
            </CCard>
        </div>
    );
};

    