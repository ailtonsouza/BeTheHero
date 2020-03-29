import React, { useState } from 'react';
import '../NewIncident/style.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../Services/api';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('OngId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        console.log(ongId);



        try {
            await api.post('Incidents', data, { headers: { Authorization: ongId } });
            history.push('/profile');

        }
        catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }


    }

    return (

        <div className="new-incident-container">

            <div className="content">

                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro de novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                         Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>



                </form>

            </div>

        </div>
    )
}