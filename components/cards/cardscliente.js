import Image from "next/image"
import { format, parseISO } from "date-fns";
import Popup from '../../components/popups/deleteconfirm';
import { useState } from "react";
import { formatCPForCNPJ } from 'js-format-cpf-cnpj'
import  axios  from 'axios';
import Link from "next/link";

export default function CardCliente ({cliente}){
  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete("https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev/" + `/cliente/${id}`);
    if (!response.statusText === "OK") {
      alert("Erro ao excluir a venda");
    } else {
      alert("venda excluída com sucesso");
    }
  };

  

 const [popup, setPopup] = useState(false)
    return (
      <div className='produtosindex'>
      {cliente.map(({id,nome, cpf, dataInicio, img})=>(
        <div key={id}>
     <div className='cardcliente'>
     <Image src={`https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev//cliente/img/${id}`} width={200} height={200} className="imagemcard"/>
     <center><div className='nomevendedor'>{nome}</div></center>
     <div className="popupcliente">
     <div className='infocliente'>
  <div>CPF: {formatCPForCNPJ(cpf)}</div>
  <div>Data de Inicio: {format(parseISO(dataInicio), "dd/MM/yyyy")}</div>

</div>
<div className="d-flex">
<button className="excluirbutton" onClick={handleDelete}>Excluir</button>
<Link href={`/routes/soloroutes/cliente/${id}`}><button  className="excluirbutton">Sobre</button></Link>
</div>
     </div>
     </div>
   </div>
))}
    </div>
    )
}