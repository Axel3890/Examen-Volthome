# 📚 Librería API - Examen Técnico Backend Jr (Node.js + NestJS + PostgreSQL)

Este proyecto es una API RESTful desarrollada en **NestJS** que gestiona una librería. Incluye funcionalidades como:

- CRUD de libros conectados a una base de datos PostgreSQL.
- Consulta de autores reales desde la API pública de Open Library.
- Agrupamiento de libros por décadas, ordenados alfabéticamente por título.

---

## 🛠️ Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [Sequelize](https://sequelize.org/) + `sequelize-typescript`
- [PostgreSQL](https://www.postgresql.org/)
- [Axios](https://axios-http.com/) (para consumo de APIs externas)

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Axel3890/Examen-Volthome.git
cd examen-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

Asegurate de tener PostgreSQL corriendo y crear una base de datos llamada `books`.

```ts
Creá un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=books
```

También podés usar el archivo `.env.example` como referencia:


```env
# .env.example
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=books
```


### 4. Ejecutar el proyecto

```bash
npm run start:dev
```

La API estará corriendo en: [http://localhost:3000](http://localhost:3000)

---

## 📚 Endpoints disponibles

### 📘️ Libros

| Método | Endpoint           | Descripción                           |
|--------|--------------------|---------------------------------------|
| GET    | `/books`           | Obtener todos los libros              |
| GET    | `/books/:id`       | Obtener un libro por ID               |
| POST   | `/books`           | Crear un nuevo libro                  |
| PUT    | `/books/:id`       | Editar un libro                       |
| DELETE | `/books/:id`       | Eliminar un libro                     |
| GET    | `/books/grouped`   | Agrupar libros por década y ordenarlos por título |

> 📌 Ejemplo de cuerpo al crear/editar libros:

```json
{
  "title": "Cien años de soledad",
  "author_id": "OL123456A",
  "published_year": 1985
}
```

---

### 👤 Autores

| Método | Endpoint             | Descripción                              |
|--------|----------------------|------------------------------------------|
| GET    | `/authors?search=x`  | Buscar autores reales por nombre         |

> 📄 Ejemplo de respuesta:

```json
[
  {
    "id": "OL123456A",
    "name": "Gabriel García Márquez",
    "top_work": "Cien años de soledad",
    "work_count": 50
  }
]
```

---

## 🧐 Lógica de agrupamiento por década

- Se utiliza el campo `published_year` para determinar la década (ej: 1993 → `1990s`).
- Los libros de cada década se ordenan alfabéticamente por título.
- No se utilizan librerías externas como `lodash`.

> 📄 Ejemplo de respuesta para `/books/grouped`:

```json
{
  "1980s": [
    { "title": "Cien años de soledad", "published_year": 1985 }
  ],
  "1990s": [
    { "title": "El nombre de la rosa", "published_year": 1990 },
    { "title": "Rayuela", "published_year": 1993 }
  ]
}
```

---

## 🧪 Estructura del proyecto

```
src/
├── authors/
│   ├── authors.controller.ts
│   ├── authors.module.ts
│   └── authors.service.ts
├── books/
│   ├── dto/
│   │   ├── create-book.dto.ts
│   │   └── update-book.dto.ts
│   ├── book.model.ts
│   ├── books.controller.ts
│   ├── books.module.ts
│   └── books.service.ts
│
│
└── app.controller.ts
└── app.module.ts
└── app.service.ts
└── main.ts
```

---

## ✅ Funcionalidades implementadas

- [x] CRUD de libros
- [x] Conexión con PostgreSQL usando Sequelize
- [x] Consumo de API externa (Open Library)
- [x] Lógica de agrupamiento y ordenamiento sin librerías externas
- [x] Separación por módulos (`books`, `authors`)
- [x] Manejo de errores y validaciones mínimas
- [x] Documentación en README

---
