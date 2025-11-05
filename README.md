# Proyecto SvelteKit

Web application for managing tickets, developed with SvelteKit, using MySQL as the database and JWT for authentication.

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (version 18 or higher recommended)
- **MySQL** (version 8.0 or higher recommended)
- **pnpm** (package manager)

### Install pnpm

If you don’t have pnpm installed yet, run:

```bash
npm install -g pnpm
```

## 🚀 Instalación

### 1. Clone the repository

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

### 2. Set up environment variables

Create a .env file in the project root with the following content:

```env
# Your Admin Credentials
ADMIN_USERNAME=Ledanix
ADMIN_PASS=123

# Your JWT Token
JWT_SECRET=tu_secreto_jwt_aqui

# Database Connection
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_PORT=3306

# Don't Change
DATABASE_NAME=sended
```

> ⚠️ **Important**: Asegúrate de cambiar `JWT_SECRET` with a secure secret string. You can generate one using:
>
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 3. Set up the database

The database is automatically configured when you start the project.

````

### 4. Install dependencies

```bash
pnpm install
````

## 💻 Usage

### Development Mode

To start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173` (or whichever port SvelteKit assigns).

### Production Mode

To build and run the application in production:

```bash
# Construir la aplicación
pnpm build

# Previsualizar la build
pnpm preview
```

## 🔐 Default Credentials

- **Admin User**: Ledanix
- **Password**: 123

> ⚠️ **Security Warning**: Change these credentials before deploying to production.

## 🛠️ Tech Stack

- **Frontend**: SvelteKit
- **Database**: MySQL
- **Authentication**: JWT
- **Runtime**: Node.js
- **Package Manager**: pnpm

## 📝 Notas

- The database name `sended` is configured by default and should not be changed.
- Make sure the MySQL port 3306 is available
- If you change your MySQL credentials, update the corresponding environment variables accordingly.

## 🤝 Contributing

If you’d like to contribute to this project, please:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
