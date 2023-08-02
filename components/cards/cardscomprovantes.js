import Image from "next/image"
import { format, parseISO } from "date-fns";
import axios  from 'axios';

export default function Cardcomprovantes ({comprovantes}){

  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete("https://grumpy-duck-getup.cyclic.app/" + `/comprovante/${id}`);
    if (!response.statusText === "OK") {
      alert("Erro ao excluir a venda");
    } else {
      alert("venda excluída com sucesso");
    }
  };

    return (
        <div className="indexcomprovantes">
         {comprovantes.map(({id, vendedorId, clienteId, produtoId, tipo, valor,data, cliente, vendedor, produto})=>(
           <div key={id}>
        <div className="cardscomprovantes">
        <div className="itemc">Compra Realizada pelo cliente: {cliente.nome}</div>
        <div className="itemc">Vendedor responsável: {vendedor.nome}</div>
        <div className="itemc">Produto em questão: {produto.nome}</div>
        <div className="itemc">Compra realizada na data : {format(parseISO(data), "dd/MM/yyyy")}</div>
        <div className="itemc">Tipo de Pagamento : {tipo}</div>
        <div className="itemc">Valor da Compra:{valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
        <button onClick={handleDelete} id={id} className="buttonexcluir"> Apagar</button>
        < href={`https://grumpy-duck-getup.cyclic.app//comprovante/img/${id}`} download><button className='botaoproduto'>Baixar Comprovante de pagamento</button></>
        </div>
      </div>
 ))}
       </div>
    )
}