import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid";
import Header from "../../../../components/header";
import Image from "next/image"

export const getServerSideProps = async (context) => {
  const response = await axios.get("http://localhost:3002" + "/vendedores");
  const response1 = await axios.get("http://localhost:3002" + "/cliente");
  const response2 = await axios.get("http://localhost:3002" + "/produtos");
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
    const url = "http://localhost:3002/comprovante"

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




  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setendedor({ ...comprovante, [id]: value });
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const { nome, vendedorId, clienteId, produtoId, tipo, data,compravant } = comprovante;
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
