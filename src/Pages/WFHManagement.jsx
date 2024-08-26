import React from 'react'
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Tabs, Tab, Paper } from '@mui/material';
import { useEffect, useState } from "react";

const WFHManagement = () => {
    const {setHeadertext , setParaText} = useOutletContext();
  useEffect(() => {
    setHeadertext("WFH Management");
    setParaText(" ")
  })
    return (
    <div>WFHManagement</div>
  )
}

export default WFHManagement