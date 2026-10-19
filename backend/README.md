# 🏨 Gestión de Hotel - Backend

API REST del proyecto **Gestión de Hotel**, desarrollada con **Django** y **Django REST Framework**, usando **MySQL** como base de datos.

---

## 📋 Requisitos previos

Antes de empezar, asegurate de tener instalado lo siguiente:

| Herramienta | Versión | Para qué se usa |
| --- | --- | --- |
| [Python](https://www.python.org/downloads/) | 3.12, 3.13 o 3.14 (el proyecto se desarrolla con **3.14**) | Lenguaje del backend |
| pip | Viene incluido con Python | Instalar las dependencias |
| [MySQL Server](https://dev.mysql.com/downloads/mysql/) | 8.0.11 o superior | Motor de base de datos |
| [Git](https://git-scm.com/downloads) | Cualquiera reciente | Clonar el repositorio |

Opcional, pero recomendado: un cliente gráfico de MySQL como [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) o DBeaver.

> **Windows:** al instalar Python, marcá la opción **"Add python.exe to PATH"**.

### Frameworks y librerías

No hace falta instalarlas a mano: se instalan todas juntas en el paso 4 desde `requirements.txt`.

| Paquete | Versión | Descripción |
| --- | --- | --- |
| Django | 6.1.2 | Framework web |
| djangorestframework | 3.18.3 | Construcción de la API REST |
| django-cors-headers | 4.9.0 | Permite que el frontend (Angular) consuma la API |
| mysqlclient | 2.3.0 | Driver para conectar Django con MySQL |
| python-decouple | 3.8 | Lectura de variables de entorno desde el archivo `.env` |

---

## 🚀 Paso a paso para levantar el servidor

> Todos los comandos se ejecutan desde una terminal. Donde hay diferencias se indica el comando para **Windows (PowerShell)** y para **Linux / macOS**.

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/En-Blanco/gestion-hotel.git
cd gestion-hotel/backend
```

Si ya tenías el repositorio clonado, posicionate en la carpeta `backend` y traé los últimos cambios con `git pull`.

### 2️⃣ Crear el entorno virtual

El entorno virtual aísla las dependencias del proyecto de las del resto del sistema. Se crea **una sola vez**.

```bash
python -m venv .venv
```

> En Linux / macOS puede que tengas que usar `python3` en lugar de `python`.

### 3️⃣ Activar el entorno virtual

Hay que activarlo **cada vez que abras una terminal nueva** para trabajar en el backend.

**Windows (PowerShell):**

```powershell
.venv\Scripts\Activate.ps1
```

**Windows (CMD):**

```cmd
.venv\Scripts\activate.bat
```

**Linux / macOS:**

```bash
source .venv/bin/activate
```

Si se activó correctamente, vas a ver `(.venv)` al comienzo de la línea de la terminal.

> **Error en PowerShell "la ejecución de scripts está deshabilitada":** ejecutá una vez el siguiente comando y volvé a intentar:
>
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

### 4️⃣ Instalar las dependencias

Con el entorno virtual activado:

```bash
pip install -r requirements.txt
```

> **Linux:** `mysqlclient` necesita compilarse. Si falla la instalación, instalá antes las librerías de desarrollo:
>
> - Debian / Ubuntu: `sudo apt install python3-dev default-libmysqlclient-dev build-essential pkg-config`
> - macOS (Homebrew): `brew install mysql-client pkg-config`

### 5️⃣ Configurar las variables de entorno

Los datos sensibles (clave secreta, contraseña de la base de datos) **no se suben al repositorio**. Se guardan en un archivo `.env` que cada uno crea a partir de la plantilla `.env.example`.

**Windows (PowerShell):**

```powershell
Copy-Item .env.example .env
```

**Linux / macOS:**

```bash
cp .env.example .env
```

Después abrí el archivo `.env` y completá los valores:

```env
# Django
SECRET_KEY=cambiar-por-una-clave-secreta
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Base de datos MySQL
DB_NAME=hotel_db
DB_USER=root
DB_PASSWORD=tu_contraseña_de_mysql
DB_HOST=localhost
DB_PORT=3306
```

| Variable | Qué poner |
| --- | --- |
| `SECRET_KEY` | Una clave secreta. Podés generar una con el comando de abajo. |
| `DEBUG` | `True` para desarrollo local. |
| `ALLOWED_HOSTS` | Dejar `localhost,127.0.0.1`. |
| `DB_NAME` | Nombre de la base de datos. Dejar `hotel_db`. |
| `DB_USER` | Usuario de tu MySQL (normalmente `root`). |
| `DB_PASSWORD` | La contraseña de **tu** usuario de MySQL. |
| `DB_HOST` / `DB_PORT` | Dejar `localhost` y `3306`, salvo que tu MySQL use otros. |

Para generar una `SECRET_KEY` (con el entorno virtual activado):

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 6️⃣ Crear la base de datos en MySQL

Asegurate de que el servicio de MySQL esté corriendo y creá la base de datos vacía. Podés hacerlo desde MySQL Workbench ejecutando:

```sql
CREATE DATABASE IF NOT EXISTS hotel_db;
```

O desde la terminal:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS hotel_db;"
```

> El nombre de la base de datos debe coincidir con el valor de `DB_NAME` del archivo `.env`.

### 7️⃣ Aplicar las migraciones

Las migraciones crean las tablas en la base de datos a partir de los modelos de Django:

```bash
python manage.py migrate
```

Si todo salió bien, vas a ver una lista de migraciones terminadas en `OK`.

### 8️⃣ Cargar los datos iniciales

El script [`database/hotel_schema_init.sql`](database/hotel_schema_init.sql) inserta los datos iniciales (por ejemplo, los integrantes del equipo para la sección "Sobre nosotros").

> ⚠️ Este paso se hace **después** de las migraciones, porque el script inserta datos en tablas que crea Django.
> Ejecutalo **una sola vez**: si lo corrés de nuevo, los registros se duplican.

**Opción A – MySQL Workbench:** abrí el archivo `database/hotel_schema_init.sql` y ejecutalo (ícono del rayo ⚡).

**Opción B – Terminal Linux / macOS / CMD:**

```bash
mysql -u root -p < database/hotel_schema_init.sql
```

**Opción C – Terminal PowerShell:**

```powershell
Get-Content database\hotel_schema_init.sql | mysql -u root -p
```

> Si la terminal no reconoce el comando `mysql`, usá la Opción A o agregá la carpeta `bin` de MySQL al PATH (por ejemplo `C:\Program Files\MySQL\MySQL Server 8.4\bin`).

### 9️⃣ (Opcional) Crear un superusuario

Para entrar al panel de administración de Django:

```bash
python manage.py createsuperuser
```

### 🔟 Levantar el servidor

```bash
python manage.py runserver
```

El servidor queda disponible en **http://127.0.0.1:8000/**. Para detenerlo, presioná `Ctrl + C`.

---

## ✅ Verificar que funciona

Con el servidor corriendo, abrí en el navegador:

| URL | Descripción |
| --- | --- |
| http://127.0.0.1:8000/api/equipo/ | Lista de integrantes del equipo (JSON) |
| http://127.0.0.1:8000/admin/ | Panel de administración de Django |

---

## 🔁 Resumen: la próxima vez que quieras levantar el servidor

Una vez hecha la configuración inicial, solo necesitás:

```bash
cd gestion-hotel/backend
.venv\Scripts\Activate.ps1      # Windows (PowerShell)
# source .venv/bin/activate     # Linux / macOS
python manage.py migrate        # solo si hay migraciones nuevas
python manage.py runserver
```

Si alguien agregó paquetes nuevos a `requirements.txt`, volvé a ejecutar `pip install -r requirements.txt`.

---

## 🛠️ Problemas frecuentes

| Error | Causa y solución |
| --- | --- |
| `decouple.UndefinedValueError: SECRET_KEY not found` | No existe el archivo `.env` o le falta esa variable. Revisá el paso 5. |
| `Access denied for user 'root'@'localhost'` | La contraseña en `DB_PASSWORD` no es correcta. |
| `Unknown database 'hotel_db'` | No se creó la base de datos. Revisá el paso 6. |
| `Can't connect to MySQL server on 'localhost'` | El servicio de MySQL no está iniciado. En Windows, iniciá **MySQL** desde *Servicios* (`services.msc`). |
| `Table 'hotel_db.nosotros_miembroequipo' doesn't exist` | Se ejecutó el script SQL antes de las migraciones. Corré `python manage.py migrate` y después el script. |
| `ModuleNotFoundError: No module named 'django'` | El entorno virtual no está activado. Revisá el paso 3. |
