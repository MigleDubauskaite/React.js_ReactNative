# Pokemon App 🐱‍👤

Aplicación de ejemplo creada con **React Native y Expo**, usando la plantilla **blank**.

Este proyecto sirve para practicar conceptos básicos de React Native:
- Componentes
- Estados (`useState`)
- Efectos (`useEffect`)
- Listados con `ScrollView`
- Interacción con `TouchableOpacity`
- Consumo de APIs con `fetch`
- Mostrar imágenes remotas

---

## 🚀 Creación del proyecto

```bash
# Crear el proyecto con plantilla en blanco
npx create-expo-app Pokemon --template blank

# Entrar en la carpeta del proyecto
cd Pokemon

# Ejecutar la aplicación
npm start
````

Al ejecutar `npm start` se abrirá **Expo Dev Tools**, desde donde se puede:

* Escanear el QR con **Expo Go**
* Ejecutar en **Android Emulator**
* Ejecutar en **Web**

---

## 📦 Dependencias para Web

Para poder ejecutar el proyecto en navegador es necesario instalar:

```bash
npx expo install react-dom react-native-web
```

---

## 📁 Estructura del proyecto

```text
Pokemon/
├── App.js            # Archivo principal de la aplicación
├── package.json      # Dependencias y scripts
├── node_modules/     # Librerías instaladas
├── assets/           # Imágenes y recursos estáticos
└── app.json          # Configuración de Expo
```

* `App.js` contiene toda la lógica principal.
* `assets/` se utiliza para imágenes locales.
* `app.json` contiene la configuración de Expo.

---

## 🧠 Conceptos practicados

### Estados y efectos

```javascript
const [contador, setContador] = useState(0);

useEffect(() => {
  console.log("Componente cargado");
}, []);
```

---

### Listas con ScrollView y TouchableOpacity

```javascript
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
```

---

### Consumo de API con fetch

```javascript
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
```

La propiedad `results` pertenece al JSON devuelto por la API y contiene la lista de Pokémon.

---

### Mostrar imágenes remotas

```javascript
<Image
  source={{ uri: pokemon.sprites.front_default }}
  style={{ width: 200, height: 200 }}
  resizeMode="contain"
/>
```

---

## 🧪 Comandos útiles

```bash
# Instalar dependencias
npm install

# Ejecutar el proyecto
npm start

# Limpiar caché si hay errores
npx expo start -c
```

---

## 📝 Recomendación para el examen

1. Crear el proyecto con:

```bash
npx create-expo-app Pokemon --template blank
```

2. Instalar dependencias necesarias.
3. Implementar una lista y una vista de detalle.
4. Ejecutar la aplicación con:

```bash
npm start
```

5. Probar con Expo Go o en Web.

---

Proyecto de práctica para **React Native + Expo**.

