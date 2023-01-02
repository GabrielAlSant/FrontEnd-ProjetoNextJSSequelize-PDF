import Image from 'next/image'

export default function Header(){
    return (
        <div>
        <div className="header">
        <Image className='imagem' src={"/../public/sacolas-de-compras.png"} width={70} height={70} />
        <a href='/'><h2>Nova Mania Variedades</h2></a>
         <ul className="list">
            <a href="/routes/produtos"><li><span className="item-list">Produtos</span></li></a>
            <a href="/routes/clientes"><li><span className="item-list">Clientes</span></li></a>
            <a href="/routes/vendedores"><li><span className="item-list">Vendedores</span></li></a>
           <a href="/routes/admin/adminpage"><li><span className="item-list">Login</span></li></a>
         </ul>
        </div>
        </div>
    )
}
