import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Header from './../components/header';
import axios from 'axios';
import Produtos from './routes/produtos';
import Link from 'next/link';

export const getServerSideProps = async (context) => {
  const response = await axios.get("https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev/" + "/produtos");
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
        <Image src={`https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev//produto/img/${id}`} width={200} height={200} className="imagemcard"/>
        <div className='nomeproduto'>{nome}</div>
        <div className='infoproduto'>
        <div className='precoproduto'>R${preco}</div>
        <Link href={`/routes/soloroutes/produto/${id}`}><button className='botaoproduto'>Ir ao Produto</button></Link>
        </div>
        </div>
      </div>
    ))}
    </div>
   </div>
  )
}
