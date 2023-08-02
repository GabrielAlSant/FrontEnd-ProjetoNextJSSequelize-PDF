import Image from "next/image"
import { format, parseISO } from "date-fns";
import Popup from 'reactjs-popup';

export default function CardVendedor ({vendedor}){

   const handleDelete = async (e) => {
      e.preventDefault();
      const { id } = e.target;
      const data = {
        id: Number(id),
      };
      const response = await axios.delete("http://localhost:3002" + `/vendedor/${id}`);
      if (!response.statusText === "OK") {
        alert("Erro ao excluir a venda");
      } else {
        alert("venda excluída com sucesso");
      }
    };

    return (
        <div className='produtosindex'>
         {vendedor.map(({id,nome, cpf, dataInicio, turno, status, img})=>(
           <div key={id}>
        <div className='cardvendedor'>
        <Image src={`http://localhost:3002/vendedor/img/${id}`} width={200} height={200} className="imagemcard"/>
        <center><div className='nomevendedor'>{nome}</div></center>
        <div className="popup">
        <div className='infovendedor'>
     <div>CPF: {cpf}</div>
     <div>Data de Inicio: {format(parseISO(dataInicio), "dd/MM/yyyy")}</div>
     <div>Turno: {turno}</div>
     <div>Estado: {status}</div>
   
  </div>
        
        </div>
        </div>
      </div>
 ))}
       </div>
    )
}