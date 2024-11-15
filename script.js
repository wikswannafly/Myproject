// Mengambil elemen tombol untuk mengarahkan ke halaman pembayaran
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.parentElement.getAttribute('data-id');  // Mengambil ID produk
        // Arahkan ke halaman checkout
        window.location.href = `/checkout/${productId}`;
    });
});

// Fungsi untuk validasi formulir pembayaran
document.querySelector('#payment-form')?.addEventListener('submit', function(event) {
    const form = event.target;
    const paymentMethod = form.querySelector('input[name="payment-method"]:checked');

    if (!paymentMethod) {
        alert('Pilih metode pembayaran terlebih dahulu!');
        event.preventDefault();  // Mencegah pengiriman form jika metode pembayaran tidak dipilih
    }
});
