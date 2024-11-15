// 1. Mengimpor Modul
const express = require('express');  // Express untuk routing
const path = require('path');        // Untuk menavigasi jalur file
const app = express();               // Membuat aplikasi Express
const port = 3000;                   // Menentukan port server

// 2. Menggunakan Middleware untuk menyajikan file statis (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));  // Folder 'public' untuk file statis

// 3. Menentukan Rute Halaman Utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Mengirim file HTML ke pengguna
});

// 4. Menentukan Rute Halaman Checkout
app.get('/checkout/:productId', (req, res) => {
    const productId = req.params.productId;  // Mendapatkan ID produk dari URL
    const products = {  // Data produk yang tersedia
        '1': { name: 'Game Top-Up', price: 10000 },
        '2': { name: 'Pulsa', price: 50000 }
    };
    const product = products[productId];

    if (product) {
        res.send(`
            <h1>Checkout ${product.name}</h1>
            <p>Harga: Rp ${product.price}</p>
            <button onclick="window.location.href='/pay/${productId}'">Bayar</button>
        `);  // Menampilkan halaman checkout
    } else {
        res.status(404).send('Produk tidak ditemukan');  // Menangani kesalahan produk tidak ada
    }
});

// 5. Menentukan Rute Pembayaran
app.get('/pay/:productId', (req, res) => {
    const productId = req.params.productId;
    const products = {
        '1': { name: 'Game Top-Up', price: 10000 },
        '2': { name: 'Pulsa', price: 50000 }
    };
    const product = products[productId];

    if (product) {
        // Untuk sementara, kita hanya menampilkan pesan pembayaran
        res.send(`
            <h1>Pembayaran untuk ${product.name}</h1>
            <p>Total: Rp ${product.price}</p>
            <form method="POST" action="/payment-success">
                <button type="submit">Bayar Sekarang</button>
            </form>
        `);
    } else {
        res.status(404).send('Produk tidak ditemukan');
    }
});

// 6. Rute Pembayaran Berhasil (Simulasi)
app.post('/payment-success', (req, res) => {
    // Di sini bisa diintegrasikan dengan payment gateway seperti Midtrans, Stripe, dll.
    res.send('<h1>Pembayaran Berhasil!</h1><p>Top-up berhasil, saldo Anda sudah terisi.</p>');
});

// 7. Menjalankan Server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
