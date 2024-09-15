import { useState, useEffect } from 'react';
import  axios  from 'axios';
import Header from '../../../../components/header';
import Image from "next/image"
import { format, parseISO } from "date-fns";

export const getServerSideProps=  async (context)=>{
    const id = context.query.id;
    const produto = await axios.get("https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev/" + `/produto/${id}`);
  
    const produtodata = await produto.data

 
    return {
      props: {
      produtodata
      },
      
    };
}

export default function ProdutoSolo({produtodata}){
    return (
        <div>
            <Header />
        <div className="clientesolo">
        <div className="left">
        <Image src={`https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev/produto/img/${produtodata.id}`} width={200} height={200} className="imagemcard"/>
        <div>{produtodata.nome}</div>
        </div>    
        <div className="left">
            <div className=''>Dados</div>    
            <table className='tabela'>
             
                <tr><td>Nome</td><td>Descrição</td><td>Preço</td></tr>
            
            
                <tr key={produtodata.id}><td>{produtodata.nome}</td><td>{produtodata.desc}</td><td>{produtodata.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td></tr>
          

          </table>
          </div>
        </div>
        </div>
    )
}