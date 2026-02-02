import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// API de héroes
const API_BASE = 'https://thegreekmythapi.vercel.app/api/heroes';

export default function App() {

  // ESTADOS DE LA APLICACIÓN
  const [heroes, setHeroes] = useState([]);
  const [heroeSeleccionado, setHeroeSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [imgSize, setImgSize] = useState(null);

  // =========================
  // ACCESO ASÍNCRONO A LA API
  // =========================
  useEffect(() => {
    async function cargarHeroes() {
      try {
        setCargando(true);
        setError('');

        const res = await fetch(API_BASE);
        if (!res.ok) {
          throw new Error('Respuesta inválida del servidor');
        }

        const json = await res.json();
        setHeroes(json);
      } catch (e) {
        setError('No se han podido cargar los héroes.');
      } finally {
        setCargando(false);
      }
    }

    cargarHeroes();
  }, []);

  // ==================================================
  // CALCULAR TAMAÑO REAL DE LA IMAGEN DEL HÉROE
  // ==================================================
  useEffect(() => {
    if (!heroeSeleccionado?.image) return;

    Image.getSize(
      heroeSeleccionado.image,
      (w, h) => {
        const ratio = width / w;
        setImgSize({
          width: width * 0.9,
          height: h * ratio * 0.9,
          alignSelf: 'center',
          marginVertical: 15,
        });
      },
      () => {
        setImgSize({
          width: width * 0.9,
          height: width * 0.6,
          alignSelf: 'center',
          marginVertical: 15,
        });
      }
    );
  }, [heroeSeleccionado]);

  // =========================
  // MENSAJES DE ESTADO
  // =========================
  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <Text style={{ padding: 20 }}>{error}</Text>;
  }

  // =========================
  // LISTADO DE HÉROES
  // =========================
  if (!heroeSeleccionado) {
    return (
      <ScrollView style={styles.screen}>
        <Text style={styles.title}>Héroes griegos</Text>

        <Text style={styles.info}>
          Selecciona un héroe para ver más información
        </Text>

        {heroes.map((heroe) => (
          <TouchableOpacity
            key={heroe.id ?? heroe.name}
            style={styles.item}
            onPress={() => setHeroeSeleccionado(heroe)}
          >
            <Text style={styles.itemTitle}>{heroe.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // =========================
  // DETALLE DEL HÉROE
  // =========================
  return (
    <ScrollView style={styles.screen}>
      <TouchableOpacity
        onPress={() => {
          setHeroeSeleccionado(null);
          setImgSize(null);
        }}
        style={styles.back}
      >
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.detailTitle}>
        {heroeSeleccionado.name}
      </Text>

      {imgSize && (
        <Image
          source={{ uri: heroeSeleccionado.image }}
          style={imgSize}
          resizeMode="contain"
        />
      )}

      <Text style={styles.description}>
        {heroeSeleccionado.description}
      </Text>
    </ScrollView>
  );
}

// =========================
// ESTILOS
// =========================
const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    marginBottom: 15,
    color: '#555',
  },
  item: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  back: {
    marginBottom: 10,
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});