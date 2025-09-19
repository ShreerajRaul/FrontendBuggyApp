document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('invoice-container');

    fetch('http://localhost:5019/api/invoice')
        .then(resp => {
            if (!resp.ok) throw new Error("Failed to fetch invoices");
            return resp.json();
        })
        .then(invoices => {
            if (!invoices || invoices.length === 0) {
                container.innerHTML = "<p>No invoices found.</p>";
                return;
            }

            invoices.forEach(data => {
                let html = `
                    <div class="invoice-card">
                        <div class="invoice-header">
                            <h2>Invoice #${data.invoiceId}</h2>
                            <p><strong>Customer:</strong> ${data.customerName}</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                `;

                data.items.forEach(item => {
                    html += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                        </tr>
                    `;
                });

                html += `
                        <tr class="total-row">
                            <td><strong>Total</strong></td>
                            <td><strong>$${data.total.toFixed(2)}</strong></td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
                `;

                container.innerHTML += html;
            });
        })
        .catch(err => {
            container.innerHTML = `<p class="error">❌ ${err.message}</p>`;
        });
});
