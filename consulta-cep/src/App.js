import React, { useState } from "react";
import "./App.css";

function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 5) return numbers;
    return numbers.slice(0, 5) + "-" + numbers.slice(5, 8);
  };

  const buscarCep = async () => {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setErro("Por favor, digite um CEP válido com 8 dígitos.");
      setEndereco(null);
      return;
    }

    setIsLoading(true);
    setErro("");
    setEndereco(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro("CEP não encontrado. Verifique e tente novamente.");
      } else {
        setEndereco(data);
      }
    } catch (error) {
      setErro("Erro ao buscar CEP. Verifique sua conexão e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      buscarCep();
    }
  };

  const getStateName = (uf) => {
    const states = {
      AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas",
      BA: "Bahia", CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo",
      GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul",
      MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná",
      PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
      RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina",
      SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
    };
    return states[uf] || uf;
  };

  return (
    <div className="app-container">
      <div className="container">
        <div className="logo-section">
          <img
            src="./assets/iaragameslogo.png"
            alt="IARA Games Logo"
            className="logo-iara"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <div className="header">
          <h1 className="title">Consulta de CEP</h1>
          <p className="subtitle">Digite o CEP para buscar o endereço completo</p>
        </div>

        <div className="search-box">
          <div className="input-group">
            <label htmlFor="cepInput">CEP</label>
            <input
              id="cepInput"
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(formatCEP(e.target.value))}
              onKeyPress={handleKeyPress}
              maxLength={9}
            />
          </div>
          <button
            className="search-button"
            onClick={buscarCep}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                <span>Buscando...</span>
              </>
            ) : (
              <span>Buscar Endereço</span>
            )}
          </button>
        </div>

        {erro && (
          <div className="error-message show">
            <span className="error-icon">ERRO:</span>
            <span>{erro}</span>
          </div>
        )}

        {endereco && (
          <div className="result-card show">
            <h2 className="result-title">Endereço Encontrado</h2>
            <div className="info-row">
              <span className="info-label">CEP:</span>
              <span className="info-value">{endereco.cep}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Logradouro:</span>
              <span className="info-value">
                {endereco.logradouro || "Não informado"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Bairro:</span>
              <span className="info-value">
                {endereco.bairro || "Não informado"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Cidade:</span>
              <span className="info-value">{endereco.localidade}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Estado:</span>
              <span className="info-value">
                {endereco.uf} - {getStateName(endereco.uf)}
              </span>
            </div>
          </div>
        )}

        <div className="footer">
          <div className="footer-content">
            <img
              src="./assets/iaragameslogo.png"
              alt="IARA Games"
              className="footer-logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span>Desenvolvido por IARA Games</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
