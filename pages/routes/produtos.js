import Header from '../../components/header';
import CardProdutos from '../../components/cards/cardsprodutos';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { filtro } from '../../components/utils/filtro';



export const getServerSideProps=  async (context)=>{
    const response = await axios.get("https://grumpy-duck-getup.cyclic.app/" + "/produtos");
    const attributes = await response.data;
    return {
      props: {
        attributes
      },
    };
}

export default function Produtos({attributes}){
    const [consulta, setConsulta] = useState("")
    const [itensperpage, setItensperpage] = useState(32)
    const [currentpage, setCurrentPage] = useState(0)

    const keys = ["nome"]
    const consultaGeral = consulta.toLocaleLowerCase()
    const pages = Math.ceil(filtro(attributes, keys, consultaGeral).length / itensperpage)
    const startIndex = currentpage * itensperpage
    const endIndex = startIndex + itensperpage
    const produtos = filtro(attributes, keys, consultaGeral).slice(startIndex, endIndex)
    

    

    useEffect(()=>{setCurrentPage(0)}, [itensperpage])
    return (
        <div>
            <Header/>
         <input
          className='barrapesquisa'
          placeholder='Pesquisar'
          onChange={(e)=> setConsulta(e.target.value)}
          />
      <CardProdutos produtos={produtos} key={produtos.id} />

      <center>
        <div>{Array.from(Array(pages), (pesquisas, index) =>{
        return <button type="button" className="botaopag" value={index} onClick={(e) =>setCurrentPage
        (Number(e.target.value))}>{index + 1}</button>})}
        </div>
        </center>
      <center>
        <form>
            <span>Produtos por Página: </span>                
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