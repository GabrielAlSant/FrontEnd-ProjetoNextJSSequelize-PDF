import Image from "next/image"


export default function CardProdutos ({produtos}){

    return (
        <div className='produtosindex'>
         {produtos.map(({id,nome, desc, img, preco})=>(
           <div key={id}>
        <div className='card'>
        <Image src={`https://grumpy-duck-getup.cyclic.app//produto/img/${id}`} width={200} height={200} className="imagemcard"/>
        <div className='nomeproduto'>{nome}</div>
        <div className='infoproduto'>
        <div className='precoproduto'>{preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
        <button className='botaoproduto'>Ir ao Produto</button>
        </div>
        </div>
      </div>
 ))}
       </div>
    )
}