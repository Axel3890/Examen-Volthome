# 📚 Frontend - Examen VoltHome

Este es un proyecto **frontend** desarrollado en **Next.js 13+ con App Router**, como complemento visual para la API de librería desarrollada en NestJS. Aunque no fue parte requerida del examen técnico, se implementó como un plus para ofrecer una mejor experiencia visual y de gestión.

---

## 🚀 Tecnologías utilizadas

- [Next.js](https://nextjs.org/) 13 con App Router
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Lucide Icons](https://lucide.dev/)
- [shadCN](https://ui.shadcn.com/)
- UI Components personalizados (`Card`, `Button`, `Tabs`, etc.)

---

## 📦 Instalación

```bash
git clone https://github.com/Axel3890/Examen-Volthome.git
cd examen-frontend
npm install
```


> Asegúrate de que el backend NestJS esté corriendo en el puerto 3000.

### ▶️ Ejecutar en modo desarrollo

```bash
npm run dev
```

---

## 🧭 Navegación principal

La app se divide en tres pestañas (usando `Tabs`):

- 📘 **Coleccion**: gestión de libros (listar, crear, editar, eliminar)
- 👤 **Buscar Autores**: buscador dinámico de autores reales desde Open Library
- 📊 **Libros por decadas**: agrupación automática de libros por década, ordenados alfabéticamente por título

---

## 📚 Funcionalidades destacadas

### ✅ CRUD de libros

- Crear nuevos libros mediante formulario dinámico
- Editar libros existentes
- Eliminar libros con confirmación
- Campos validados manualmente en el frontend

### ✅ Búsqueda de autores

- Conexión directa a Open Library API
- Resultados limitados a los 5 más relevantes
- Muestra: nombre, obra más conocida, cantidad de obras

### ✅ Agrupamiento por década

- Calculado dinámicamente en backend (`/books/grouped`)
- Expandible/colapsable por década
- Orden interno alfabético por título

---

## 🧱 Estructura del proyecto

```

├── app/              
│   ├── components/
│   │   ├── book-form.tsx
│   │   ├── book-card.tsx
│   │   ├── author-search.tsx
│   │   ├── decade-view.tsx
│   │   └── grouped-decade-section.tsx
│── page.tsx                   # Vista principal con pestañas
├── types.ts                   # Tipos compartidos (Book, Author)

```

---

## ✨ Detalles técnicos

- Arquitectura modular basada en componentes
- Lógica de estado limpia con `useState` y `useEffect`
- Separación de responsabilidades: visual (cards, forms) vs. lógica (data fetching)
- Uso de `ScrollArea` y `Tabs` para mejor UX
- Tipado completo con TypeScript

---