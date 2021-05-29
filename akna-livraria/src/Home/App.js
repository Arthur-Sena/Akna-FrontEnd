import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';

import Menu from '../Assets/list.svg';
import Close from '../Assets/x.svg';

class App extends Component {

  constructor() {
    super();
    this.state = {
      busca: '',
      listaLivros: [],
      livrosFiltrados: [],
      eventKey: false,
    }
  }

  // -----------------Listar Livros---------------------------------
  getLivros = () => {
    fetch('http://localhost:3000/livros')
      .then(response => response.json())
      .then(data => this.setState({ listaLivros: data }) + this.setState({ livrosFiltrados: data }))
  }
  // -----------------Filtrar Lista------------------------------- --
  atualizaEstado(event) {
    this.setState({ busca: event.target.value }, () => {
      this.FiltrarLivros();
    })
  }
  FiltrarLivros() {
    let listaFiltrada = this.state.listaLivros;
    if (this.state.busca != "") {

      listaFiltrada = listaFiltrada.filter(
        x =>
          x.titulo.toLowerCase().includes(this.state.busca.toLowerCase()) ||
          x.autor.toLowerCase().includes(this.state.busca.toLowerCase())
      );
    }
    this.setState({ livrosFiltrados: listaFiltrada });
  }

  //------------------Deletar Livro-----------------------------------
  ExcluirLivro = (event) => {
    Axios.delete('http://localhost:3000/livros/' + event.target.value)
    window.location.reload();
  }
  // -----------------Atualizar Livro----------------------------------
  AtualizarLivro = (event) => {
    console.log(event.target.value);
    localStorage.setItem('idLivro', event.target.value);
    this.props.history.push('AtualizarLivro');
  }
  // -----------------Dropdown----------------------------------------
  eventTrue = (event) => {

    if (this.state.eventKey === false) {
      this.setState({ eventKey: true })
    } else {
      this.setState({ eventKey: false })
    }
  }

  componentDidMount() {
    this.getLivros();
  }

  render() {
    return (
      <div className="App" >

        {/* --------------------Nav com input de busca------------------------------- */}
        <nav className='navHome'>

          <input
            className="inputBuscar"
            placeholder="   Pesquise pelo livro ou autor"
            onChange={this.atualizaEstado.bind(this)}
          ></input>

        </nav>

        {/* ----------------------------Listas de livros-------------------------- */}

        <div className='divMain'>

          <div className='divLista'>

            {this.state.livrosFiltrados.map(x => {
              return (

                <div className="infoLivro">
                  {/* ------------------------Dropdown----------------------- */}
                  {this.state.eventKey === false ? (
                    <button onClick={() => { this.eventTrue() }} className='btnEvent'>
                      <img src={Menu} />
                    </button>
                  ) : (
                    <button onClick={() => { this.eventTrue() }} className='btnEvent'>
                      <img src={Close}     ></img>
                    </button>
                  )
                  }

                  {this.state.eventKey === false ? (
                    <div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                      <button
                        style={{ backgroundColor: 'white', borderColor: 'grey', height: '20px' }}
                        value={x.id}
                        onClick={this.AtualizarLivro}
                      >
                        Atualizar
                      </button>

                      <button
                        style={{ backgroundColor: 'white', borderColor: 'grey', height: '20px' }}
                        value={x.id}
                        onClick={this.ExcluirLivro}
                      >
                        Excluir
                      </button>
                    </div>
                  )}

                  {/* ------------------------Fim DropDown------------------------------- */}

                  <img src={x.imgCapa} className='capaLivro' />
                  <div className="descricaoLivro">
                    <p className='tituloLivro'>
                      <strong>{x.titulo}</strong>
                      <br></br>
                      {x.autor}
                    </p>
                    <p>R${x.preco}</p>
                  </div>
                </div>

              );
            })}

          </div>

        </div>

      </div>
    );
  }
}

export default App;