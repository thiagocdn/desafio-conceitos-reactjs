import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [listaRepositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: "none",
      techs: ["none"]
    });

    const repository = response.data;

    setRepository([...listaRepositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepository(listaRepositories.filter(response => response.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {listaRepositories.map(repository => 

          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
