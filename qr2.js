document.getElementById('generateBtn').addEventListener('click', function() {
    let qrText = document.getElementById('qrText').value;
    let qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = ""; // Clear any existing QR code

    if (qrText) {
        // Base64 encode the input text to store more data
        let encodedText = btoa(qrText);  // Encode the input text in Base64 format

        // Generate the QR code with the encoded text
        let qrCode = new QRCode(qrCodeContainer, {
            text: encodedText,  // Use the Base64 encoded text
            width: 256,         // Increase QR code size for better readability
            height: 256,
            correctLevel: QRCode.CorrectLevel.H  // Use highest error correction level for dense QR codes
        });

        // Delay to ensure the QR code is rendered before converting it to an image
        setTimeout(function() {
            let canvas = qrCodeContainer.querySelector('canvas');
            if (canvas) {
                // Create a download link
                let downloadBtn = document.createElement('a');
                downloadBtn.innerText = "Download QR Code";
                downloadBtn.href = canvas.toDataURL("image/png");  // Convert canvas to image URL
                downloadBtn.download = "qrcode.png";  // Set the download attribute

                // Clear previous download button if exists and append the new one
                let prevDownloadBtn = document.getElementById('downloadBtn');
                if (prevDownloadBtn) {
                    prevDownloadBtn.remove();
                }
                downloadBtn.id = 'downloadBtn';
                qrCodeContainer.appendChild(downloadBtn);
            }
        }, 300);  // Small delay to ensure QR code is rendered
    } else {
        alert("Please enter text or URL to generate a QR code.");
    }
});
