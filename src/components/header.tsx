import { correo, ciudad, pais, nombres, appelidos } from "./datos"
import MundoAmerica from "../components/icons/globe-americas"
function Header() {

    return (
        <>
            <div className="contenedor-principal">
                <div className="informacion-personal">
                    <div>
                        <h1> {appelidos} </h1>
                        <h1> {nombres}</h1>
                    </div>
                    <h2> {correo}</h2>
                    <div className="contenedor-svg">
                        <MundoAmerica width={16} height={16} color="white" />
                        <p> {ciudad}, {pais} </p>
                    </div>
                </div>
                <div>
                    <img src="/me.jpg" alt="Imagen de Perfil" />
                </div>
            </div>
        </>
    )
};
export default Header


