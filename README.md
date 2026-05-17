# Gestión de hotel

## Flujo de trabajo con Git (main / develop / feature)

### Estrategia de ramas

- **main** → Código estable listo para entrega o producción
- **develop** → Integración de desarrollos
- **feature/*** → Nuevas funcionalidades

---

### Flujo de trabajo

1. Cambiar a la rama `develop` y actualizarla:

```bash
git checkout develop
git pull origin develop
```

2. Crear una rama nueva para la funcionalidad:

```bash
git checkout -b feature/nombre-feature
```

3. Desarrollar la funcionalidad y guardar los cambios:

```bash
git add .
git commit -m "Descripción del cambio realizado"
```

4. Subir la rama al repositorio remoto:

```bash
git push origin feature/nombre-feature
```

5. Integrar la rama en `develop`:

```bash
git checkout develop
git pull origin develop
git merge feature/nombre-feature
git push origin develop
```

6. Cuando `develop` esté lista, crear un **Pull Request hacia `main`**.

7. El merge hacia `main` requiere aprobación de al menos **2 personas**.

---

### Control de calidad

- No se permite hacer push directo a `main`
- `develop` permite integración directa
- `main` requiere Pull Request obligatorio

---

### Reglas de aprobación

- Para `main`: mínimo 2 aprobaciones
- No se permite merge sin revisión

---

### Objetivo

- Mantener estabilidad en `main`
- Permitir desarrollo ágil en `develop`
- Aplicar control de calidad antes de la entrega
