import Header from "../../../components/header";

export default function PagAdmin() {
    return (
        <div>
            <Header/>
            <div className="displayadmin">
                <a href="/routes/admin/cadastrar/cliente"><div className="cardadmin">
                    <div className="titleadmin">Cadastrar um Novo Cliente</div>
                    </div>
                    </a>
                <a href="/routes/admin/cadastrar/vendedor">
                <div className="cardadmin">
                    <div className="titleadmin">Cadastrar um Novo vendedor</div>
                    </div>
                </a>
                <a href="/routes/admin/cadastrar/produto">
                <div className="cardadmin">
                    <div className="titleadmin">Cadastrar um Novo produto</div>
                    </div>
                    </a> 
                <a href="/routes/admin/cadastrar/comprovante">
                    <div className="cardadmin">
                    <div className="titleadmin">Cadastrar uma nova venda</div>
                    </div>
                    </a> 
            </div >
        </div >
    )
}