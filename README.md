# Pokemon App 🐱‍👤

Aplicación de ejemplo creada con React Native y Expo, usando la plantilla blank.

Este proyecto se utiliza para practicar conceptos básicos de React Native como:

Componentes

useState y useEffect

ScrollView

TouchableOpacity

Imágenes

Consumo de APIs con fetch

# 🚀 Creación del proyecto
# Crear el proyecto con plantilla en blanco
npx create-expo-app Pokemon --template blank

# Entrar en la carpeta del proyecto
cd Pokemon

# Ejecutar la aplicación
npm start


Al ejecutar npm start se abrirá Expo Dev Tools, desde donde puedes:

Escanear el QR con Expo Go (Android / iOS)

Ejecutar en Android Emulator

Ejecutar en Web

📦 Instalación de dependencias necesarias para Web
npx expo install react-dom react-native-web

📁 Estructura del proyecto
Pokemon/
├── App.js            # Archivo principal de la aplicación
├── package.json      # Dependencias y scripts
├── node_modules/     # Librerías instaladas
├── assets/           # Imágenes y recursos estáticos
└── app.json          # Configuración de Expo


App.js: contiene la lógica principal y los componentes.

assets/: carpeta para imágenes locales.

app.json: configuración del proyecto Expo.

🧠 Conceptos practicados
1️⃣ Estados y efectos
const [contador, setContador] = useState(0);

useEffect(() => {
  console.log("Componente cargado");
}, []);

2️⃣ Listas con ScrollView y TouchableOpacity
<ScrollView>
  {lista.map(item => (
    <TouchableOpacity
      key={item.name}
      onPress={() => verDetalle(item)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>

3️⃣ Consumo de API con fetch (PokeAPI)
useEffect(() => {
  async function cargarDatos() {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await res.json();
      setLista(data.results);
    } catch (error) {
      setError("Error al cargar datos");
    } finally {
      setCargando(false);
    }
  }

  cargarDatos();
}, []);


📌 results es una propiedad del JSON devuelto por la API que contiene la lista de Pokémon.

4️⃣ Mostrar imágenes remotas
<Image
  source={{ uri: pokemon.sprites.front_default }}
  style={{ width: 200, height: 200 }}
  resizeMode="contain"
/>

🧪 Comandos útiles
# Instalar dependencias
npm install

# Ejecutar el proyecto
npm start

# Limpiar caché si hay errores
npx expo start -c

📝 Recomendación para el examen

Crear el proyecto:

npx create-expo-app Pokemon --template blank


Instalar dependencias web si es necesario.

Implementar:

Lista de Pokémon

Detalle del Pokémon

Ejecutar con:

npm start


Probar con Expo Go o en Web.
