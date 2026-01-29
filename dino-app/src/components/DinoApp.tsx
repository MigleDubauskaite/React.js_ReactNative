import { useEffect, useState } from "react";

interface Dino {
  name: string;
  image: string;
  description: string;
}

const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

function Dino() {
  const [dino, setDino] = useState<null | Dino>(null);
  const [status, setStatus] = useState(STATUS.LOADING);

  const fetchDino = async () => {
    setStatus(STATUS.LOADING);
    try {
      const response = await fetch(
        "https://dinoapi.brunosouzadev.com/api/dinosaurs"
      );
      if (!response.ok) throw new Error("Error al obtener dinosaurio");
      const data = await response.json();
      const randomDino = data[Math.floor(Math.random() * data.length)];
      setDino(randomDino);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(STATUS.ERROR);
    }
  };

  useEffect(() => {
    fetchDino();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {status === STATUS.LOADING && (
          <div className="loading">
            <p>Cargando dinosaurio... 🦖</p>
          </div>
        )}

        {status === STATUS.ERROR && (
          <div className="error">
            <p>¡Ooops! No se pudo cargar el dinosaurio</p>
            <button onClick={fetchDino}>Intentar de nuevo</button>
          </div>
        )}

        {status === STATUS.SUCCESS && dino && (
          <div className="success">
            <h1>{dino.name}</h1>
            <img src={dino.image} alt={dino.name} />
            <p>{dino.description}</p>
            <button onClick={fetchDino}>Cargar otro dinosaurio</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Dino;
