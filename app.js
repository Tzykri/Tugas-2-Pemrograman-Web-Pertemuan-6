// Mengimpor modul yang diperlukan
const express = require('express'); // Mengimpor framework Express untuk membangun aplikasi web
const bodyParser = require('body-parser'); // Mengimpor body-parser untuk mem-parsing data dari body permintaan
const session = require('express-session'); // Mengimpor middleware untuk menangani session
const authRoutes = require('./routes/auth'); // Mengimpor rute autentikasi dari file auth.js
const path = require('path'); // Mengimpor modul path untuk mengelola path file
const app = express(); // Membuat instance aplikasi Express

// Set EJS sebagai template engine untuk rendering halaman
app.set('view engine', 'ejs');

// Middleware untuk mem-parsing body dari request
app.use(bodyParser.json()); // Mem-parsing JSON
app.use(bodyParser.urlencoded({ extended: true })); // Mem-parsing URL-encoded data

// Konfigurasi session
app.use(session({
    secret: 'your-secret-key', // Kunci rahasia untuk session
    resave: false, // Tidak menyimpan kembali session jika tidak ada perubahan
    saveUninitialized: true, // Menyimpan session yang belum diinisialisasi
}));

// Mengatur folder statis untuk file-file seperti CSS, gambar, dll.
app.use(express.static(path.join(__dirname, 'public'))); // Menggunakan folder 'public' untuk file statis

// Menggunakan rute autentikasi yang diimpor sebelumnya
app.use('/auth', authRoutes); // Mengarahkan semua permintaan yang diawali dengan '/auth' ke authRoutes

// Rute root: Mengalihkan pengguna ke halaman login
app.get('/', (req, res) => {
    res.redirect('/auth/login'); // Mengarahkan ke '/auth/login'
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000'); // Menampilkan pesan di konsol saat server aktif
});
