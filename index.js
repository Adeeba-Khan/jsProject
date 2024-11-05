// Replace with your current CrudCrud endpoint
const apiUrl = "https://crudcrud.com/api/398737d9c3884630a284d0d021aa8fb7/sellingDetails";

// Fetch and display products on page load
document.addEventListener("DOMContentLoaded", fetchAndDisplayProducts);

function handleFormSubmit(event) {
    event.preventDefault();

    const sellingDetails = {
        sellingPrice: event.target.sellingPrice.value,
        productName: event.target.productName.value,
        productCategory: event.target.productCategory.value,
    };

    // Log API URL for debugging
    console.log("Adding product to:", apiUrl);

    // Use fetch API to add a new product to CrudCrud
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sellingDetails)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Product added:", data);
        displayProductOnScreen(data);
    })
    .catch(error => console.log("Error adding product:", error));

    // Clear input fields
    document.getElementById("sellingPrice").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productCategory").value = "";
}

function fetchAndDisplayProducts() {
    // Log API URL for debugging
    console.log("Fetching products from:", apiUrl);

    // Use fetch API to retrieve all products from CrudCrud
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched products:", data);
            data.forEach(product => displayProductOnScreen(product));
        })
        .catch(error => console.log("Error fetching products:", error));
}

function displayProductOnScreen(product) {
    const categoryListId = {
        electronic: "electronicItems",
        food: "foodItems",
        skincare: "skincareItems",
    };

    const listId = categoryListId[product.productCategory];
    const productList = document.getElementById(listId);

    if (productList) {
        const li = document.createElement("li");
        li.textContent = `${product.sellingPrice} - ${product.productCategory} - ${product.productName} `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Order";
        deleteButton.onclick = () => deleteProduct(li, product._id);

        li.appendChild(deleteButton);
        productList.appendChild(li);
    } else {
        console.log("Category list not found for:", product.productCategory);
    }
}

function deleteProduct(element, id) {
    const deleteUrl = `${apiUrl}/${id}`;
    console.log("Deleting product from:", deleteUrl);

    // Use fetch API to delete the product from CrudCrud
    fetch(deleteUrl, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            element.remove();
            console.log("Product deleted successfully");
        })
        .catch(error => console.log("Error deleting product:", error));
}
