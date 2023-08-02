import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid";
import Header from "../../../../components/header";


export default function Cadastrarcliente() {
  const [file, setFile] = useState();
  const [cliente, setendedor] = useState({
    nome: "",
    cpf: "",
    dataInicio: "",
    img: uuidv4(),

  });

  let router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const emptyFieldCheck = Object.values(cliente).some(
      (element) => element === ""
    );
    if (emptyFieldCheck) {
      toast.error("Há algum campo vazio");
      return;
    }

    const data = {
      ...cliente,
    };
    const url = "https://grumpy-duck-getup.cyclic.app//cliente"

    formData.append("nome", data.nome);
    formData.append("cpf", data.cpf);
    formData.append("dataInicio", data.dataInicio);
    formData.append("img", data.img);
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
    setendedor({ ...cliente, [id]: value });
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const { nome, cpf, dataInicio, img } = cliente;
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldcadastrarcomprovante">
          <legend>Cadastro de cliente</legend>
          <div className="">
            <span className="" id="basic-addon1">
              Nome
            </span>
            <input
              id="nome"
              type="text"
              onChange={handleInputChange}
              value={cliente.nome}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              maxLength={25}
            />
          </div>
          <div className="">
            <span className="" id="basic-addon1">
              CPF
            </span>
            <input
              id="cpf"
              type="text"
              onChange={handleInputChange}
              value={cliente.cpf}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="">
            <span className="" id="basic-addon1">
              Data de Cadastro
            </span>
            <input
              id="dataInicio"
              type="date"
              onChange={handleInputChange}
              value={cliente.dataInicio}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="">
            <span className="" id="basic-addon1">
              Foto
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