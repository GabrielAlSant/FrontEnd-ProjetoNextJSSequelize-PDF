import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid";
import Header from "../../../../components/header";


export default function CadastrarVendedor() {
  const [file, setFile] = useState();
  const [vendedor, setendedor] = useState({
    nome: "",
    cpf: "",
    dataInicio: "",
    turno: "",
    status: "",
    img: uuidv4(),

  });

  let router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const emptyFieldCheck = Object.values(vendedor).some(
      (element) => element === ""
    );
    if (emptyFieldCheck) {
      toast.error("Há algum campo vazio");
      return;
    }

    const data = {
      ...vendedor,
    };
    const url = "http://localhost:3002/vendedor"

    formData.append("nome", data.nome);
    formData.append("cpf", data.cpf);
    formData.append("dataInicio", data.dataInicio);
    formData.append("turno", data.turno);
    formData.append("status", data.status);
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
    setendedor({ ...vendedor, [id]: value });
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const { nome, cpf, dataInicio,turno, status, img } = vendedor;
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldcadastrarcomprovante">
          <legend>Cadastro de vendedor</legend>
          <div className="">
            <span className="ti" id="basic-addon1">
              Nome
            </span>
            <input
              id="nome"
              type="text"
              onChange={handleInputChange}
              value={vendedor.nome}
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
              value={vendedor.cpf}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="">
            <span className="" id="basic-addon1">
              Data de ínicio
            </span>
            <input
              id="dataInicio"
              type="date"
              onChange={handleInputChange}
              value={vendedor.dataInicio}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
           <div>
            <div>Turno</div>
            <select id="turno"
              type="text"
              onChange={handleInputChange}
              value={vendedor.turno}
              className="selectcad"
            >
              <option key={"Matutino"} value={"Matutino"}>
               Matutino
              </option>
              <option key={"Vespertino"} value={"Vespertino"}>
               Vespertino
              </option>
              <option key={"Noturno"} value={"Noturno"}>
               Noturno
              </option>
            </select>
           </div>
           <div>
            <div>Status</div>
            <select id="status"
              type="text"
              onChange={handleInputChange}
              value={vendedor.status}
            >
              <option key={"Operando"} value={"Operando"}>
                Operando
              </option>
              <option kay={"Desativo"} value={"Desativo"}>
                Desativo
              </option>
            </select>
           </div>
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