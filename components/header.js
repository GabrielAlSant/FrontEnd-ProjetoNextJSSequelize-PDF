import Image from 'next/image'
import Link from 'next/link'

export default function Header(){
    return (
        <div>
        <div className="header">
        <Image className='imagem' src={"/../public/sacolas-de-compras.png"} width={70} height={70} />
        <Link href='/'><h2>Loja de Produtos</h2></Link>
         <ul className="list">
            <Link href="/routes/admin/adminpage"><li><span className="item-list">Administrar</span></li></Link>
            <Link href="/routes/produtos"><li><span className="item-list">Produtos</span></li></Link>
            <Link href="/routes/clientes"><li><span className="item-list">Clientes</span></li></Link>
            <Link href="/routes/vendedores"><li><span className="item-list">Vendedores</span></li></Link>
           <Link href="/routes/comprovantes"><li><span className="item-list">Vendas</span></li></Link>
         </ul>
        </div>
        </div>
    )
}
