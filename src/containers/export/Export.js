import React from "react";
import ReactExport from "react-export-excel";
import { Button } from "antd";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Export({ exportData }) {
  return (
    <ExcelFile element={<Button> Export </Button>}>
      <ExcelSheet data={exportData} name="Vendor Reports">
        <ExcelColumn label="Date" value="service_date" />
        <ExcelColumn label="Booking No  " value="bookingno" />
        <ExcelColumn label="Service Name" value="servicename" />
        <ExcelColumn label="Customer Name" value="name" />
        <ExcelColumn label="Service Price" value="service_price" />
        <ExcelColumn label="VAT" value="vat" />
        <ExcelColumn label="Total Amount" value="total_amount" />
      </ExcelSheet>
    </ExcelFile>
  );
}
