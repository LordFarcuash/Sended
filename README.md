# Proyecto SvelteKit

Aplicación web desarrollada con SvelteKit que utiliza MySQL como base de datos y autenticación JWT.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** (versión 18 o superior recomendada)
- **MySQL** (versión 8.0 o superior recomendada)
- **pnpm** (gestor de paquetes)

### Instalar pnpm

Si aún no tienes pnpm instalado, ejecuta:

```bash
npm install -g pnpm
```

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

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

> ⚠️ **Importante**: Asegúrate de cambiar `JWT_SECRET` por una cadena secreta segura. Puedes generar una usando:
>
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 3. Configurar la base de datos

La base de datos se configura de manera automatica cuando arrancas el proyecto

````

### 4. Instalar dependencias

```bash
pnpm install
````

## 💻 Uso

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
pnpm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que SvelteKit asigne).

### Modo Producción

Para construir y ejecutar la aplicación en producción:

```bash
# Construir la aplicación
pnpm build

# Previsualizar la build
pnpm preview
```

## 🔐 Credenciales por Defecto

- **Usuario Admin**: Ledanix
- **Contraseña**: 123

> ⚠️ **Seguridad**: Cambia estas credenciales antes de desplegar a producción.

## 🛠️ Stack Tecnológico

- **Frontend**: SvelteKit
- **Base de Datos**: MySQL
- **Autenticación**: JWT
- **Runtime**: Node.js
- **Gestor de Paquetes**: pnpm

## 📝 Notas

- El nombre de la base de datos `sended` está configurado por defecto y no debe ser modificado.
- Asegúrate de que el puerto 3306 de MySQL esté disponible.
- Si cambias las credenciales de MySQL, actualiza las variables de entorno correspondientes.

## 🤝 Contribuir

Si deseas contribuir a este proyecto, por favor:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
