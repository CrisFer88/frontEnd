import {
  AllClases,
  AllColorAssignment,
  AllColors,
  AllSkusizeAssignment,
} from "../../appcontainer";
import "../../styles/settingsView.css";
import AllSkuSize from "../components/compSettings/AllSkusize";

export const NewParamaterPage = () => {
  //SV Settings View
  return (
    <>
      
        <div className="SVcontainer__components">
          <div className="SVcontainer__cards">
            <div className="SVcard__view">
              <AllClases />
            </div>
            <div className="SVcard__view">
              <AllColors />
            </div>
            <div className="SVcard__view">
              <AllSkuSize />
            </div>
          </div>
        </div>
      <div className="SVcontainer__components">
        <div className="SVcontainer__cards">
          <div className="SVcard__view">
            <AllColorAssignment />
          </div>
          <div className="SVcard__view">
            <AllSkusizeAssignment />
          </div>
          <div className="SVcard__view">
           
          </div>
        </div>
      </div>
      <div className="SVfooter__container">
        <div className="SVfooter__contact--info">
          <p>Correo: cristian@modularclosets.com</p>
          <p>Número de contacto: +1 (848)-224-9655</p>
        </div>
      </div>
    </>
  );
};
