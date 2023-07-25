import React, { useEffect, useState } from "react";
import { type_dataPrint } from "../../../utils/types";
import { QRCode } from "react-qrcode";
import { useModal } from "../../../hooks/useModal";
import Modal from "./Modal";
import "../../../styles/modalLabel.css";
import { formatDateTime } from "../../../utils/funtionsApp";
import printIcon from "../../../assets/icon/printer.png";
import { useAppDispatch, useAppSelector } from "../../../store";
import { newStack } from "../../../thunks/production/allstackbydate.thunk";
import { sendPrintJobToPrintNode } from "../../../api/printNodeApi";




const PrintLabel = ({ dataPrint }: { dataPrint: type_dataPrint  }) => {
  
  const respu = useAppSelector((state) => state.allStacks);
  const { isLoading, data: reversedData, dataFetched, error } = respu;
  const [qrData, setQrData] = useState<string>("");
  const [controlModal, setControlModal] = useState<boolean>(dataPrint.status);

  console.log("data Recibida: ", dataPrint );

  const { isOpen, openModal, closeModal, classNameModal } = useModal(false);

  useEffect(() => {
    setControlModal(true);
    console.log("El resultado de guardar es: ");
  }, [dataPrint.status, dataPrint.data]);

  

  useEffect(() => {
    const qrData = JSON.stringify(dataPrint.stackp_id);
    setQrData(qrData);
    openModal();
  }, [controlModal]);

  type dataToPrint = {
    data: string,
    apiKey: string,
    printerId: string
}


  const onClick = () => {
    const printData = `
      Machine: ${dataPrint.data.machineName}
      Class: ${dataPrint.data.stackp_class}
      Part: ${dataPrint.data.stackp_component}
      Sku: ${dataPrint.data.stackp_sku}
      Color: ${dataPrint.data.stackp_color}
      Quantity: ${dataPrint.data.stackp_qty}
      Date: ${formatDateTime(dataPrint.data.stackp_date)}
    `;
    const send: dataToPrint = {
      data: printData,
      apiKey: 'ioRbENKtJsh1aOWZUlPS5SS7984UlOZ-uX-rzhCHf4U',
      printerId: '72508652'
    }
    sendPrintJobToPrintNode(send)
      .then((response) => {
        console.log("Impresión exitosa:", response);
      })
      .catch((error) => {
        console.error("Error al imprimir:", error);
      });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        classNameModal="container__Modal"
      >
        <div className="container__qr">
          {qrData && <QRCode value={qrData} size={200} />}
        </div>
        <div className="container__description">
          <p>
            <span className="container__description--label">Machine: </span>
            {dataPrint.data.machineName}
          </p>
          <p>
            <span className="container__description--label">Class: </span>
            {dataPrint.data.stackp_class}
          </p>
          <p>
            <span className="container__description--label">Part: </span>
            {dataPrint.data.stackp_component}
          </p>
          <p>
            <span className="container__description--label">Sku: </span>
            {dataPrint.data.stackp_sku}
          </p>
          <p>
            <span className="container__description--label">Color: </span>
            {dataPrint.data.stackp_color}
          </p>
          <p>
            <span className="container__description--label">Quantity: </span>
            {dataPrint.data.stackp_qty}
          </p>
          <p>
            <span className="container__description--label">Date: </span>
            {formatDateTime(dataPrint.data.stackp_date)}
          </p>
        </div>
        <div className="container__button">
          <div className="container__button--img">
            <img src={printIcon} onClick={onClick} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PrintLabel;
