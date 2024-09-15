import Image from "next/image"
import Link from "next/link";

export default function CardProdutos ({produtos}){

    return (
        <div className='produtosindex'>
         {produtos.map(({id,nome, desc, img, preco})=>(
           <div key={id}>
        <div className='card'>
        <Image src={`https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev//produto/img/${id}`} width={200} height={200} className="imagemcard"/>
        <div className='nomeproduto'>{nome}</div>
        <div className='infoproduto'>
        <div className='precoproduto'>{preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
        <Link href={`/routes/soloroutes/produto/${id}`}><button className='botaoproduto'>Ir ao Produto</button></Link>
        </div>
        </div>
      </div>
 ))}
       </div>
    )
}