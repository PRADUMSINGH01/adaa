import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { productName, price } = await req.json();
    if (!productName || typeof price !== "number") {
      return NextResponse.json(
        { error: "Product name and valid price required." },
        { status: 400 }
      );
    }

    const orderId = `INV-${Date.now()}`;
    const orderDate = new Date().toLocaleDateString("en-IN");

    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();

    // Embed fonts
    const headerFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Theme colors
    const primary = rgb(224 / 255, 122 / 255, 95 / 255);
    const accent = rgb(138 / 255, 155 / 255, 110 / 255);
    const dark = rgb(74 / 255, 74 / 255, 72 / 255);
    const white = rgb(1, 1, 1);

    // Load and embed logo image from public folder
    const logoPath = path.resolve("./public/logo.png");
    let logoImage;
    try {
      const logoBytes = fs.readFileSync(logoPath);
      logoImage = await pdfDoc.embedPng(logoBytes);
    } catch {
      logoImage = null;
    }

    // Header banner
    page.drawRectangle({
      x: 0,
      y: height - 100,
      width,
      height: 100,
      color: primary,
    });

    // Draw logo if available
    if (logoImage) {
      const logoDims = logoImage.scale(0.15);
      page.drawImage(logoImage, {
        x: 50,
        y: height - logoDims.height - 20,
        width: logoDims.width,
        height: logoDims.height,
      });
    } else {
      // Fallback to text brand name
      page.drawText("Navaa.store", {
        x: 50,
        y: height - 60,
        size: 28,
        font: headerFont,
        color: white,
      });
    }

    // Invoice title
    page.drawText("INVOICE", {
      x: width - 160,
      y: height - 60,
      size: 24,
      font: headerFont,
      color: white,
    });

    // Company info
    page.drawText("123 Commerce Street, Seeloo, Rajasthan", {
      x: 50,
      y: height - 120,
      size: 10,
      font: bodyFont,
      color: dark,
    });
    page.drawText("Email: care@navaa.store", {
      x: 50,
      y: height - 135,
      size: 10,
      font: bodyFont,
      color: dark,
    });

    // Invoice details right-aligned
    const rightX = width - 200;
    page.drawText(`Invoice # ${orderId}`, {
      x: rightX,
      y: height - 120,
      size: 12,
      font: bodyFont,
      color: dark,
    });
    page.drawText(`Date: ${orderDate}`, {
      x: rightX,
      y: height - 135,
      size: 12,
      font: bodyFont,
      color: dark,
    });

    // Bill to
    page.drawText("Bill To:", {
      x: 50,
      y: height - 180,
      size: 12,
      font: headerFont,
      color: dark,
    });
    page.drawText("Valued Customer", {
      x: 50,
      y: height - 195,
      size: 10,
      font: bodyFont,
      color: dark,
    });

    // Table header
    const tableY = height - 240;
    page.drawText("Description", {
      x: 55,
      y: tableY,
      size: 12,
      font: headerFont,
      color: dark,
    });
    page.drawText("Qty", {
      x: 370,
      y: tableY,
      size: 12,
      font: headerFont,
      color: dark,
    });
    page.drawText("Unit Price", {
      x: 420,
      y: tableY,
      size: 12,
      font: headerFont,
      color: dark,
    });
    page.drawText("Total", {
      x: 500,
      y: tableY,
      size: 12,
      font: headerFont,
      color: dark,
    });
    page.drawLine({
      start: { x: 50, y: tableY - 5 },
      end: { x: width - 50, y: tableY - 5 },
      thickness: 1,
      color: accent,
    });

    // Item row
    const itemY = tableY - 25;
    page.drawText(productName, {
      x: 55,
      y: itemY,
      size: 10,
      font: bodyFont,
      color: dark,
    });
    page.drawText("1", {
      x: 380,
      y: itemY,
      size: 10,
      font: bodyFont,
      color: dark,
    });
    page.drawText(`Rs. ${price.toFixed(2)}`, {
      x: 420,
      y: itemY,
      size: 10,
      font: bodyFont,
      color: dark,
    });
    page.drawText(`Rs. ${price.toFixed(2)}`, {
      x: 500,
      y: itemY,
      size: 10,
      font: bodyFont,
      color: dark,
    });

    // Totals
    const subtotal = price;
    const tax = subtotal * 0.18;
    const totalY = itemY - 50;
    page.drawText("Subtotal:", {
      x: 420,
      y: totalY,
      size: 10,
      font: bodyFont,
      color: dark,
    });
    page.drawText(`Rs. ${subtotal.toFixed(2)}`, {
      x: 500,
      y: totalY,
      size: 10,
      font: bodyFont,
      color: dark,
    });
    page.drawText("Tax (18%):", {
      x: 420,
      y: totalY - 15,
      size: 10,
      font: bodyFont,
      color: dark,
    });
    page.drawText(`Rs. ${tax.toFixed(2)}`, {
      x: 500,
      y: totalY - 15,
      size: 10,
      font: bodyFont,
      color: dark,
    });
    page.drawLine({
      start: { x: 410, y: totalY - 25 },
      end: { x: width - 50, y: totalY - 25 },
      thickness: 1,
      color: accent,
    });
    page.drawText("Grand Total:", {
      x: 420,
      y: totalY - 40,
      size: 12,
      font: headerFont,
      color: dark,
    });
    page.drawText(`Rs. ${(subtotal + tax).toFixed(2)}`, {
      x: 500,
      y: totalY - 40,
      size: 12,
      font: headerFont,
      color: dark,
    });

    // Footer
    page.drawText("Thank you for shopping at Navaa.store", {
      x: 50,
      y: 50,
      size: 10,
      font: bodyFont,
      color: dark,
    });
    page.drawText("Payment due within 30 days", {
      x: 50,
      y: 35,
      size: 8,
      font: bodyFont,
      color: dark,
    });

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${orderId}.pdf"`,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not generate invoice." },
      { status: 500 }
    );
  }
}
