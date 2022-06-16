import React from "react";
import ReactExport from "react-export-excel";
import { Button } from "antd";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Export({ exportData }) {
  // console.log("this is the export data", exportData);
  return (
    <ExcelFile element={<Button> Export </Button>}>
      <ExcelSheet data={exportData} name="Reports">
        <ExcelColumn label="Date" value="service_date" />
        <ExcelColumn label="Booking No." value="bookingno" />
        <ExcelColumn label="Service Name :" value="servicename" />
        <ExcelColumn label="Customer Name" value="name" />
        <ExcelColumn label="Salon Service Price" value="saloonservice_price" />
        <ExcelColumn label="Saloon Service VAT" value="saloonservice_vat" />
        <ExcelColumn label="Admin Commission" value="admin_commision" />
        <ExcelColumn label="Admin VAT" value="admin_vat" />
        <ExcelColumn label="Service Total Price" value="service_total_price" />
        <ExcelColumn label="Total VAT" value="total_vat" />
        <ExcelColumn label="Total Amount" value="total_amount" />
      </ExcelSheet>
    </ExcelFile>
  );
}
