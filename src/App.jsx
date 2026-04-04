import { useEffect, useRef, useState } from "react";
import "./App.css";
import musica from "./assets/musica.mp3";
import GaleriaFotos from "./componentes/GaleriaFotos.jsx";
import EntradaMusica from "./componentes/EntradaMusica.jsx";
import Portada from "./componentes/Portada.jsx";
import CuentaRegresiva from "./componentes/CuentaRegresiva.jsx";
import Evento from "./componentes/Evento.jsx";
import Regalos from "./componentes/Regalos.jsx";
import brillos from "./assets/brillos.png";

function App() {
  const audioRef = useRef(null);
  const [mostrarEntrada, setMostrarEntrada] = useState(true);
  const [musicaActiva, setMusicaActiva] = useState(false);

  const [tiempo, setTiempo] = useState({
    dias: "00",
    horas: "00",
    minutos: "00",
    segundos: "00",
  });

  // Contador regresivo
  useEffect(() => {
    const fechaEvento = new Date("2026-06-20T21:00:00-03:00").getTime();

    const intervalo = setInterval(() => {
      const ahora = new Date().getTime();
      const diferencia = fechaEvento - ahora;

      if (diferencia <= 0) {
        setTiempo({
          dias: "00",
          horas: "00",
          minutos: "00",
          segundos: "00",
        });
        clearInterval(intervalo);
        return;
      }

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60)) / (1000 * 60)
      );
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      setTiempo({
        dias: String(dias).padStart(2, "0"),
        horas: String(horas).padStart(2, "0"),
        minutos: String(minutos).padStart(2, "0"),
        segundos: String(segundos).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  // Entrar con música
  const entrarConMusica = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        await audioRef.current.play();
        setMusicaActiva(true);
      }
    } catch (error) {
      console.log("Error música:", error);
    }

    setMostrarEntrada(false);
  };

  // Entrar sin música
  const entrarSinMusica = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setMusicaActiva(false);
    setMostrarEntrada(false);
  };

  // Botón flotante de música
  const toggleMusica = async () => {
    if (!audioRef.current) return;

    if (musicaActiva) {
      audioRef.current.pause();
      setMusicaActiva(false);
    } else {
      try {
        await audioRef.current.play();
        setMusicaActiva(true);
      } catch (error) {
        console.log("Error al reproducir música:", error);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={musica} type="audio/mpeg" />
      </audio>

      {mostrarEntrada && (
        <EntradaMusica
          onConMusica={entrarConMusica}
          onSinMusica={entrarSinMusica}
        />
      )}

      {!mostrarEntrada && (
        <>
          <button className="boton-musica" onClick={toggleMusica}>
            {musicaActiva ? "♫" : "♪"}
          </button>

          <div className="wrapper-fuera">
            <div className="contenedor-principal">
              <Portada />
              <CuentaRegresiva tiempo={tiempo} />
              <Evento />
              <GaleriaFotos />

<div className="brillos-wrap">
  <img src={brillos} alt="" className="brillos-global" />
</div>

<Regalos />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
