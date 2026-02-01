# \# Pokemon App

# 

# Esta es una aplicación de ejemplo creada con \*\*React Native y Expo\*\*, usando una plantilla \*\*en blanco\*\* (`blank`).

# El proyecto sirve para practicar conceptos básicos de React Native: componentes, `useState`, `useEffect`, ScrollView, TouchableOpacity, imágenes y fetch de APIs.

# 

# ---

# 

# \## Comandos para crear el proyecto

# 

# ```bash

# \# Crear proyecto con plantilla en blanco

# npx create-expo-app Pokemon --template blank

# 

# \# Entrar en la carpeta del proyecto

# cd Pokemon

# 

# \# Ejecutar la app

# npm start

# ```

# 

# > Esto abrirá Expo Dev Tools. Desde ahí puedes:

# >

# > \* Escanear el QR en tu teléfono con \*\*Expo Go\*\*.

# > \* Ejecutar en \*\*Android Emulator\*\*.

# > \* Ejecutar en \*\*iOS Simulator\*\* (solo Mac).

# 

# ---

# 

# \## Estructura del proyecto

# 

# ```

# Pokemon/

# ├── App.js           # Archivo principal de la app

# ├── package.json     # Dependencias y scripts

# ├── node\_modules/    # Librerías instaladas

# └── assets/          # Imágenes y recursos estáticos

# ```

# 

# \* `App.js` es donde escribirás tus componentes y lógica principal.

# \* `assets/` sirve para guardar imágenes locales si las necesitas.

# 

# ---

# 

# \## Conceptos que puedes practicar

# 

# 1\. \*\*Estados y efectos\*\*

# 

# ```javascript

# const \[contador, setContador] = useState(0);

# useEffect(() => { console.log("Hola!"); }, \[]);

# ```

# 

# 2\. \*\*Listas con ScrollView y TouchableOpacity\*\*

# 

# ```javascript

# <ScrollView>

# &nbsp; {lista.map(item => (

# &nbsp;   <TouchableOpacity key={item.id} onPress={() => verDetalle(item)}>

# &nbsp;     <Text>{item.name}</Text>

# &nbsp;   </TouchableOpacity>

# &nbsp; ))}

# </ScrollView>

# ```

# 

# 3\. \*\*Fetch de API y manejo de loading/error\*\*

# 

# ```javascript

# useEffect(() => {

# &nbsp; async function cargarDatos() {

# &nbsp;   try {

# &nbsp;     const res = await fetch("https://pokeapi.co/api/v2/pokemon");

# &nbsp;     const data = await res.json();

# &nbsp;     setLista(data.results);

# &nbsp;   } catch {

# &nbsp;     setError("Error al cargar");

# &nbsp;   } finally {

# &nbsp;     setCargando(false);

# &nbsp;   }

# &nbsp; }

# &nbsp; cargarDatos();

# }, \[]);

# ```

# 

# 4\. \*\*Mostrar imágenes remotas y calcular tamaño\*\*

# 

# ```javascript

# <Image

# &nbsp; source={{ uri: pokemon.sprites.front\_default }}

# &nbsp; style={{ width: 200, height: 200 }}

# &nbsp; resizeMode="contain"

# />

# ```

# 

# ---

# 

# \## Comandos útiles para el examen

# 

# ```bash

# \# Instalar dependencias

# npm install

# 

# \# Ejecutar en Expo

# npm start

# 

# \# Limpiar cache (si da errores)

# expo start -c

# ```

# 

# ---

# 

# \## Recomendación para el examen

# 

# 1\. Crear el proyecto con:

# 

# ```bash

# npx create-expo-app Pokemon --template blank

# ```

# 

# 2\. Pegar tu código de ejemplo (`App.js`) con lista y detalle.

# 3\. Ejecutar con:

# 

# ```bash

# npm start

# ```

# 

# 4\. Usar Expo Go para probar rápido en el teléfono.

# 

# ---

# 

# ¡Listo! Con esto tienes un \*\*README completo para tu examen\*\*, que explica desde cómo crear la app hasta cómo probarla y los conceptos clave de React Native con Expo.



