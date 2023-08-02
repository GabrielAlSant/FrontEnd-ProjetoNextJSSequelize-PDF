import Header from './../../components/header';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { filtro } from './../../components/utils/filtro';
import CardCliente from '../../components/cards/cardscliente';
import { formatCPForCNPJ } from 'js-format-cpf-cnpj'






export const getServerSideProps=  async (context)=>{
    const response = await axios.get("https://grumpy-duck-getup.cyclic.app/" + "/cliente");
    const attributes = await response.data
    return {
      props: {
        attributes
      },
    };
}

export default function Vendedores({attributes}){
    const [consulta, setConsulta] = useState("")
    const [itensperpage, setItensperpage] = useState(32)
    const [currentpage, setCurrentPage] = useState(0)

    const keys = ["nome"]
    const consultaGeral = consulta.toLowerCase()
    const data = filtro(attributes, keys, consultaGeral)

  

    const pages = Math.ceil(data.length / itensperpage)
    const startIndex = currentpage * itensperpage
    const endIndex = startIndex + itensperpage
    const cliente = data.slice(startIndex, endIndex)
    
    
    

    useEffect(()=>{
      setCurrentPage(0)
    }, [itensperpage])
    return (
        <div>
            <Header/>
         <input
          className='barrapesquisa'
          placeholder='Pesquisar'
          onChange={(e)=> setConsulta(e.target.value)}
          />

      <CardCliente cliente={cliente} key={attributes}/>

      <center>
        <div>{Array.from(Array(pages), (pesquisas, index) =>{
        return <button key={index} type="button" className="botaopag" value={index} onClick={(e) =>setCurrentPage
        (Number(e.target.value))}>{index + 1}</button>})}
        </div>
        </center>
      <center>
        <form>
            <span>vendedor por Página: </span>                
          <select value={itensperpage} onChange={(e) => setItensperpage(Number(e.target.value))}>
            <option value={8}>8</option>
            <option value={32} selected>32</option>
            <option value={64}>64</option>
          </select>
        </form>
        </center>
   
        </div>
    )
}