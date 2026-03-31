# Proyecto Henry - Chat con Jon Snow

## Descripcion

Este proyecto es una aplicacion web tipo SPA hecha con JavaScript que permite conversar con Jon Snow como personaje ficticio (El de los libros, no el de la serie). La interfaz vive en el frontend dentro de `src/`, mientras que la integracion con Gemini se hace desde una funcion serverless (de Vercel) en `api/` para no exponer la API key en el navegador.

## Objetivo

El objetivo del proyecto es construir un chat con personaje que:

- use una SPA sencilla en el frontend
- tenga routing sin recargar la pagina
- mantenga el historial de conversacion durante la sesion
- consuma un modelo de IA sin exponer secretos en cliente
- pueda desplegarse facilmente en Vercel

## Que hace la aplicacion

- Muestra una vista `Home`
- Muestra una vista `Chat`
- Muestra una vista `About`
- Permite escribir mensajes al personaje
- Envia el historial completo al backend para conservar contexto
- Responde en espanol y en personaje como Jon Snow

## Stack tecnico

- Frontend: HTML, CSS y JavaScript
- Routing: History API (`pushState` + `popstate`)
- Backend: Serverless Functions de Vercel
- IA: Google Gemini
- Despliegue: Vercel

## Flujo general de la app

1. `src/index.html` carga la aplicacion.
2. `src/app.js` decide que vista renderizar segun la ruta actual.
3. Si la ruta es `/chat`, se monta el formulario y se inicializa el chat.
4. `src/chat.js` guarda los mensajes en memoria y renderiza la conversacion.
5. Al enviar un mensaje, el frontend llama a `/api/functions`.
6. `api/functions.js` transforma los mensajes al formato esperado por Gemini.
7. `api/config.js` aporta la URL del modelo y el `SYSTEM_PROMPT`.
8. Gemini devuelve una respuesta y el backend la manda de vuelta al frontend.
9. El frontend inserta la respuesta del personaje en pantalla.

## Restricciones del enunciado y decisiones de implementacion

Varias partes del proyecto no se presentan aqui como decisiones propias, porque ya venian marcadas por la guia. Por ejemplo: hacer una SPA, implementar routing, crear una funcion serverless, conectar frontend y backend y desplegar en Vercel.

Lo que si se detalla a continuacion son las decisiones tomadas dentro de esas restricciones.

### 1. Elegir a Jon Snow y trabajar con su version de los libros

Una decision propia del proyecto fue escoger a Jon Snow como personaje y, ademas, acotarlo al canon de los libros. Eso ayuda a mantener una personalidad mas consistente y evita mezclar informacion de la serie con la novela.

### 2. Mantener el historial del chat en memoria

El historial actual se guarda en un array dentro de `src/chat.js`. Esto fue una decision consciente para priorizar simplicidad y funcionalidad.
Anque da problemas como:

- si el usuario recarga la pagina, el historial se pierde
- no hay persistencia entre sesiones

### 3. Enviar el historial completo en cada request

Cada vez que el usuario manda un mensaje, el frontend envia todos los mensajes acumulados. Esto permite que Gemini tenga el contexto completo de la conversacion sin necesidad de base de datos ni sesiones de servidor.

Es una buena solucion para una primera version, aunque no es la mas eficiente si la conversacion crece mucho.

### 4. Disenar un system prompt fuerte y acotado

El personaje no responde "como una IA generica", sino como Jon Snow con reglas claras:

- habla en espanol
- responde corto
- se mantiene en personaje
- se limita al canon de los libros
- no conoce el mundo moderno

Esta decision mejora la consistencia de las respuestas y hace que la experiencia sea mas creible.

### 5. Mantener el prompt en codigo y tambien en un archivo de apoyo

El prompt esta embebido en `api/config.js` para que el backend lo use directamente. Ademas existe `system_prompt_jon_snow.txt` como referencia legible.

Esta decision ayuda a revisar el prompt mas facilmente, aunque a futuro convendria centralizarlo en un solo sitio para evitar duplicacion.

### 6. Mantener una base de estilos mobile-first

Los estilos parten de una base simple y compatible con pantallas pequenas. Esta decision es buena como punto de partida, aunque todavia faltan `media queries` para ajustar mejor tablet y escritorio.

