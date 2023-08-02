import Header from "../../../components/header";
import Link from "next/link";

export default function PagAdmin() {
    return (
        <div>
            <Header/>
            <div className="displayadmin">
                <Link href="/routes/admin/cadastrar/cliente"><div className="cardadmin">
                    <div className="titleadmin">Cadastrar um Novo Cliente</div>
                    </div>
                    </Link>
                <Link href="/routes/admin/cadastrar/vendedor">
                <div className="cardadmin">
                    <div className="titleadmin">Cadastrar um Novo vendedor</div>
                    </div>
                </Link>
                <Link href="/routes/admin/cadastrar/produto">
                <div className="cardadmin">
                    <div className="titleadmin">Cadastrar um Novo produto</div>
                    </div>
                    </Link> 
                <Link href="/routes/admin/cadastrar/comprovante">
                    <div className="cardadmin">
                    <div className="titleadmin">Cadastrar uma nova venda</div>
                    </div>
                    </Link> 
            </div >
        </div >
    )
}