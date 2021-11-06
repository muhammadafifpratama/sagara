gunakan http://localhost:2000 untuk mengakses apinya 

saya telah buatkan fitur untuk register di url http://localhost:2000/user/register
untuk format dan execution silahkan lihat di postman pada request register 
lalu setelah mengisi username password dan email akan ada yang mengirim email verifikasi
dari saya afifpratama@gmail.com ke email yang telah ditulis di kolom email
lalu saya menggunakan crypto untuk mengenkripsi password and disimpan didalam database

karena Setiap endpoint yang berhubungan dengan proses CRUD diperlukan autentikasi terlebih dahulu
maka silahkan login terlebih dahulu di http://localhost:2000/user/login untuk mendapatkan token 
jwt yang akan dipakai untuk autentikasi silahkan cek postman untuk lebih lanjut

dan CRUD data produk telah saya buat juga untuk melihat list semua product bisa di http://localhost:2000/product/read namun jika tidak memberikan token maka akan mendapatkan error 401
dan tampil not authorized kemudian untuk create new product bisa di http://localhost:2000/product/create yang jika tidak memberi token lagi akan muncul not authorized sementara ini isi nama barang harga dan deskripsi seperti yang di postman lalu di database akan muncul field baru 
yang menandakan user mana yang post barang tersebut lalu untuk edit(ini lebih ke replace barangnya dengan field baru tapi nanti bisa diubah ) bisa di http://localhost:2000/product/update
nanti akan muncul juga user siapa yang melakukan edit yang terakhir adalah delete berada di http://localhost:2000/product/delete dan di bodynya harus di specify product dengan nama apa yang mau didelete

lalu untuk upload foto productnya saya menggunakan multer 