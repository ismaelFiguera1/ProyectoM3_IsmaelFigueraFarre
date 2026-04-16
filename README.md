# Chat IA con Jon Snow

Aplicacion web tipo SPA que permite conversar con un personaje ficticio mediante la API de Gemini, usando una Serverless Function de Vercel para proteger la API key y aislar la logica sensible del frontend.

> Importante:
> Repositorio: https://github.com/ismaelFiguera1/ProyectoM3_IsmaelFigueraFarre
> Despliegue: https://proyecto-henry.vercel.app

## Demo

- Produccion: https://proyecto-henry.vercel.app
- Repositorio: https:/github.com//ismaelFiguera1/ProyectoM3_IsmaelFigueraFarre

## Descripcion del proyecto

Este proyecto es una aplicacion web desarrollada con HTML, CSS y JavaScript que simula un chat con un personaje ficticio, Jon Snow. El usuario puede enviar mensajes desde la interfaz y recibir respuestas generadas mediante la API de Gemini.

La aplicacion esta planteada como una SPA sencilla, evitando recargas completas de pagina y gestionando la navegacion y la interaccion desde JavaScript mediante History API. Para proteger la API key, la comunicacion con Gemini no se realiza directamente desde el navegador, sino a traves de una Serverless Function desplegada en Vercel.

El objetivo principal del proyecto es practicar la integracion entre frontend, funciones serverless, consumo de APIs externas y despliegue en produccion.

## Funcionalidades

- Chat interactivo con un personaje ficticio.
- Envio de mensajes desde el frontend a una funcion serverless.
- Respuestas generadas dinamicamente mediante Gemini.
- Proteccion de la API key usando variables de entorno en Vercel.
- Separacion entre la logica del frontend y la logica sensible del backend mediante una Serverless Function.
- Validacion de mensajes antes de procesarlos.
- Despliegue en produccion mediante Vercel.
- Interfaz web tipo SPA sin recargas completas de pagina.

## Tecnologías y herramientas utilizadas

- HTML
- CSS
- JavaScript
- Vercel Serverless Functions
- Google Gemini API
- Node.js
- Vitest
- Vercel CLI para desarrollo local y despliegue

## Arquitectura del proyecto

El proyecto separa la parte visual de la lógica sensible mediante una arquitectura sencilla basada en frontend estático y backend serverless.

El frontend se encarga de mostrar la interfaz, validar el input, mantener el historial temporal de la conversación y enviar el array `messages` a la función serverless.

La función serverless recibe ese historial, vuelve a validar los mensajes, utiliza la variable de entorno `GEMINI_API_KEY`, añade el prompt del personaje y realiza la petición a la API de Gemini. Después devuelve la respuesta al frontend para mostrarla en el chat.

## Variables de entorno

El proyecto necesita una variable de entorno para poder comunicarse con la API de Gemini:

```env
GEMINI_API_KEY=tu_api_key_de_gemini
```

## Instalación y ejecución local

Antes de clonar y ejecutar el proyecto, es necesario tener instaladas algunas herramientas de forma global en el ordenador.

Este proyecto utiliza **Node.js** para gestionar dependencias con npm y **Vercel CLI** para ejecutar en local el frontend junto con la Serverless Function ubicada en la carpeta `api/`.

Node.js y Vercel CLI no forman parte del código del proyecto. Son herramientas externas que deben estar instaladas en el sistema.

Puedes comprobar si ya están instaladas con:

```bash
node -v
npm -v
vercel --version
```

Este proyecto debe ejecutarse con `vercel dev` porque utiliza una **Serverless Function** dentro de la carpeta `api/`. De esta forma, Vercel levanta tanto el frontend estático como la función backend necesaria para comunicarse con Gemini.

### 1. Clonar el repositorio

```bash
git clone "https://github.com/ismaelFiguera1/ProyectoM3_IsmaelFigueraFarre.git"
```

### 2. Entrar en la carpeta del proyecto

```bash
cd ProyectoM3_IsmaelFigueraFarre
```

### 3. Instalar las dependencias

```bash
npm install
```

Este comando instala las dependencias definidas en `package.json` y reconstruye la carpeta `node_modules/`.

### 4. Configurar la variable de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia el archivo `.env.example`.

```env
GEMINI_API_KEY=tu_api_key_de_gemini
```

La API key no debe subirse al repositorio. Por eso el archivo `.env` está incluido en `.gitignore`.

### 5. Ejecutar el proyecto en local

```bash
vercel dev
```

### 6. Abrir la aplicación en el navegador

```txt
http://localhost:3000
```

