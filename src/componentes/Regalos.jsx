import React, { useState } from "react";
import { FiGift } from "react-icons/fi";
import brillos from "../assets/brillos.png";

function Regalos() {
  const [mostrarCBU, setMostrarCBU] = useState(false);

  return (
    <section className="regalos">
      

      <div className="caja-regalos">
        <h2 className="titulo-regalos">Regalos</h2>

        <p className="texto-regalos">
          Si deseás regalarme algo más que tu hermosa presencia...
        </p>

        <div className="icono-regalo-contenedor">
          <FiGift className="icono-regalo" />
        </div>

        <button
          className="boton-regalo"
          onClick={() => setMostrarCBU(!mostrarCBU)}
        >
          {mostrarCBU ? "Ocultar datos" : "Número de CBU"}
        </button>

        {mostrarCBU && (
          <div className="datos-regalo animacion-fade-in">
            <p><strong>Titular:</strong> Josefina Sincovich Vidal</p>
            <p><strong>Banco / billetera:</strong> Mercado Pago</p>
            <p><strong>Alias:</strong> josesincovich</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Regalos;