import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Header from './../components/header';
import axios from 'axios';
import Produtos from './routes/produtos';

export const getServerSideProps = async (context) => {
  const response = await axios.get("http://localhost:3002" + "/produtos");
  const attributes = await response.data;
  return {
    props: {
      attributes
    },
  };
};


export default function Home({attributes}) {
  const produtos = attributes.slice(0,8)
  return (
   <div>
    <Header />
    <h3>Ultimos Produtos</h3>
    <div className='produtosindex'>
    {produtos.map(({id,nome, desc, img, preco})=>(
      <div key={id}>
        <div className='card'>
        <Image src={`http://localhost:3002/produto/img/${id}`} width={200} height={200} className="imagemcard"/>
        <div className='nomeproduto'>{nome}</div>
        <div className='infoproduto'>
        <div className='precoproduto'>R${preco}</div>
        <button className='botaoproduto'>Ir ao Produtos</button>
        </div>
        </div>
      </div>
    ))}
    </div>
   </div>
  )
}
