import React, { useEffect, useState } from "react";
import { IS_allStacksByDate } from "../../../utils/types";
import { QRCode } from "react-qrcode";
import { useModal } from "../../../hooks/useModal";
import Modal from "./Modal";
import "../../../styles/modalLabel.css";
import { formatDateTime } from "../../../utils/funtionsApp";
import printIcon from "../../../assets/icon/printer.png";
import { useAppDispatch, useAppSelector } from "../../../store";
import { newStack } from "../../../thunks/production/allstackbydate.thunk";

const PrintLabel = ({
  status,
  data,
}: {
  status: boolean;
  data: IS_allStacksByDate;
}) => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.allStacks);
  const { isLoading, data: reversedData, dataFetched, error } = respu;
  const [qrData, setQrData] = useState<string>("");
  const [controlModal, setControlModal] = useState<boolean>(status);
  // console.log("data Recibida: ", data );
  const { isOpen, openModal, closeModal, classNameModal } = useModal(false);



  useEffect( () => {
    const result = dispatch(newStack(data));
    console.log("El resultado de guardar es: ", );
  },[dataFetched] );
  




  const dataToScan = {
    stackp_id: 23,
  };





  useEffect(() => {
    const qrData = JSON.stringify(dataToScan);
    setQrData(qrData);
    openModal();
  }, [status, data]);

  const onClick = () => {
    closeModal();
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
            <span className="container__description--label">Machine: </span>{" "}
            {data.machineName}{" "}
          </p>
          <p>
            <span className="container__description--label">Class: </span>{" "}
            {data.stackp_class}{" "}
          </p>
          <p>
            <span className="container__description--label">Part: </span>{" "}
            {data.stackp_component}{" "}
          </p>
          <p>
            <span className="container__description--label">Sku: </span>{" "}
            {data.stackp_sku}{" "}
          </p>
          <p>
            <span className="container__description--label">Color: </span>{" "}
            {data.stackp_color}{" "}
          </p>
          <p>
            <span className="container__description--label">Quantity: </span>{" "}
            {data.stackp_qty}{" "}
          </p>
          <p>
            <span className="container__description--label">Date: </span>{" "}
            {formatDateTime(data.stackp_date)}{" "}
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
