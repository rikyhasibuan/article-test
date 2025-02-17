# Article Test

## Backend

### Migrate Database

untuk menjalankan migrasi di backend, wajib terinstall [migrate CLI](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate). masuk ke direktori backend dan ketikkan perintah berikut

```bash
migrate -path database/migrations -database "mysql://root:root@tcp(localhost:3306)/article" -verbose up
```

### Run Service

untuk menjalankan service backend, ketikkan perintah berikut pada direktoru backend :

```bash
go run cmd/main.go
```

## Frontend

### Run Service

untuk menjalankan service frontend, ketikkan perintah berikut pada direktoru backend :

```bash
npm install
npm run dev
```