Normalmente, Vercel utilizará el puerto `3000`, aunque en algunos casos puede usar otro distinto si ese puerto ya está ocupado.

Si todo está configurado correctamente, la aplicación se abrirá en local y podrá comunicarse con Gemini a través de la función serverless.

## Despliegue en Vercel

Este proyecto puede desplegarse en Vercel desde la terminal usando **Vercel CLI**. El objetivo de este proceso es dejar publicada tanto la parte visual de la aplicacion como la **Serverless Function** que vive en la carpeta `api/`.

Todos los comandos de esta seccion deben ejecutarse desde la carpeta raiz del proyecto. La carpeta `.vercel/`, que no se sube a GitHub porque esta incluida en `.gitignore`, guarda la vinculacion local entre esta carpeta del ordenador y el proyecto correspondiente dentro de Vercel.

Antes de empezar, hace falta:

- Tener una cuenta en Vercel.
- Tener Vercel CLI disponible en el ordenador.
- Estar situado dentro de la carpeta raiz del proyecto.

### 1. Comprobar que Vercel CLI esta disponible

```bash
vercel --version
```

Este comando sirve para comprobar que Vercel CLI esta instalado correctamente en el ordenador.

Si el comando no funciona, se puede instalar Vercel CLI de forma global con:

```bash
npm install -g vercel
```

### 2. Iniciar sesion en Vercel

```bash
vercel login
```

Este comando inicia la sesion de tu cuenta de Vercel desde la terminal. Si es la primera vez que lo usas, Vercel te pedira autenticarte siguiendo el metodo que te muestre en pantalla.

Hasta que no inicies sesion, la terminal no podra vincular esta carpeta a un proyecto de Vercel ni subir despliegues.

### 3. Vincular esta carpeta local con un proyecto de Vercel

```bash
vercel link
```

Este comando conecta la carpeta actual con un proyecto concreto dentro de tu cuenta de Vercel.

Si es la primera vez que lo haces, Vercel puede ir preguntando varias cosas en la terminal, por ejemplo:

- Que cuenta o scope quieres usar.
- Si quieres enlazar con un proyecto ya existente o crear uno nuevo.
- El nombre que tendra el proyecto dentro de Vercel.
- Que directorio contiene el proyecto. En este caso, la raiz actual del repositorio.

Cuando este paso termina, Vercel crea o actualiza la carpeta `.vercel/` con la informacion de vinculacion local.

### 4. Configurar la variable de entorno en produccion

```bash
vercel env add GEMINI_API_KEY production
```

Este comando añade la variable `GEMINI_API_KEY` al entorno de produccion del proyecto de Vercel que acabas de vincular.

Es importante entender que esta variable no se guarda de forma global en tu ordenador. Se guarda dentro de ese proyecto concreto de Vercel, para que la Serverless Function pueda leerla cuando la aplicacion este desplegada.

Cuando Vercel pida el valor de la variable, se debe pegar unicamente la API key, sin escribir `GEMINI_API_KEY=` delante.

Ejemplo correcto:

```txt
AIza...
```

Ejemplo incorrecto:

```txt
GEMINI_API_KEY=AIza...
```

Si mas adelante cambias la clave, tendras que actualizar la variable en Vercel y volver a desplegar para que el cambio quede reflejado en produccion.

### 5. Desplegar en produccion

```bash
vercel --prod
```

Este comando crea un despliegue de produccion.

Durante este proceso, Vercel utilizara la configuracion definida en `vercel.json`, publicara el frontend estatico y dejara disponible la Serverless Function ubicada en `api/`, que es la encargada de comunicarse con Gemini sin exponer la API key en el navegador.

Cuando el despliegue termine, Vercel mostrara en la terminal una URL publica para acceder a la aplicacion ya publicada.

En este proyecto, la URL publica del chat es:

```txt
https://proyecto-henry.vercel.app
```

### 6. Comprobar que el despliegue funciona

Una vez abierta la URL publica, conviene hacer una comprobacion sencilla:

- Entrar en la aplicacion.
- Abrir la vista del chat.
- Enviar un mensaje de prueba.
- Confirmar que Gemini responde correctamente.

Si la pagina carga pero el chat no responde, lo primero que hay que revisar es que `GEMINI_API_KEY` este bien configurada en el proyecto de Vercel y que el despliegue se haya hecho despues de añadir esa variable.

## Enlaces importantes

- Repositorio: https://github.com/ismaelFiguera1/ProyectoM3_IsmaelFigueraFarre
- Despliegue: https://proyecto-henry.vercel.app
