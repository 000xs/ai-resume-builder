 
import { GenerateDoc } from '@/utils/create_pdf';
import{ Document, Packer, Paragraph, TextRun, ImageRun } from 'docx';
 
import { Readable } from "stream";
 
 

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      // Extract jsonData directly from req.body
      const jsonData = req.body; // Assuming the entire body is the resume data

      // Log the received data for debugging
      console.log("Received resume data:", jsonData);

      // Check if personalData exists
      if (!jsonData || !jsonData.personalData) {
        return res.status(400).json({ error: "Invalid resume data" });
      }

      try {
         
        const pdfStream = GenerateDoc(); 
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="resume.pdf"`
        );
        pdfStream.pipe(res);
      } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Failed to generate resume PDF" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
