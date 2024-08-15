import { getCookies } from "next-client-cookies/server";
import jsPDF from 'jspdf';

export const getCookesValue=()=>{
    return getCookies();
}


 export const generatePDF = (content: string, filename: string = 'document.pdf') => {
  if(content=="" || !content){
    return
  }
  const doc = new jsPDF();
  doc.text(content, 10, 10);
  doc.save(filename);
};