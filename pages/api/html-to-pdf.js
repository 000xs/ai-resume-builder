// Import Chromium and Puppeteer
const chromium = require("@sparticuz/chromium-min");
const puppeteer = require("puppeteer-core");

async function getBrowser() {
    return puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: "path/to/local/chromium", // replace with actual local path
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    });
  }

export default async function handler(req, res) {
if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
}

const { html } = req.body;
if (!html) {
    return res.status(400).json({ error: 'HTML content is required' });
}

try {
    const browser =  getBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" }
    });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');
    res.send(pdfBuffer);
} catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
}
}