### 7. Priorizar primero el despliegue funcional y despues el hardening

Durante esta fase se priorizo validar que el flujo completo funcionara en produccion:

- frontend en Vercel
- funcion serverless operativa
- variable de entorno configurada
- chat respondiendo desde la URL desplegada

La idea fue comprobar primero que el producto funciona de punta a punta y dejar para despues la robustez final, los tests y algunas mejoras de seguridad.

## Archivos clave

### `src/app.js`

Controla el routing SPA y el render de las vistas.

### `src/chat.js`

Gestiona:

- el estado local del chat
- el render de mensajes
- el envio del formulario
- la llamada al backend

### `api/functions.js`

Es la funcion serverless principal. Recibe el historial, lo adapta al formato de Gemini y devuelve la respuesta del personaje.

### `api/config.js`

Define:

- la URL del modelo Gemini con la variable de entorno
- el `SYSTEM_PROMPT`

### `vercel.json`

Define las `rewrites` para:

- enrutar `/api/*` a la funcion serverless
- servir la SPA desde `src/index.html`
- exponer los assets del frontend

## Variables de entorno

La aplicacion necesita esta variable:

```env
GEMINI_API_KEY=tu_clave_aqui
```

En local se puede usar un archivo `.env`.

En Vercel, la variable debe configurarse en el proyecto desde:

- Settings
- Environment Variables

Importante:

- `.env` no debe subirse al repositorio
- la clave real nunca debe quedar en el frontend

## Como ejecutar el proyecto en local

### Opcion recomendada: Vercel Dev

Es la mejor opcion porque el proyecto depende de una funcion serverless.

1. Crear un archivo `.env` a partir de `.env.example`
2. AÃ±adir una `GEMINI_API_KEY` valida
3. Ejecutar:

```bash
vercel dev
```

En PowerShell de Windows puede hacer falta usar:

```bash
vercel.cmd dev
```

4. Abrir `http://localhost:3000`

### Opcion solo frontend

Se puede abrir el frontend con Live Server o similar, pero el chat no funcionara correctamente si no esta disponible la funcion serverless.

## Despliegue en Vercel

El proyecto esta preparado para desplegarse con Vercel.

Pasos generales:

1. Vincular el repositorio o el directorio a un proyecto de Vercel
2. Configurar `GEMINI_API_KEY`
3. Ejecutar un deploy

Comandos utiles:

```bash
vercel.cmd
```

```bash
vercel.cmd --prod
```

## Estado actual del proyecto

### Ya implementado

- SPA con routing basico
- Chat con mensajes en memoria
- Serverless Function para hablar con Gemini
- System prompt del personaje
- Variables de entorno
- Despliegue en Vercel

### Todavia pendiente o mejorable

- agregar media queries reales
- escribir tests unitarios
- mejorar el manejo de errores en backend
- mover `api/config.js` fuera de `api/` para evitar que Vercel lo trate como funcion separada
- evitar renderizar HTML dinamico sin sanitizar en el chat
- documentar mejor scripts y comandos en `package.json`

## Limitaciones conocidas

- El historial se pierde al recargar la pagina
- No hay persistencia en base de datos
- No hay autenticacion ni control de usuarios
- No hay tests automatizados
- El backend asume una respuesta valida de Gemini y puede mejorarse
- La UI funciona, pero aun no esta adaptada con detalle a todos los breakpoints

## Posibles mejoras futuras

- Persistir conversaciones en `localStorage` o base de datos
- AÃ±adir tests para routing, chat y backend
- Mejorar la seguridad del render de mensajes
- Separar configuracion de servidor y logica de handler
- AÃ±adir loading state y errores mas claros en la interfaz
- Crear una vista 404
- Refinar la experiencia responsive

## Conclusiones

Este proyecto demuestra una arquitectura pequena pero completa para un chat con personaje:

- frontend simple
- routing SPA
- backend serverless
- integracion con IA
- despliegue real

La decision principal fue priorizar claridad y funcionalidad antes que complejidad arquitectonica. Eso permitio validar el producto en produccion rapidamente y dejar bien identificadas las mejoras necesarias para una siguiente iteracion mas robusta.
