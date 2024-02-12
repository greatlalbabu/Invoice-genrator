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

    // Clear the input values in the new container
    newItemContainer.querySelector("#item").value = "";
    newItemContainer.querySelector("#qty").value = "";
    newItemContainer.querySelector("#price").value = "";

    document.querySelector(".product-data").appendChild(newItemContainer);
}

// remove
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









// Function to generate and download the invoice
function downloadInvoice() {

    var invoiceContent = "index.html";
    var blob = new Blob([invoiceContent], { type: "text/html" });
    var link = document.createElement("a");

// when download with file name
    link.download = "invoice.html";
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


