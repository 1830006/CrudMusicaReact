import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, titulo: "After Hours", grupo: "The Weeknd", genero: "Rock" },
  
];

class App extends React.Component {
  state = {
    data: data,
    actualizar: false,
    insertar: false,
    form: {
      id: "",
      titulo: "",
      grupo: "",
      genero: "",
    },
  };

  mostrarActualizar = (dato) => {
    this.setState({
      form: dato,
      actualizar: true,
    });
  };

  cerrarActualizar = () => {
    this.setState({ actualizar: false });
  };

  mostrarInsertar = () => {
    this.setState({
      insertar: true,
    });
  };

  cerrarInsertar = () => {
    this.setState({ insertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].titulo = dato.titulo;
        arreglo[contador].grupo = dato.grupo;
        arreglo[contador].genero = dato.genero;
      }
      contador++;
    });
    this.setState({ data: arreglo, actualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Se Eliminara la Cancion "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo,actualizar: false });
    }
  };

  insertar= ()=>{
    var valoract= {...this.state.form};
    valoract.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valoract);
    this.setState({ insertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Grupo</th>
                <th>Genero</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.titulo}</td>
                  <td>{dato.grupo}</td>
                  <td>{dato.genero}</td>

                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.actualizar}>
          <ModalHeader>
           <div><h3>Editar Informacion</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Titulo: 
              </label>
              <input
                className="form-control"
                name="titulo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.titulo}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Grupo: 
              </label>
              <input
                className="form-control"
                name="grupo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.grupo}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Genero: 
              </label>
              <input
                className="form-control"
                name="genero"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.genero}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.insertar}>
          <ModalHeader>
           <div><h3>Insertar Cancion</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Titulo: 
              </label>
              <input
                className="form-control"
                name="titulo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Grupo: 
              </label>
              <input
                className="form-control"
                name="grupo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            FormGroup>
              <label>
                Genero: 
              </label>
              <input
                className="form-control"
                name="genero"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
