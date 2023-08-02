import Header from "../../../../components/header";
import axios from 'axios'
import {useRouter} from "next/router"
import { v4 as uuidv4 } from "uuid";
import {useState} from 'react'

export default function CadastrarProduto(){
   const [file, setFile] = useState();
    const [produto, setproduto] = useState({

        nome:"",
        desc:"",
        img: uuidv4(),
        preco:"",
       
      });
    
      let router = useRouter();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const emptyFieldCheck = Object.values(produto).some(
          (element) => element === ""
        );
        if (emptyFieldCheck) {
          toast.error("Há algum campo vazio");
          return;
        }
    
        const data = {
          ...produto,
        };
        const url = "https://grumpy-duck-getup.cyclic.app//produto"
         
        
        formData.append("nome", data.nome);
        formData.append("desc", data.desc);
        formData.append("img", data.img);
        formData.append("preco", data.preco);
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
          setproduto({ ...produto, [id]: value });
        };
    
        const handleFileSelect = (e) => {
          setFile(e.target.files[0]);
        };
    
      const {nome, desc, img, preco } = produto;
    return(
        <div>
            <Header/>
            <form onSubmit={handleSubmit}>
        <fieldset className="fieldcadastrarcomprovante">
          <legend>Cadastro de Produto</legend>
          <div className="">
            <span className="" id="basic-addon1">
              Nome
            </span>
            <input
              id="nome"
              type="text"
              onChange={handleInputChange}
              value={produto.nome}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              maxLength={25}
              playceholder="seila"/>
            
            
          </div>
          <div className="">
            <span className="" id="basic-addon1">
             desc
            </span>
            <input
              id="desc"
              type="text"
              onChange={handleInputChange}
              value={produto.desc}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="">
            <span className="" id="basic-addon1">
              preco
            </span>
            <input
              id="preco"
              type="number"
              onChange={handleInputChange}
              value={produto.preco}
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
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