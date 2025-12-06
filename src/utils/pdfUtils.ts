/**
 * PDF export utilities
 */

export const generatePdf = (elementId: string, filename: string): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Check if html2pdf is available on window
  const html2pdf = (window as any).html2pdf;
  if (!html2pdf) {
    alert("PDF generator is initializing. Please wait a moment.");
    return;
  }

  const opt = {
    margin: [0.5, 0.5],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};
