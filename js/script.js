function generateQRCode() {
  let text = document.getElementById("text").value;
  if (text.trim() === "") {
      alert("Please enter some text");
      return;
  }
  
  // Clear any previous QR code
  document.getElementById("qrcode").innerHTML = "";

  // Generate the QR code
  new QRCode(document.getElementById("qrcode"), text);
}
