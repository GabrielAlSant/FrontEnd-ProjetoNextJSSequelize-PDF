import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid";
import Header from "../../../../components/header";
import Image from "next/image"

export const getServerSideProps = async (context) => {
  const response = await axios.get("https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev" + "/vendedores");
  const response1 = await axios.get("https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev" + "/cliente");
  const response2 = await axios.get("https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev" + "/produtos");
  const attributes = await response.data;
  const attributes1 = await response1.data;
  const attributes2 = await response2.data;

  return {
    props: {
      attributes,
      attributes1,
      attributes2,
    },
  };
};
export default function Cadastrarcomprovante({attributes, attributes1, attributes2}) {
  const [file, setFile] = useState();
  const [comprovante, setendedor] = useState({
    vendedorId: "",
    clienteId: "",
    produtoId: "",
    valor: "",
    tipo: "",
    data: "",
    compravant: uuidv4(),

  });

  const handleInputChange = async (e) => {
    const { id, value } = e.target;
  
    if (id === "produtoId") {
      try {
        const response = await axios.get(`https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev/produto/${value}`);
        const produtoSelecionado = response.data;
  
        setendedor({
          ...comprovante,
          [id]: value,
          valor: produtoSelecionado ? produtoSelecionado.preco : "", 
        });
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
        // Trate o erro conforme necessário
      }
    } else {
      setendedor({ ...comprovante, [id]: value });
    }
  };
  
  

  let router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const emptyFieldCheck = Object.values(comprovante).some(
      (element) => element === ""
    );
    if (emptyFieldCheck) {
      toast.error("Há algum campo vazio");
      return;
    }

    const data = {
      ...comprovante,
    };
    const url = "https://d30d46f4-6bff-41c6-86f6-bd819958b76f-00-11b66wssx37sj.spock.replit.dev/comprovante"

    formData.append("vendedorId", data.vendedorId);
    formData.append("clienteId", data.clienteId);
    formData.append("produtoId", data.produtoId);
    formData.append("valor", data.valor);
    formData.append("tipo", data.tipo);
    formData.append("data", data.data);
    formData.append("compravant", data.compravant);
    formData.append("imageFile", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        router.push("/");
      })
      .catch((error) => {
        console.log(error.response);
      });
  }




 

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const {vendedorId, clienteId, produtoId,valor, tipo, data,compravant } = comprovante;
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldcadastrarcomprovante">
          <legend>Cadastro de comprovante</legend>
          <div className="">
            <div>Vendedor</div>
            <input
                  id="vendedorId"
                  onChange={handleInputChange}
                  value={comprovante.vendedorId}
                  className="form-control"
                  list="listavendedor"
                  type="text"
                />
            <datalist id="listavendedor">
                  {attributes.map(({ id, nome }) => (
                    <option key={id} value={id}>
                     {nome}
                    </option>
                  ))}
                </datalist>
          </div>
          <div className="">
            <div>Cliente</div>
            <input
              id="clienteId"
              type="text"
              onChange={handleInputChange}
              value={comprovante.clienteId}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              list="listacliente"
            />

<datalist id="listacliente">
                  {attributes1.map(({ id, nome }) => (
                    <option key={id} value={id}>
                     {nome}
                    </option>
                  ))}
                </datalist>

            <div>Produto</div>
            <input
              id="produtoId"
              type="text"
              onChange={handleInputChange}
              value={comprovante.produtoId}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              list="listaproduto"
            />
             <button onClick={(e) => { e.preventDefault(); setendedor({ ...comprovante, produtoId: '' }); }}>Limpar Campo</button>

<datalist id="listaproduto">
                  {attributes2.map(({ id, nome }) => (
                    <option key={id} value={id}>
                     {nome}
                    </option>
                  ))}
          </datalist>

            <div>Valor</div>
            <input id="valor"
              type="text"
              onChange={handleInputChange}
              value={comprovante.valor}
            >
            </input>
           
            <div>Tipo de Pagamento</div>
            <input id="tipo"
              type="text"
              onChange={handleInputChange}
              value={comprovante.tipo}
            >
            </input>

       <div>Data</div>
            <input id="data"
              type="date"
              onChange={handleInputChange}
              value={comprovante.data}
            >
            </input>
          </div>
          <div className="">
            <span className="" id="basic-addon1">
              Imagem
            </span>
            <input
              name="imageFile"
              id="imageFile"
              type="file"
              onChange={handleFileSelect} required
              className="form-control"
            />
          </div>
          <button className="" type="submit">
            Cadastrar
          </button>
        </fieldset>
      </form>
    </div>
  )
}
