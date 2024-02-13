document.getElementById('cdate').textContent = new Date().toLocaleDateString();


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add-item").addEventListener("click", function () {
        addNewItem();
    });

    document.querySelector(".product-data").addEventListener("click", function (event) {
        if (event.target && event.target.id === "buttons") {
            removeItem(event.target.closest(".items"));
        }
        updateTotal(); 
    });

   
    document.querySelector(".product-data").addEventListener("input", function (event) {
        var target = event.target;
        if (target && (target.id === "qty" || target.id === "price")) {
            updateTotal(); 
        }
    });
});


function addNewItem() {
    var newItemContainer = document.querySelector(".items").cloneNode(true);
    newItemContainer.querySelector("#item").value = "";
    newItemContainer.querySelector("#qty").value = "";
    newItemContainer.querySelector("#price").value = "";

    document.querySelector(".product-data").appendChild(newItemContainer);
}

// remove button function 
function removeItem(itemContainer) {
    // Remove the item container from the product data container
    itemContainer.parentNode.removeChild(itemContainer);
}

// update total = price *qty
function updateTotal() {
    var total = 0;
    var items = document.querySelectorAll(".items");

    items.forEach(function (item) {
        var quantity = parseFloat(item.querySelector("#qty").value) || 0;
        var price = parseFloat(item.querySelector("#price").value) || 0;

        total += quantity * price;
    });

   
    document.getElementById("ntotal").textContent = total.toFixed(2);
}




document.getElementById("btn").addEventListener("click", function () {
    if (validateInputs()) {
        downloadInvoice();
    } else {
        alert("Please fill in all required fields before downloading the invoice.");
    }
});

// check any required filed empty or not

function validateInputs() {
    var requiredInputs = document.querySelectorAll('input[required]');
    for (var i = 0; i < requiredInputs.length; i++) {
        if (!requiredInputs[i].value.trim()) {
            return false;
        }
    }
    return true;
}


// Function to generate and download the invoice as PDF
function downloadInvoice() {
   
    if (!validateInputs()) {
        alert("Please fill in all required fields before downloading the invoice.");
        return;
    }

    var invoiceContent = buildInvoiceContent();

  
    html2pdf(invoiceContent, {
        margin: 10,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}



function buildInvoiceContent() {
    var currentDate = document.getElementById("cdate").textContent;
    var dueDate = document.getElementById("number").value;
    var invoiceNumber = document.getElementById("invoicenumber").value;

    var billToName = document.getElementById("name").value;
    var billToEmail = document.getElementById("email").value;
    var billToAddress = document.getElementById("address").value;

    var billFromName = document.getElementById("namefrom").value;
    var billFromEmail = document.getElementById("emailfrom").value;
    var billFromAddress = document.getElementById("addressfrom").value;

    var items = document.querySelectorAll(".items");
    
    var itemsContent = "";
    items.forEach(function (item) {
        var itemName = item.querySelector("#item").value;
        var itemQty = item.querySelector("#qty").value;
        var itemPrice = item.querySelector("#price").value;

        itemsContent += `
            <tr>
                <td>${itemName}</td>
                <td>${itemQty}</td>
                <td>${itemPrice}</td>
            </tr>
        `;
    });

    
    var invoiceContent = `
        <div class="invoice-container">
            <h2>Invoice</h2>
            <p>Current Date: ${currentDate}</p>
            <p>Due Date: ${dueDate}</p>
            <p>Invoice Number: ${invoiceNumber}</p>

            <!-- Bill information -->
            <div class="bill-info">
                <div class="bill-to">
                    <h4>Bill to:</h4>
                    <p>${billToName}</p>
                    <p>${billToEmail}</p>
                    <p>${billToAddress}</p>
                </div>
                <div class="bill-from">
                    <h4>Bill from:</h4>
                    <p>${billFromName}</p>
                    <p>${billFromEmail}</p>
                    <p>${billFromAddress}</p>
                </div>
            </div>

            <!-- Items table -->
            <table class="table">
                <thead>
                    <tr>
                        <th id="Description" scope="col">Description</th> 
                        <th style="margin-right=2rem;" scope="col">Quantity</th> 
                        <th scope="col">Price/Rate</th> 
                        
                    </tr>
                </thead>
                <tbody>
                    ${itemsContent}
                </tbody>
            </table>
            

            <!-- Total -->
            <div class="total">
                <p>Total: <span>${document.getElementById("ntotal").textContent}</span></p>
            </div>
        </div>
    `;

    return invoiceContent;
}



