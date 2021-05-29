import React, { Component } from 'react';
import Axios from 'axios';
import './Atualizar.css';



class Atualizar extends Component {

    constructor() {
        super();
        this.state = {
            Livro: {},
            erro: "",
            titulo: "",
            imgCapa: "",
            autor: "",
            preco: "",

        }
    }

    // -----------------Buscar Livro---------------------------------
    getLivro = () => {
        fetch('http://localhost:3000/livros/' + localStorage.getItem('idLivro'))
            .then(response => response.json())
            .then(data => {
                this.setState({ Livro: data })
                this.setState({ titulo: data.titulo })
                this.setState({ imgCapa: data.imgCapa })
                this.setState({ autor: data.autor })
                this.setState({ preco: data.preco })
            })
    }
    // ----------------Atualizar Livro-------------------------
    setTitulo = (event) => {
        this.setState({ titulo: event.target.value })
    }
    setImg = (event) => {
        this.setState({ imgCapa: event.target.value })
    }
    setAutor = (event) => {
        this.setState({ autor: event.target.value })
    }
    setPreco = (event) => {
        this.setState({ preco: event.target.value })
    }

    atualizarLivro = (event) => {
        event.preventDefault();

        Axios.put("http://localhost:3000/livros/" + localStorage.getItem('idLivro'), {
            titulo: this.state.titulo,
            imgCapa: this.state.imgCapa,
            autor: this.state.autor,
            preco: this.state.preco,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ erro: "Livro Atualizado" })
                } else {
                    this.setState({ erro: "Erro ao Atualizar" })
                }
            })
    }

    componentDidMount() {
        this.getLivro();
    }

    render() {
        return (
            <div className="Att" >

                {/* --------------------Nav com input de busca------------------------------- */}
                <nav className='navHome'>

                    <h1>Atualizar livro</h1>

                </nav>

                <div className="divFormAtualizar">
                    <form onSubmit={this.atualizarLivro} className="formAtualizar">

                        {/* INPUT TITULO Do Livro */}
                        <div className="divAtualizarLivro" >
                            <label htmlFor="nome" className='labelLivro' >Titulo</label>
                            <input
                                required
                                className="input_cadastro"
                                style={{ width: '64vw' }}
                                type="text"
                                name="name"
                                onChange={this.setTitulo}
                                defaultValue={this.state.Livro.titulo}
                                minLength='5'
                            />
                        </div>

                        {/* INPUT URL IMG DO LIVRO */}
                        <div className="divAtualizarLivro" >
                            <label htmlFor="nome" className='labelLivro' style={{ marginTop: '1vh' }}>URL da imagem </label>
                            <input
                                required
                                className="input_cadastro"
                                style={{ width: '64vw' }}
                                type="url"
                                name="name"
                                defaultValue={this.state.Livro.imgCapa}
                                onChange={this.setImg}
                                minLength='5'
                            />
                        </div>


                        {/* INPUT URL REDIRECT PRA CAMPANHA */}
                        <div className="divAtualizarLivro" >
                            <label htmlFor="nome" className='labelLivro' style={{ marginTop: '1vh' }}>Autor</label>
                            <input
                                required
                                className="input_cadastro"
                                style={{ width: '64vw' }}
                                type="text"
                                name="name"
                                defaultValue={this.state.Livro.autor}
                                onChange={this.setAutor}
                                minLength='5'
                            />
                        </div>
                        {/* INPUT URL REDIRECT PRA CAMPANHA */}
                        <div className="divAtualizarLivro" >
                            <label htmlFor="nome" className='labelLivro' style={{ marginTop: '1vh' }}>Preço</label>
                            <input
                                required
                                className="input_cadastro"
                                style={{ width: '64vw' }}
                                type="number"
                                inputMode="numeric"
                                min="0.00"
                                step="0.01"
                                name="name"
                                defaultValue={this.state.Livro.preco}
                                onChange={this.setPreco}
                                minLength='5'
                            />
                        </div>

                        <div style={{ maxHeight: "3vh", marginBottom: '5px' }}>
                            <p style={{ color: "#868686", textAlign: "center", fontSize: '20px', marginTop: "-5px" }}>{this.state.erro}</p>
                        </div>
                        <div    className="btn">

                            <button className="btnSubmit" type='submit' style={{ marginTop: "67.5vh", position: 'absolute', borderColor: 'grey' }}>
                                Atualizar
                        </button >

                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default Atualizar;