import { useState, useEffect } from 'react';
import  axios  from 'axios';
import Header from '../../../../components/header';
import Image from "next/image"
import { format, parseISO } from "date-fns";

export const getServerSideProps=  async (context)=>{
    const id = context.query.id;
    const response = await axios.get("http://localhost:3002" + `/cliente/${id}/vendas`);
    const produto = await axios.get("http://localhost:3002" + `/cliente/${id}/produto`);
    const waste = await axios.get("http://localhost:3002" + `/cliente/${id}/totalgasto`);
    const attributes = await response.data
    const produtodata = await produto.data
    const wastedata = await waste.data
 
    return {
      props: {
        attributes,
        produtodata,
        wastedata
      },
      
    };
}

export default function clienteSolo({attributes, wastedata,produtodata}){
    return (
        <div>
            <Header />
        <div className="clientesolo">
        <div className="left">
        <Image src={`http://localhost:3002/cliente/img/${attributes.id}`} width={200} height={200} className="imagemcard"/>
        <div>{attributes.nome}</div>
        </div>    
        <div className="left">
            <div className=''>Compras do Cliente</div>    
            <table className='tabela'>
             
                <tr><td>Valor</td><td>Data</td><td>Tipo</td><td>Produto</td></tr>
            {attributes.comprovantes.map(({id, valor,data,tipo})=>(
            
                <tr><td>{valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td><td>{format(parseISO(data), "dd/MM/yyyy")}</td><td>{tipo}</td><td>a{produtodata.produto.nome}</td></tr>
          
        ))}
          </table>
          <div>Valor Total de compras do Cliente na Empresa: {wastedata.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
          </div>
        </div>
        </div>
    )
}