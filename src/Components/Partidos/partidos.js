import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../Partidos/partidos.css";

const Partidos = props => {
    const [partidos, setPartidos] = useState([]);
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState("nome");
    const [inputValue, setInputValue] = useState("");
    const [sigla, setSigla] = useState("");

    const fetchData = async (page, order, sigla) => {
        const response = await axios.get(
            `https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=${order}&pagina=${page}&itens=20&sigla=${sigla}`
        );
        const { dados } = response.data;

        setPartidos(dados);
        setPage(page);
    };

    useEffect(() => {
        fetchData(page, order, sigla);
    }, [page, order, sigla]);

    const buscarPartido = e => {
        e.preventDefault();
        setSigla(inputValue);
    };

    const prevPage = () => {
        if (page === 1) return;

        const pageNumber = page - 1;
        setPage(pageNumber);
    };

    const nextPage = () => {
        if (page === 2) return;

        const pageNumber = page + 1;
        setPage(pageNumber);
    };

    const orderBy = field => {
        setPage(1);
        setOrder(field);
    };

    return (
        <div className="partidos-lista">
            <form className="search" onSubmit={buscarPartido}>
                <input
                    placeholder="Buscar partido pela sigla"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button className="search-button">Buscar</button>
            </form>
            <div className="partidos-ordenacao">
                <strong>Ordernar por</strong>
                <div className="buttons">
                    <div>
                        <button onClick={() => { orderBy("id") }}>Id</button>
                        <button onClick={() => { orderBy("sigla") }}>Sigla</button>
                        <button onClick={() => { orderBy("nome") }}>Nome</button>
                    </div>
                    <div>
                        <button onClick={() => { orderBy("dataInicio") }}>Data de inicio</button>
                        <button onClick={() => { orderBy("dataFim") }}>Data de fim</button>
                    </div>
                </div>
            </div>
            {partidos.map(partido => (
                <article key={partido.id} >
                    <strong>{partido.nome} - {partido.sigla}</strong>
                    <br></br>
                    <Link to={"/partido/" + partido.id}>Ver Detalhes</Link>
                </article>
            ))}
            <div className="partidos-buttons">
                <button disabled={page === 1} onClick={prevPage} >Anterior</button>
                <button disabled={page === 2} onClick={nextPage} >Próxima</button>
            </div>
        </div>
    )
}

export default Partidos;
