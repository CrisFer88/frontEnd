import axios from 'axios';
import { IS_allStacksByDate } from '../utils/types';

type dataToPrint = {
    data: string,
    apiKey: string,
    printerId: string
}

export const sendPrintJobToPrintNode = async (label: dataToPrint) => {
  // Configura las opciones para la solicitud a la API de PrintNode
  console.log('Label: ', label);
  const options = {
    headers: {
      Authorization: `Basic ${label.apiKey}`,
    },
  };

  try {
    // Realiza la solicitud para obtener el token de autenticación de PrintNode
    const response = await axios.post('https://api.printnode.com/auth', {}, options);

    // Extrae el token de autenticación del resultado de la solicitud
    const { token } = response.data;

    console.log('Token: ', token);

    // Configura las opciones para la solicitud de impresión a PrintNode
    const printJobOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Realiza la solicitud de impresión a PrintNode
    await axios.post(
      `https://api.printnode.com/printjobs?printerId=${label.printerId}`,
      label.data,
      printJobOptions
    );

    console.log('Impresión enviada exitosamente a PrintNode.');
  } catch (error) {
    console.error('Error al enviar la impresión a PrintNode:', error);
  }
};
