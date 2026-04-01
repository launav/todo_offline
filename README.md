# Lista de Tareas Offline

## Descripción de la aplicación

Esta aplicación permite añadir, marcar como completadas y eliminar tareas desde una interfaz sencilla. Los datos se almacenan en el lado cliente para mejorar la experiencia del usuario y permitir que la aplicación siga siendo útil incluso sin conexión.

## Tecnologías de almacenamiento utilizadas

### localStorage
Se utiliza para almacenar todas las tareas del usuario de forma persistente. Es una buena elección porque las tareas deben mantenerse aunque el navegador o la pestaña se cierren. La estructura elegida consiste en un array de objetos convertido a JSON. Cada tarea contiene:
- id
- text
- completed

Esta estructura es simple, clara y suficiente para el nivel de complejidad de la práctica.

### sessionStorage
Se utiliza para guardar el estado temporal del filtro de tareas pendientes. Esta decisión es adecuada porque el filtro solo debe mantenerse durante la sesión actual del navegador. Cuando la pestaña o el navegador se cierran, ese estado desaparece automáticamente.

### IndexedDB (conceptualización)
Si la aplicación necesitara almacenar grandes volúmenes de datos estructurados, IndexedDB sería más adecuada que localStorage o sessionStorage.

Podría utilizarse para guardar por cada tarea:
- fecha de creación
- fecha de modificación
- prioridad
- notas adicionales
- etiquetas
- historial de cambios

IndexedDB sería ventajosa por varias razones:
- permite almacenar grandes cantidades de datos
- admite datos estructurados
- facilita búsquedas más complejas
- es más adecuada para relaciones y escalabilidad en el navegador

En cambio, localStorage y sessionStorage están mejor orientadas a datos simples y pequeños.

## Service Worker y funcionalidad offline

Se ha implementado un Service Worker para almacenar en caché los archivos estáticos principales:
- index.html
- style.css
- script.js
- manifest.json

Gracias a este sistema, la aplicación puede seguir cargándose sin conexión siempre que esos recursos ya hayan sido cacheados antes. Además, como las tareas se guardan en localStorage, el usuario puede seguir viendo y gestionando sus datos locales incluso sin Internet.

## Decisiones de diseño

- Se ha mantenido una interfaz simple para centrar la práctica en el almacenamiento cliente.
- Se ha separado la lógica de interfaz de la lógica de persistencia mediante funciones específicas.
- Se evita almacenar información sensible, siguiendo buenas prácticas de seguridad.
- Se incluye control básico de errores al trabajar con localStorage y sessionStorage.

## Cómo ejecutar la aplicación

1. Guardar todos los archivos en una misma carpeta.
2. Ejecutar la aplicación con un servidor local.
3. Abrir la ruta correspondiente en el navegador.

Es recomendable usar una extensión como Live Server en Visual Studio Code.

## Archivos incluidos

- index.html
- style.css
- script.js
- sw.js
- manifest.json
- README.md