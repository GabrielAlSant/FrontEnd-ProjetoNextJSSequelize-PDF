import Image from "next/image";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import Popup from 'reactjs-popup';
import axios from 'axios';

export default function CardVendedor({ vendedor }) {
  const [totalVendido, setTotalVendido] = useState([]);

  const valorvendido = async (id) => {
    try {
      const response = await axios.get(`https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev/vendedor/${id}/totalvendido`);
      const total = response.data;
      return total;
    } catch (error) {
      console.error("Erro ao obter o total vendido", error);
      return 0;
    }
  };
  const If = ({ condition, children }) => {
    return condition ? children : null;
  };
  useEffect(() => {
    const fetchTotalVendidos = async () => {
      const promises = vendedor.map(({ id }) => valorvendido(id));
      const totalVendidos = await Promise.all(promises);
      setTotalVendido(totalVendidos);
    };

    fetchTotalVendidos();
  }, [vendedor]);

  return (
    <div className='produtosindex'>
      {vendedor.map(({ id, nome, cpf, dataInicio, turno, status, img }, index) => (
        <div key={id}>
          <div className='cardvendedor'>
            <Image src={`https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev//vendedor/img/${id}`} width={200} height={200} className="imagemcard" />
            <center><div className='nomevendedor'>{nome}</div></center>
            <div className="popup">
              <div className='infovendedor'>
                <div>CPF: {cpf}</div>
                <div>Data de Inicio: {format(parseISO(dataInicio), "dd/MM/yyyy")}</div>
                <div>Turno: {turno}</div>
                <div>Total vendido: {totalVendido[index].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                <div>Estado: 
                  <If condition={status === "Desativo"}>
                    <div style={{ color: 'red' }}>{status}</div>
                  </If>
                  <If condition={status !== "Desativo"}>
                    <div style={{ color: 'green' }}>{status}</div>
                  </If>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
