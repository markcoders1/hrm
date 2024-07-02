import React from 'react';
import { CCard, CCardBody, CCardTitle, CButton } from "@coreui/react";


export const LoggedCards = ({ deviceId, buttonText, logoutFrom, ind }) => {
    return (
        <div key={ind}>
            <CCard style={{ width: '18rem', height: '100%' }}>
                <CCardBody style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <CCardTitle style={{ fontSize: "16px", color: "black", fontWeight: "500", letterSpacing: "1px" }}>
                            {deviceId}
                        </CCardTitle>
                    </div>
                    <div>
                        <CButton onClick={logoutFrom} color="primary">{buttonText}</CButton>
                    </div>
                </CCardBody>
            </CCard>
        </div>
    );
};

    