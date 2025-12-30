import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId: string, fileName: string = 'curriculo.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Elemento não encontrado');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 4, // Higher scale for better quality (High Definition)
      useCORS: true, // Handle images from external sources
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    const imgProps = canvas.width / canvas.height;
    const pdfImgHeight = pdfWidth / imgProps;

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfImgHeight);
    
    // Handle multi-page (basic implementation, cuts off if too long, usually resumes are 1 page)
    if (pdfImgHeight > pdfHeight) {
        // Advanced multi-page logic would go here
    }

    pdf.save(fileName);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
};