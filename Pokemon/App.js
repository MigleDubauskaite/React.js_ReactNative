import { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

// 🟡 ADAPTAR: La URL base de la API que te den en el examen
const API_BASE = 'https://pokeapi.co/api/v2/pokemon';
const { width } = Dimensions.get('window');

export default function App() {
  const styles = getStyles(); // 🔵 FIJO: Llamada a la función de estilos

  // 🔵 FIJO: Estados básicos (Lista, Seleccionado, Carga y Error)
  const [lista, setLista] = useState([]);
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 🔵 FIJO: useEffect para disparar la carga al abrir la app
  useEffect(() => {
    async function cargarLista() {
      try {
        const res = await fetch(`${API_BASE}?limit=20`);
        const json = await res.json();
        
        // 🟡 ADAPTAR: 'json.results' depende de si la API devuelve el array directo o dentro de una propiedad
        setLista(json.results); 
      } catch {
        setError('Error al cargar la lista');
      } finally {
        setCargando(false);
      }
    }
    cargarLista();
  }, []);

  // 🔵 FIJO: Función para obtener el detalle de un elemento
  async function cargarDetalle(url) {
    try {
      setCargando(true);
      const res = await fetch(url);
      const json = await res.json();
      
      // 🟡 ADAPTAR: Guarda el objeto que devuelve la API (a veces es json, otras json[0])
      setPokemonSeleccionado(json); 
    } catch {
      setError('Error al obtener detalle');
    } finally {
      setCargando(false);
    }
  }

  // --- CONTROL DE VISTAS (Lógica de "Estados Especiales") ---

  // 🔵 FIJO: Si está cargando, mostramos el circulito
  if (cargando) {
    return <ActivityIndicator size="large" style={styles.loader} color="red" />;
  }

  // 🔵 FIJO: Si hay error, mostramos el mensaje y opción de reintentar
  if (error) {
    return (
      <ScrollView style={styles.screen}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => {setError(null); setCargando(true);}}>
          <Text style={styles.backText}>Reintentar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // --- VISTA 1: LISTADO ---
  if (!pokemonSeleccionado) {
    return (
      <ScrollView style={styles.screen}>
        <Text style={styles.title}>Pokédex</Text>
        
        {/* 🔵 FIJO: .map para recorrer la lista */}
        {lista.map((p) => (
          <TouchableOpacity
            key={p.name} // 🟡 ADAPTAR: 'p.name' o 'p.id' (un valor único)
            style={styles.item}
            onPress={() => cargarDetalle(p.url)} // 🟡 ADAPTAR: La propiedad que contenga la URL o ID
          >
            {/* 🟡 ADAPTAR: El nombre de la propiedad a mostrar (p.name, p.title...) */}
            <Text style={styles.itemTitle}>{p.name.toUpperCase()}</Text>
            <Text style={styles.verMas}>Ver detalle →</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // --- VISTA 2: DETALLE ---
  return (
    <ScrollView style={styles.screen}>
      {/* 🔵 FIJO: Botón para volver (limpia el estado del seleccionado) */}
      <TouchableOpacity onPress={() => setPokemonSeleccionado(null)} style={styles.back}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      {/* 🟡 ADAPTAR: Todas las propiedades de abajo dependen de tu API */}
      <Text style={styles.detailTitle}>
        {pokemonSeleccionado.name.toUpperCase()}
      </Text>

      <Image
        source={{ uri: pokemonSeleccionado.sprites.front_default }} // RUTA DE LA IMAGEN
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.info}>Altura: {pokemonSeleccionado.height / 10} m</Text>
      
      {/* 🟡 ADAPTAR: Si la API tiene arrays internos, necesitas otro .map */}
      <Text style={styles.typeHeader}>Tipos:</Text>
      {pokemonSeleccionado.types.map((t) => (
        <Text key={t.type.name} style={styles.typeItem}>• {t.type.name}</Text>
      ))}
    </ScrollView>
  );
}

// 🔵 FIJO: Estilos (puedes copiar y pegar estos en el examen y solo cambiar colores)
const getStyles = () =>
  StyleSheet.create({
    screen: { padding: 20, paddingTop: 50, backgroundColor: '#fff' },
    loader: { marginTop: 100 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    item: {
      padding: 20,
      backgroundColor: '#f8f8f8',
      borderRadius: 12,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemTitle: { fontSize: 16, fontWeight: '600' },
    verMas: { color: 'red', fontSize: 12 },
    back: { marginBottom: 20 },
    backText: { color: 'blue', fontWeight: 'bold' },
    detailTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
    image: { width: width * 0.7, height: width * 0.7, alignSelf: 'center' },
    info: { fontSize: 18, marginVertical: 4 },
    typeHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 15 },
    typeItem: { fontSize: 16, color: '#444' },
    errorText: { color: 'red', marginBottom: 10 },
  });