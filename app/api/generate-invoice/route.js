// /app/api/generate-invoice/route.js

import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// Force the route to run on the Node.js runtime.
// This is crucial for libraries like pdf-lib that rely on Node.js APIs.
export const runtime = "nodejs";

/**
 * This is the Route Handler for POST requests to generate an invoice.
 * It expects a JSON body with `productName` and `price`.
 * Example request body:
 * {
 * "productName": "Premium Leather Bag",
 * "price": 1250.00
 * }
 */
export async function POST(req) {
  try {
    // 1. Extract product details from the request body.
    const { productName, price } = await req.json();

    // Basic validation to ensure required fields are present.
    if (!productName || typeof price !== "number") {
      return NextResponse.json(
        { error: "Product name and a valid price are required." },
        { status: 400 }
      );
    }

    // 2. Generate dynamic invoice details.
    const orderDetails = {
      orderId: `INV-${Date.now()}`, // Generate a unique invoice ID
      orderDate: new Date().toISOString(),
      customer: {
        name: "Valued Customer", // Generic customer name
        address: "Billing address not provided",
      },
      items: [
        {
          id: 1,
          description: productName,
          quantity: 1,
          price: price,
        },
      ],
      taxRate: 0.18, // 18% GST
    };

    // 3. Create a new PDF Document.
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 paper size
    const { width, height } = page.getSize();

    // 4. Embed standard fonts.
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    // Helper function for drawing text on the page.
    const drawText = (text, options) => {
      page.drawText(text, {
        font: helveticaFont,
        color: rgb(0.1, 0.1, 0.1),
        ...options,
      });
    };

    // --- Invoice Header ---
    drawText("INVOICE", {
      x: 50,
      y: height - 60,
      font: helveticaBoldFont,
      size: 28,
    });
    drawText("Your Company Name", {
      x: 50,
      y: height - 90,
      font: helveticaBoldFont,
      size: 14,
    });
    drawText("123 Commerce Street, Seeloo, Rajasthan", {
      x: 50,
      y: height - 105,
      size: 10,
    });
    drawText("your-email@example.com", { x: 50, y: height - 120, size: 10 });

    // --- Invoice Details (Right Aligned) ---
    const rightAlignX = width - 200;
    drawText("Invoice #:", {
      x: rightAlignX,
      y: height - 90,
      font: helveticaBoldFont,
      size: 12,
    });
    drawText(orderDetails.orderId, {
      x: rightAlignX + 70,
      y: height - 90,
      size: 12,
    });

    drawText("Date:", {
      x: rightAlignX,
      y: height - 105,
      font: helveticaBoldFont,
      size: 12,
    });
    drawText(new Date(orderDetails.orderDate).toLocaleDateString("en-IN"), {
      x: rightAlignX + 70,
      y: height - 105,
      size: 12,
    });

    // --- Bill To Section ---
    drawText("BILL TO:", {
      x: 50,
      y: height - 160,
      font: helveticaBoldFont,
      size: 12,
    });
    drawText(orderDetails.customer.name, { x: 50, y: height - 175, size: 10 });

    // --- Items Table ---
    const tableTop = height - 230;
    page.drawLine({
      start: { x: 50, y: tableTop },
      end: { x: width - 50, y: tableTop },
      thickness: 1.5,
      color: rgb(0, 0, 0),
    });

    const tableHeaders = [
      { text: "Description", x: 55 },
      { text: "Qty", x: 370 },
      { text: "Unit Price", x: 420 },
      { text: "Total", x: 500 },
    ];
    tableHeaders.forEach((header) => {
      drawText(header.text, {
        x: header.x,
        y: tableTop - 15,
        font: helveticaBoldFont,
        size: 10,
      });
    });

    page.drawLine({
      start: { x: 50, y: tableTop - 25 },
      end: { x: width - 50, y: tableTop - 25 },
      thickness: 0.5,
      color: rgb(0.5, 0.5, 0.5),
    });

    // --- Table Row for the Product ---
    const item = orderDetails.items[0];
    const itemY = tableTop - 40;
    drawText(item.description, { x: 55, y: itemY, size: 10 });
    drawText(item.quantity.toString(), { x: 370, y: itemY, size: 10 });
    // FIX: Replaced "₹" with "Rs." to avoid encoding errors.
    drawText(`Rs. ${item.price.toFixed(2)}`, { x: 420, y: itemY, size: 10 });
    drawText(`Rs. ${(item.quantity * item.price).toFixed(2)}`, {
      x: 500,
      y: itemY,
      size: 10,
    });

    // --- Totals Section ---
    const subtotal = item.quantity * item.price;
    const tax = subtotal * orderDetails.taxRate;
    const grandTotal = subtotal + tax;

    const totalsY = itemY - 60;
    // FIX: Replaced "₹" with "Rs."
    drawText("Subtotal:", { x: 420, y: totalsY, size: 10 });
    drawText(`Rs. ${subtotal.toFixed(2)}`, { x: 500, y: totalsY, size: 10 });

    drawText("Tax (18%):", { x: 420, y: totalsY - 20, size: 10 });
    drawText(`Rs. ${tax.toFixed(2)}`, { x: 500, y: totalsY - 20, size: 10 });

    page.drawLine({
      start: { x: 410, y: totalsY - 30 },
      end: { x: width - 50, y: totalsY - 30 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    drawText("Grand Total:", {
      x: 420,
      y: totalsY - 45,
      font: helveticaBoldFont,
      size: 12,
    });
    drawText(`Rs. ${grandTotal.toFixed(2)}`, {
      x: 500,
      y: totalsY - 45,
      font: helveticaBoldFont,
      size: 12,
    });

    // --- Footer ---
    drawText("Thank you for your business!", {
      x: 50,
      y: 80,
      font: helveticaBoldFont,
      size: 12,
    });
    drawText("Payment is due within 30 days of invoice date.", {
      x: 50,
      y: 65,
      size: 10,
    });

    // 5. Serialize the PDF to bytes.
    const pdfBytes = await pdfDoc.save();

    // 6. Send the PDF to the client as a downloadable file.
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${orderDetails.orderId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Failed to generate invoice:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while generating the invoice." },
      { status: 500 }
    );
  }
}
