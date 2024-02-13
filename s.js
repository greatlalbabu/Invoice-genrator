// Function to generate and download the invoice as PDF
function downloadInvoice() {
    // Check if all required inputs are filled
    if (!validateInputs()) {
        alert("Please fill in all required fields before downloading the invoice.");
        return;
    }

    // Get the content of the invoice
    var invoiceContent = buildInvoiceContent();

    // Convert the HTML content to PDF using html2pdf.js
    html2pdf(invoiceContent, {
        margin: 10,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}

// Function to build the HTML content for the invoice
function buildInvoiceContent() {
    // Retrieve and customize the invoice content based on your needs
    var currentDate = document.getElementById("cdate").textContent;
    var dueDate = document.getElementById("number").value;
    var invoiceNumber = document.getElementById("number").value;

    var billToName = document.getElementById("name").value;
    var billToEmail = document.getElementById("email").value;
    var billToAddress = document.getElementById("address").value;

    var billFromName = document.getElementById("name").value;
    var billFromEmail = document.getElementById("email").value;
    var billFromAddress = document.getElementById("address").value;

    var items = document.querySelectorAll(".items");
    var itemsContent = "";

    items.forEach(function (item, index) {
        var itemName = item.querySelector("#item").value;
        var quantity = item.querySelector("#qty").value;
        var price = item.querySelector("#price").value;

        itemsContent += `<tr>
                            <td>${itemName}</td>
                            <td>${quantity}</td>
                            <td>${price}</td>
                            <td>Action</td>
                         </tr>`;
    });


    // ... (Retrieve other values as needed)

    // Build the HTML content for the invoice
    var invoiceContent = `
        <div class="invoice-container">
            <h2>Invoice</h2>
            <p>Current Date: ${currentDate}</p>
            <p>Due Date: ${dueDate}</p>
            <p>Invoice Number: ${invoiceNumber}</p>
            <!-- Add other invoice details based on your needs -->

            <!-- Items table -->
            <!-- ... (Add items table content) -->

            <!-- Total -->
            <div class="total">
                <p>Total: <span>${document.getElementById("ntotal").textContent}</span></p>
            </div>
        </div>
    `;

    return invoiceContent;
}
