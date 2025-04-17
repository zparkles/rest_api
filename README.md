***INITIAL SETUP***
- Database setup:
1. Salin _statement_ SQL dari _file_ schema.sql dan jalankan di mysql
2. _Setup_ informasi _database_ di .env

- _Setup server_:
  
  _Port_ untuk login dan autentikasi dipisah dengan bagian CRUD dan cari data sehingga dua _file_ yang mengandung _port_ berbeda ini perlu dijalankan secara bersamaan. _File_ index.js dijalankan dengan `npm start` dan _file_ authentication.js dijalankan dengan `npm run startauth`, seperti yang tertera di _file_ package.json.



***ACCESS***

Setelah membuat akun, _login_ dan mendapatkan _token_ (yang berlaku selama 30 menit), _user_ dapat melihat informasi milik mereka sendiri di `POST /users`, menghapus akun di `DELETE /users`, melakukan pencarian data menggunakan NAMA, NIM dan YMD di `GET /data`, dan mengubah informasi di `PATCH /users`. 

Catatan penting mengenai `PATCH /users`: Informasi yang bisa diubah hanya nama dan email, tetapi meskipun hanya mengubah salah satunya, di `body` tetap harus dimasukkan keduanya dan juga _username_-nya karena fungsi _update_-nya memerlukan ketiga parameter tersebut supaya dapat dijalankan.
