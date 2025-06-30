import React, { useState } from "react";
import "./CadastroRelatorioDespesa.css"; // Arquivo de estilos separado

function CadastroRelatorioDespesa (){
    const [formData, setFormData] = useState({
        dt_pagamento: "",
        ds_relatorio: "",
        vl_pago: "",
        recibo: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "recibo") {
        setFormData({ ...formData, recibo: files[0] });
        } else {
        setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("dt_pagamento", formData.dt_pagamento);
    data.append("ds_relatorio", formData.ds_relatorio);
    data.append("vl_pago", formData.vl_pago);
    data.append("recibo", formData.recibo);

    try {
        const response = await fetch("http://localhost:5000/relatorio/cadastro", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajuste conforme sua autenticação
        },
        body: data,
        });

        const result = await response.json();

        if (response.ok) {
        alert("Relatório enviado com sucesso!");
        console.log("Resposta do servidor:", result);

        setFormData({
            dt_pagamento: "",
            ds_relatorio: "",
            vl_pago: "",
            recibo: null,
        });
        } else {
        alert(`Erro: ${result.message}`);
        }
    } catch (error) {
        console.error("Erro ao enviar relatório:", error);
        alert("Erro ao enviar relatório. Tente novamente.");
    }
    };

    return (
        <div className="form-container">
        <h2>Cadastro de Relatório de Despesa</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Data de Pagamento:</label>
            <input
                type="date"
                name="dt_pagamento"
                value={formData.dt_pagamento}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label>Descrição:</label>
            <textarea
                name="ds_relatorio"
                value={formData.ds_relatorio}
                onChange={handleChange}
                rows="3"
                required
            />
            </div>
            <div className="form-group">
            <label>Valor Pago (R$):</label>
            <input
                type="number"
                step="0.01"
                name="vl_pago"
                value={formData.vl_pago}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label>Upload do Recibo:</label>
            <input
                type="file"
                name="recibo"
                accept="image/*,.pdf"
                onChange={handleChange}
                // required
            />
            </div>
            <button type="submit">Enviar Relatório</button>
        </form>
        </div>
    );
}

export default CadastroRelatorioDespesa