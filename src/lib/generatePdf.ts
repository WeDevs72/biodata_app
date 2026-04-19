/**
 * Generates a PDF from a DOM element using the browser's native print engine.
 *
 * This version uses a hidden <iframe> inside the current page instead of a
 * popup window. This provides identical origin context, avoiding CORS issues and
 * popup blockers, and reliably loads all Next.js / Tailwind CSS stylesheets.
 */
export async function generatePdf(
  element: HTMLElement,
  filename = "biodata.pdf"
): Promise<void> {
  // 1. Clone the current document head to get all styles perfectly
  const headClone = document.head.cloneNode(true) as HTMLHeadElement;
  // Remove scripts so we don't accidentally re-run Next.js in the iframe
  headClone.querySelectorAll("script").forEach((s) => s.remove());
  const headHtml = headClone.innerHTML;

  // 2. Clone the template element's HTML
  const contentHtml = element.outerHTML;
  const title = filename.replace(/\.pdf$/i, "");
  
  // 3. Create the hidden iframe
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.bottom = "0";
  iframe.style.right = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.style.visibility = "hidden";
  
  document.body.appendChild(iframe);
  
  const iframeDoc = iframe.contentWindow?.document;
  if (!iframeDoc) {
    // Fallback if iframe fails for some reason
    window.print();
    return;
  }

  // 4. Construct the iframe document
  const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <base href="${window.location.origin}" />
  ${headHtml}
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: #fff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    /* Erase the hidden-target overrides so the template is visible */
    body > div {
      position: static !important;
      left: auto !important;
      top: auto !important;
      opacity: 1 !important;
      visibility: visible !important;
      width: 794px !important;    /* Standard A4 width pixel target */
      margin: 0 auto !important;
      max-width: 100% !important;
    }
    /* Let the browser handle page breaks naturally */
    section { break-inside: avoid; }
  </style>
</head>
<body>
  ${contentHtml}
</body>
</html>`;

  iframeDoc.open();
  iframeDoc.write(printHtml);
  iframeDoc.close();

  // Wait for the iframe's stylesheets and images to load
  await new Promise<void>((resolve) => {
    if (iframeDoc.readyState === "complete") {
      setTimeout(resolve, 500); // Give fonts a beat to apply
    } else {
      iframe.onload = () => setTimeout(resolve, 500);
    }
    // Rescue timeout in case onload doesn't fire
    setTimeout(resolve, 2000);
  });

  // Execute print on the iframe
  const iframeWin = iframe.contentWindow;
  if (iframeWin) {
    iframeWin.focus();
    iframeWin.print();
  }

  // Cleanup: remove the iframe after the print dialog closes
  // Note: print() is generally blocking until the dialog closes
  setTimeout(() => {
    try {
      document.body.removeChild(iframe);
    } catch {
      /* ignore */
    }
  }, 3000);
}
