import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const API_BASE = "https://akabab.github.io/starwars-api/api/all.json";

export default function App() {

  // Guarda la lista de personajes obtenida de la API
  const [personajes, setPersonajes] = useState([]);

  // Guarda el personaje que el usuario ha seleccionado para ver detalles
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);

  // Indica si la aplicación está cargando datos de la API
  const [cargando, setCargando] = useState(true);

  // Guarda un mensaje de error si la petición a la API falla
  const [error, setError] = useState("");

  // Guarda el tamaño calculado de la imagen del personaje seleccionado
  const [imgSize, setImgSize] = useState(null);

  // CARGAR PERSONAJES
  // ACCESO ASÍNCRONO A LA API

  // Es asíncrono porque la llamada a la API puede tardar en responder.
  // Usamos AWAIT para esperar la respuesta sin bloquear la ejecución de la aplicación.

  // ¿Qué ocurre mientras se esperan los datos?
  // Mientras esperamos los datos de la API, la aplicación sigue funcionando (el usuario puede interectuar o se ejecutan otras funciones)

  useEffect(() => {
    async function cargarPersonajes() {
      try {
        setCargando(true);
        setError("");

        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Respuesta inválida del servidor");

        const json = await res.json();
        setPersonajes(json);
      } catch (e) {
        setError("No se han podido cargar los personajes. Intentalo de nuevo");
      } finally {
        setCargando(false);
      }
    }
    cargarPersonajes();
  }, []);

  // CALCULAR TAMAÑO DE LA IMAGEN
  useEffect(() => {
    if (!personajeSeleccionado?.image) return;

    Image.getSize(
      personajeSeleccionado.image,
      (w, h) => {
        const ratio = width / w;
        setImgSize({
          width: width * 0.15,
          height: h * ratio * 0.15,
          alignSelf: "center",
          marginVertical: 15,
        });
      },
      () => {
        setImgSize({
          width: width * 0.9,
          height: width * 0.6,
          alignSelf: "center",
          marginVertical: 15,
        });
      }
    );
  }, [personajeSeleccionado]);

  // MENSAJES DE ESTADO

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>
          Cargando personajes, espera un momento…
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ padding: 20, textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  // LISTADO DE PERSONAJES
  if (!personajeSeleccionado) {
    return (
      <ScrollView style={styles.screen}>
        <Text style={styles.title}>Personajes de Star Wars</Text>
        <Text style={styles.info}>Selecciona un personaje para ver más información</Text>

        {personajes.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={styles.item}
            onPress={() => setPersonajeSeleccionado(p)}
          >
            <Text style={styles.itemTitle}>{p.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // DETALLE DEL PERSONAJE
  return (
    <ScrollView style={styles.screen}>
      <TouchableOpacity
        onPress={() => {
          setPersonajeSeleccionado(null);
          setImgSize(null);
        }}
        style={styles.back}
      >
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.detailTitle}>{personajeSeleccionado.name}</Text>

      {personajeSeleccionado.image && imgSize && (
        <Image
          source={{ uri: personajeSeleccionado.image }}
          style={imgSize}
          resizeMode="contain"
        />
      )}

      <View style={styles.contenedorDescripcion}>
        <Text style={styles.description}>
          <Text style={styles.bold}>Altura:</Text>{" "}
          {personajeSeleccionado.height} m
        </Text>

        <Text style={styles.description}>
          <Text style={styles.bold}>Peso:</Text> {personajeSeleccionado.mass} kg
        </Text>

        <Text style={styles.description}>
          <Text style={styles.bold}>Color de cabello:</Text>{" "}
          {personajeSeleccionado.hairColor}
        </Text>

        <Text style={styles.description}>
          <Text style={styles.bold}>Color de ojos:</Text>{" "}
          {personajeSeleccionado.eyeColor}
        </Text>

        <Text style={styles.description}>
          <Text style={styles.bold}>Género:</Text>{" "}
          {personajeSeleccionado.gender}
        </Text>

        <Text style={styles.description}>
          <Text style={styles.bold}>Mundo natal:</Text>{" "}
          {personajeSeleccionado.homeworld}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // la pantalla principal
  screen: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#213C51",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // título principal
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#ECEFCA",
  },
  // mensaje que indica seleccionar un personaje
  info: {
    marginBottom: 15,
    color: "#F0FFDF",
    fontSize: 18,
    padding: 15,
  },
  // fragmentos de cada personaje
  item: {
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
    cursor: "pointer",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E2148",
  },
  // la flechita de Volver
  back: {
    marginBottom: 20,
  },
  backText: {
    color: "#ECEFCA",
    fontSize: 16,
  },
  // titulo de detalle
  detailTitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "800",
    color: "#EFE1B5",
  },
  // texto de detalle
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 5,
    textAlign: "center",
  },
  // la parte inicial de texto (ALTURA; PESO...)
  bold: {
    fontWeight: "bold",
    fontStyle: "italic",
    textTransform: "uppercase",
  },
  // contenedor de textos de los detalles
  contenedorDescripcion: {
    backgroundColor: "#ECDFCC",
    color: "#eee",
    borderRadius: 20,
    padding: 20,
  },
});
