// components/GeneratePDF.js
import React from 'react';
import html2pdf from 'html2pdf.js';

const GeneratePDF = () => {
/**
 * Generates a PDF document from the content of an HTML element with the ID 'content'.
 * 
 * This function retrieves the specified HTML element and uses the html2pdf library
 * to convert it into a PDF file. The PDF is configured with specified options such
 * as margin, filename, image quality, and document format. If successful, the PDF
 * will be saved to the user's device. Logs an error message to the console if the
 * content element is not found or if an error occurs during PDF generation.
 */
    const handlePrint = async () => {
        try {
            const element = document.getElementById('content');
            if (!element) {
                throw new Error("Content element not found");
            }

            const opt = {
                margin: 1,
                filename: 'document.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Generate PDF
            await html2pdf().from(element).set(opt).save();
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div>
            <div id="content" style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                <h1>Hello, World!</h1>
                <p>This is a PDF generated from HTML content.</p>
            </div>
            <button onClick={handlePrint}>Generate PDF</button>
        </div>
    );
};

export default GeneratePDF;