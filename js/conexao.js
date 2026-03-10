//Bases da URL
const BASE_CONSULTA = "https://localhost:7116/api/Consulta";
const BASE_DENTISTA = "https://localhost:7116/api/Dentista";
const BASE_PACIENTE = "https://localhost:7116/api/Paciente";
const BASE_RECEITA = "https://localhost:7116/api/Receita";

//URL Consultas
const url_listarConsultas = `${BASE_CONSULTA}/ListarConsultas`;
const url_criarConsulta = `${BASE_CONSULTA}/CriarConsulta`;
const url_editarConsulta = `${BASE_CONSULTA}/EditarConsulta`;
const url_ExcluirConsulta = `${BASE_CONSULTA}/ExcluirConsulta`;

//URL Dentista
const url_listarDentista = `${BASE_DENTISTA}/ListarDentistas`;
const url_criarDentista = `${BASE_DENTISTA}/CriarDentista`;
const url_editarDentista = `${BASE_DENTISTA}/EditarDentista`;
const url_excluirDentista = `${BASE_DENTISTA}/ExcluirDentista`;

//URL Paciente
const url_listarPacientes = `${BASE_PACIENTE}/ListarPacientes`;
const url_criarPaciente = `${BASE_PACIENTE}/CriarPaciente`;
const url_editarPaciente = `${BASE_PACIENTE}/EditarPaciente`;
const url_excluirPaciente = `${BASE_PACIENTE}/ExcluirPaciente`;

//URL Receita
const url_listarReceitas = `${BASE_RECEITA}/ListarReceitas`;
const url_criarReceita = `${BASE_RECEITA}/CriarReceita`;
const url_editarReceita = `${BASE_RECEITA}/EditarReceita`;
const url_excluirReceita = `${BASE_RECEITA}/excluirReceita`;

const loadingElement = document.querySelector("#loading");

//Função de busca
function configurarBuscaGeral() {
    const inputBusca = document.querySelector("#input-busca");
    if (!inputBusca) return;

    inputBusca.replaceWith(inputBusca.cloneNode(true));
    const novoInput = document.querySelector("#input-busca");

    novoInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            const valorBusca = novoInput.value.trim();
            const cards = document.querySelectorAll(".card-paciente");

            cards.forEach(card => {
                const spanId = card.querySelector(".paciente-id-valor, .dentista-id-valor");

                if (spanId) {
                    const idNoCard = spanId.innerText.trim();

                    if (valorBusca === "" || idNoCard === valorBusca) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                }
            });
        }
    });
}

// Listar Pacientes (telaPacientes.html)
const gridPacientes = document.querySelector(".grid-pacientes");
async function ListarPacientes() {
    const grid = document.querySelector(".grid-pacientes");

    try {
        const response = await fetch(url_listarPacientes);
        const data = await response.json();

        if (loadingElement) loadingElement.classList.add("hide");

        if (!grid) {
            console.warn("Elemento .grid-pacientes não encontrado nesta página.");
            return;
        }

        grid.innerHTML = "";

        const pacientes = data.dados;

        pacientes.forEach((paciente) => {
            const card = document.createElement("div");
            card.classList.add("card-paciente");

            const nome = paciente.nome || "Sem nome";
            const id = paciente.id || "---";
            const telefone = paciente.telefone || "Não informado";

            card.innerHTML = `
                <div class="card-info">
                    <h3>${nome}</h3>
                    <p><span>ID:</span> #<span class="paciente-id-valor">${id}</span></p>
                    <p><span>Telefone:</span> ${telefone}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
    }
}

//listar dentistas (telaDentistas.html)
async function ListarDentistas() {
    try {
        const response = await fetch(url_listarDentista);
        const data = await response.json();
        const grid = document.querySelector(".grid-pacientes"); 
        if (loadingElement) loadingElement.classList.add("hide");

        if (!grid) return;

        grid.innerHTML = "";

        const dentistas = data.dados;

        dentistas.forEach((dentista) => {
            const card = document.createElement("div");
            card.classList.add("card-paciente");

            const nome = dentista.nome || "Sem nome";
            const id = dentista.id || "---";
            const especializacao = dentista.especializacao || "Geral";

            card.innerHTML = `
                <div class="card-info">
                    <h3>${nome}</h3>
                    <p><span>ID:</span> #<span class="dentista-id-valor">${id}</span></p>
                    <p><span>Especialidade:</span> ${especializacao}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar dentistas:", error);
        const grid = document.querySelector(".grid-pacientes");
        if (grid) grid.innerHTML = "<p>Erro ao carregar dentistas.</p>";
    }
}

//Criar paciente(criarcontar.html/paciente)
async function CriarPaciente(event) {
    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const cpf = document.querySelector("#cpf").value.toString();
    const telefone = document.querySelector("#telefone").value.toString();
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    const novoPaciente = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email,
        senha: senha
    };

    console.log("Tentando criar:", novoPaciente);

    try {
        const response = await fetch(url_criarPaciente, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoPaciente)
        });

        if (response.ok) {
            alert("Paciente criado com sucesso!");
            window.location.href = "login.html";
        } else {
            const erro = await response.json();
            alert("Erro na API: " + (erro.mensagem || "Verifique os campos"));
        }
    } catch (error) {
        console.error("Erro ao conectar:", error);
        alert("A API está offline ou o link está errado.");
    }
}

//Editar paciente (configPaciente.html)
async function EditarPaciente(event) {
    event.preventDefault();

    const idValue = document.querySelector("#edit-id-input").value;

    if (!idValue) {
        alert("Por favor, informe o seu ID para editar.");
        return;
    }

    const dadosAtualizados = {
        id: parseInt(idValue),
        nome: document.querySelector("#edit-nome").value,
        cpf: document.querySelector("#edit-cpf").value.toString(),
        telefone: document.querySelector("#edit-telefone").value.toString(),
        email: document.querySelector("#edit-email").value,
        senha: document.querySelector("#edit-senha").value
    };

    console.log("Dados que serão enviados:", dadosAtualizados);

    try {
        const response = await fetch(url_editarPaciente, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosAtualizados)
        });

        const resultado = await response.json();

        if (response.ok) {
            alert("Paciente atualizado com sucesso!");
            window.location.href = "../paciente/inicioPaciente.html";
        } else {
            alert("Erro na API: " + (resultado.mensagem || "Erro ao atualizar"));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar à API para editar.");
    }
}

//Excluir paciente (configPaciente.html)
async function ExcluirPaciente() {
    const id = document.querySelector("#edit-id-input").value;

    if (!id) {
        alert("Por favor, informe seu ID.");
        return;
    }

    if (confirm("Deseja realmente excluir sua conta?")) {
        try {
            const response = await fetch(`${url_excluirPaciente}?id=${id}`, {
                method: "DELETE"
            });

            const resultado = await response.json();

            if (response.ok && resultado.status !== false) {
                alert(resultado.mensagem);
                window.location.href = "../index.html";
            } else {
                alert("Erro: " + (resultado.mensagem || "Não foi possível excluir. Verifique se o ID existe."));
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar com a API.");
        }
    }
}
//Excluir dentista(configDentista)
async function ExcluirDentista() {
    const id = document.querySelector("#edit-id-input").value;

    if (!id) {
        alert("Por favor, informe seu ID.");
        return;
    }

    if (confirm("Deseja realmente excluir sua conta?")) {
        try {
            const response = await fetch(`${url_excluirDentista}?id=${id}`, {
                method: "DELETE"
            });

            const resultado = await response.json();

            if (response.ok && resultado.status !== false) {
                alert(resultado.mensagem);
                window.location.href = "../index.html";
            } else {
                alert("Erro: " + (resultado.mensagem || "Não foi possível excluir. Verifique se o ID existe."));
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar com a API.");
        }
    }
}

//Editar dentista (configDentista)
async function EditarDentista(event) {
    event.preventDefault();

    const idValue = document.querySelector("#edit-id-input").value;

    if (!idValue) {
        alert("Por favor, informe o seu ID para editar.");
        return;
    }

    const dadosAtualizados = {
        id: parseInt(idValue),
        nome: document.querySelector("#edit-nome").value,
        especializacao: document.querySelector("#edit-esp").value,
        telefone: document.querySelector("#edit-telefone").value.toString(),
        email: document.querySelector("#edit-email").value,
        senha: document.querySelector("#edit-senha").value
    };

    console.log("Dados que serão enviados:", dadosAtualizados);

    try {
        const response = await fetch(url_editarDentista, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosAtualizados)
        });

        const resultado = await response.json();

        if (response.ok) {
            alert("Dentista atualizado com sucesso!");
            window.location.href = "../dentista/inicioDentista.html";
        } else {
            alert("Erro na API: " + (resultado.mensagem || "Erro ao atualizar"));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar à API para editar.");
    }
}

//Criar dentista(criarconta.html/dentista)
async function CriarDentista(event) {
    event.preventDefault();

    const nome = document.querySelector("#nome-dentista").value;
    const especializacao = document.querySelector("#especializacao-dentista").value;
    const telefone = document.querySelector("#telefone-dentista").value.toString();
    const email = document.querySelector("#email-dentista").value;
    const senha = document.querySelector("#senha-dentista").value;

    const novoDentista = {
        nome: nome,
        especializacao: especializacao,
        telefone: telefone,
        email: email,
        senha: senha
    };

    console.log("Enviando Dentista:", novoDentista);

    try {
        const response = await fetch(url_criarDentista, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoDentista)
        });

        if (response.ok) {
            alert("Dentista cadastrado com sucesso!");
            window.location.href = "login.html";
        } else {
            const erro = await response.json();
            alert("Erro ao criar dentista: " + (erro.mensagem || "Verifique os dados"));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar à API.");
    }
}

// Listar Dentistas (telaDentistas.html)
async function ListarDentistas() {
    try {
        const response = await fetch(url_listarDentista);
        const data = await response.json();

        if (loadingElement) loadingElement.classList.add("hide");

        if (gridPacientes) {
            gridPacientes.innerHTML = "";
        } else return;

        const dentistas = data.dados;

        dentistas.forEach((dentista) => {
            const card = document.createElement("div");
            card.classList.add("card-paciente");

            const nome = dentista.nome || dentista.Nome || "Sem nome";
            const id = dentista.id || dentista.Id || "---";
            const especializacao = dentista.especializacao || dentista.especializacao || "Geral";

            card.innerHTML = `
                <div class="card-info">
                    <h3>${nome}</h3>
                    <p><span>ID:</span> #<span class="dentista-id-valor">${id}</span></p>
                    <p><span>Especialidade:</span> ${especializacao}</p>
                </div>
            `;
            gridPacientes.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar dentistas:", error);
        if (gridPacientes) gridPacientes.innerHTML = "<p>Erro ao carregar dentistas.</p>";
    }
}

// Listar Consultas Dentista (consultasDentista.html)
const listaConsulta = document.querySelector(".lista-consultas");

async function ListarConsultas() {
    const containerCards = document.querySelector("#lista-cards-consultas");

    try {
        const response = await fetch(url_listarConsultas);
        const data = await response.json();

        if (loadingElement) loadingElement.classList.add("hide");
        if (!containerCards) return;

        containerCards.innerHTML = "";

        const consultas = data.dados;

        consultas.forEach((consulta) => {
            const item = document.createElement("details");
            item.classList.add("consulta-item");

            const idConsulta = consulta.id;
            const idUsuario = consulta.pacienteId || consulta.dentistaId;

            item.innerHTML = `
                <summary>
                    <span class="data-hora">${new Date(consulta.data_Horario).toLocaleString('pt-BR')}</span>
                    <span class="consulta-id-ref" style="display:none">${idConsulta}</span>
                    <span class="usuario-id-ref" style="display:none">${idUsuario}</span>
                </summary>
                <div class="consulta-conteudo">
                    <p><strong>ID Consulta:</strong> #${idConsulta}</p>
                    <p><strong>Paciente:</strong> ${consulta.paciente?.nome || "---"} (ID: ${consulta.pacienteId || 'N/A'})</p>
                    <p><strong>Dentista:</strong> ${consulta.dentista?.nome || "---"}</p>
                    
                </div>
            `;
            containerCards.appendChild(item);
        });
    } catch (error) {
        console.error("Erro ao carregar consultas:", error);
    }
}

//configurar busca da consulta
function configurarBuscaConsultas() {
    const inputConsulta = document.querySelector("#input-busca-consulta");
    const inputIdUsuario = document.querySelector("#input-busca-dentista-id") || document.querySelector("#input-busca-paciente-id");

    const filtrar = (valor, classeAlvo) => {
        const itens = document.querySelectorAll(".consulta-item");
        itens.forEach(item => {
            const spanId = item.querySelector(classeAlvo);
            if (spanId) {
                const idNoCard = spanId.innerText.trim();
                if (valor === "" || idNoCard === valor) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            }
        });
    };

    if (inputConsulta) {
        inputConsulta.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (inputIdUsuario) inputIdUsuario.value = "";
                filtrar(inputConsulta.value.trim(), ".consulta-id-ref");
            }
        });
    }

    if (inputIdUsuario) {
        inputIdUsuario.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                inputConsulta.value = "";
                filtrar(inputIdUsuario.value.trim(), ".usuario-id-ref");
            }
        });
    }
}

//listar receitas Dentista (receitasDentista.html)
async function ListarReceitas() {
    const containerCards = document.querySelector("#lista-cards-receitas");
    const loadingElement = document.querySelector("#loading");

    try { 
        const response = await fetch(url_listarReceitas);
        const data = await response.json();

        if (loadingElement) loadingElement.classList.add("hide");

        if (!containerCards) {
            console.error("Erro: Container #lista-cards-receitas não encontrado no HTML.");
            return;
        }

        containerCards.innerHTML = "";

        console.log("Dados recebidos da API:", data);

        if (!data || data.status === false || !data.dados || !Array.isArray(data.dados)) {
            console.warn("Nenhuma receita encontrada ou erro na API:", data?.mensagem);
            containerCards.innerHTML = `<p class="aviso-vazio">${data?.mensagem || "Nenhuma receita disponível."}</p>`;
            return;
        }

        const receitas = data.dados;

        receitas.forEach((receita) => {
            const item = document.createElement("details");
            item.classList.add("consulta-item");

            const idReceita = receita.id || "---";
            const idConsultaRef = receita.consultaId || "---";
            const idDentistaReal = receita.dentistaId !== undefined ? receita.dentistaId : "---";

            item.innerHTML = `
                <summary>
                    <span class="data-hora">Receita #${idReceita}</span>
                    <span class="receita-id-ref" style="display:none">${idReceita}</span>
                    <span class="usuario-id-ref" style="display:none">${idDentistaReal}</span>
                </summary>
                <div class="consulta-conteudo">
                    <p><strong>ID Consulta:</strong> #${idConsultaRef}</p>
                    <p><strong>Remédio:</strong> ${receita.remedio || "Não informado"}</p>
                    <p><strong>Prescrição:</strong> ${receita.prescricao || "Não informado"}</p>
                </div>
            `;

            containerCards.appendChild(item);
        });

        console.log(`Sucesso: ${receitas.length} receitas renderizadas.`);

    } catch (error) { 
        console.error("Erro técnico ao carregar receitas:", error);
        if (containerCards) {
            containerCards.innerHTML = "<p>Erro ao conectar com o servidor. Tente novamente mais tarde.</p>";
        }
    }
}

function configurarBuscaReceitasPaciente() {
    const inputBusca = document.querySelector("#input-busca-paciente-id");
    if (!inputBusca) return;

    inputBusca.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const valorBusca = inputBusca.value.trim();

            await BuscarReceitasPorPacienteId(valorBusca);
        }
    });
}

//listar receitas por id paciente
async function ListarReceitasPaciente() {
    const containerCards = document.querySelector("#lista-cards-receitas-paciente");
    const loading = document.querySelector("#loading");
    if (!containerCards) return;

    try {
        const response = await fetch(url_listarReceitas);
        const data = await response.json();
        const receitas = data.dados || data;

        containerCards.innerHTML = "";

        receitas.forEach((receita) => {
            const item = document.createElement("details");
            item.classList.add("consulta-item");
            item.innerHTML = `
                <summary><span class="data-hora">Receita #${receita.id}</span></summary>
                <div class="consulta-conteudo">
                    <p><strong>Consulta ID:</strong> #${receita.consultaId}</p>
                    <p><strong>Remédio:</strong> ${receita.remedio}</p>
                    <p><strong>Prescrição:</strong> ${receita.prescricao}</p>
                </div>`;
            containerCards.appendChild(item);
        });
    } catch (error) {
        console.error("Erro ao listar inicial:", error);
    } finally {
        if (loading) loading.classList.add("hide");
    }
}

//configurar busca receita do id paciente
async function BuscarReceitasPorPacienteId(idPaciente) {
    const containerCards = document.querySelector("#lista-cards-receitas-paciente");
    if (!containerCards) return;

    if (!idPaciente) {
        await ListarReceitasPaciente();
        return;
    }

    try {
        const response = await fetch(`${BASE_RECEITA}/ListarReceitasPorPacienteId/${idPaciente}`);
        const data = await response.json();
        const receitas = data.dados || data;

        containerCards.innerHTML = "";

        if (!receitas || receitas.length === 0) {
            containerCards.innerHTML = "<p style='padding:20px;'>Nenhuma receita encontrada para este ID de paciente.</p>";
            return;
        }

        receitas.forEach((receita) => {
            const item = document.createElement("details");
            item.classList.add("consulta-item");
            item.innerHTML = `
                <summary><span class="data-hora">Receita #${receita.id}</span></summary>
                <div class="consulta-conteudo">
                    <p><strong>Remédio:</strong> ${receita.remedio}</p>
                    <p><strong>Prescrição:</strong> ${receita.prescricao}</p>
                </div>`;
            containerCards.appendChild(item);
        });
    } catch (error) {
        console.error("Erro na busca por ID:", error);
    }
}

function configurarBuscaReceitasPorDentista() {
    const inputBusca = document.querySelector("#input-busca-dentista-id");

    if (inputBusca) {
        inputBusca.addEventListener("input", () => {
            const valorDigitado = inputBusca.value.trim();
            const cards = document.querySelectorAll(".consulta-item");

            console.log("--- TESTE DE BUSCA ---");
            console.log("Valor que você digitou:", valorDigitado);

            cards.forEach(card => {
                const idNoCard = card.querySelector(".usuario-id-ref")?.textContent.trim();
                console.log("ID encontrado neste card:", idNoCard);

                if (valorDigitado === "" || idNoCard === valorDigitado) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
}

function configurarCalendarioMinimo() {
    const inputData = document.querySelector("#consulta-data");
    if (inputData) {
        const agora = new Date();
        agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
        const dataMinima = agora.toISOString().slice(0, 16);
        inputData.min = dataMinima;
        console.log("Data mínima do calendário definida para:", dataMinima);
    }
}
//criar consultas 
async function CriarConsulta(event) {
    event.preventDefault();

    const inputData = document.querySelector("#consulta-data").value;
    if (!inputData) {
        alert("Por favor, selecione uma data e horário.");
        return;
    }
    let dataObjeto = new Date(inputData);
    dataObjeto.setMinutes(dataObjeto.getMinutes() + 10);

    const ano = dataObjeto.getFullYear();
    const mes = String(dataObjeto.getMonth() + 1).padStart(2, '0');
    const dia = String(dataObjeto.getDate()).padStart(2, '0');
    const hora = String(dataObjeto.getHours()).padStart(2, '0');
    const minuto = String(dataObjeto.getMinutes()).padStart(2, '0');

    const dataFormatadaLocal = `${ano}-${mes}-${dia}T${hora}:${minuto}:00`;

    const corpo = {
        pacienteId: parseInt(document.querySelector("#consulta-paciente-id").value),
        dentistaId: parseInt(document.querySelector("#consulta-dentista-id").value),

        data_Horario: document.querySelector("#consulta-data").value,

        sintoma: document.querySelector("#consulta-sintoma").value || "Nenhum",
        tratamento: document.querySelector("#consulta-tratamento").value || "A definir",
        procedimento: document.querySelector("#consulta-procedimento").value || "A definir"
    };

    console.log("Enviando para API (Local Time):", dataFormatadaLocal);

    try {
        const response = await fetch(url_criarConsulta, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpo)
        });

        const result = await response.json();

        if (response.ok && result.status !== false) {
            alert("Consulta agendada com sucesso!");
            window.location.href = "../paciente/inicioPaciente.html";
        } else {
            alert("Erro da API: " + (result.mensagem || "Erro desconhecido"));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro de conexão.");
    }
}

//editar consultas
async function EditarConsulta(event) {
    event.preventDefault();

    const dadosAtualizados = {
        id: parseInt(document.querySelector("#edit-consulta-id").value),
        pacienteId: parseInt(document.querySelector("#edit-paciente-id").value),
        dentistaId: parseInt(document.querySelector("#edit-dentista-id").value),
        data_Horario: document.querySelector("#edit-consulta-data").value,
        sintoma: document.querySelector("#edit-consulta-sintoma").value || "Nenhum",
        tratamento: document.querySelector("#edit-consulta-tratamento").value || "A definir",
        procedimento: document.querySelector("#edit-consulta-procedimento").value || "A definir"
    };

    console.log("Dados que serão enviados para a API:", dadosAtualizados);

    try {
        const response = await fetch(url_editarConsulta, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAtualizados)
        });

        const resultado = await response.json();

        if (response.ok && resultado.status !== false) {
            alert("Consulta atualizada com sucesso!");
            window.location.href = "../paciente/inicioPaciente.html";
        } else {
            alert("Erro na API: " + (resultado.mensagem || "Erro ao atualizar"));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar à API.");
    }
}

// Excluir Consulta
async function excluirConsulta(id) {
    if (!confirm("Deseja realmente cancelar/excluir esta consulta?")) {
        return;
    }

    try {
        const response = await fetch(`${url_ExcluirConsulta}?idConsulta=${id}`, {
            method: "DELETE"
        });

        const resultado = await response.json();

        if (response.ok && resultado.status !== false) {
            alert(resultado.mensagem || "Consulta excluída com sucesso!");
            window.location.href = "../paciente/inicioPaciente.html";
        } else {
            alert("Erro ao excluir: " + (resultado.mensagem || "Verifique se o ID existe."));
        }
    } catch (error) {
        console.error("Erro na requisição de exclusão:", error);
        alert("Não foi possível conectar à API.");
    }
}

function configurarBuscaReceitas() {
    const inputBusca = document.querySelector("#input-busca-receita");

    if (inputBusca) {
        inputBusca.addEventListener("input", () => {
            const valorBusca = inputBusca.value.trim();
            const cards = document.querySelectorAll(".consulta-item");

            cards.forEach(card => {
                const idReceitaNoCard = card.querySelector(".receita-id-ref")?.textContent || "";

                if (valorBusca === "" || idReceitaNoCard === valorBusca) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
}

//criar receita
async function CriarReceita(event) {
    event.preventDefault();

    const corpo = {
        consultaId: parseInt(document.querySelector("#receita-consulta-id").value),
        prescricao: document.querySelector("#receita-prescricao").value,
        remedio: document.querySelector("#receita-remedio").value
    };

    try {
        const response = await fetch(url_criarReceita, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpo)
        });

        const result = await response.json();

        if (response.ok && result.status !== false) {
            alert("Receita criada com sucesso!");
            window.location.href = "../dentista/receitasDentista.html";
        } else {
            alert("Erro: " + (result.mensagem || "Erro ao criar receita"));
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão com a API.");
    }
}
//Editar receita
async function EditarReceita(event) {
    event.preventDefault();

    const corpo = {
        id: parseInt(document.querySelector("#edit-receita-id").value),
        consultaId: parseInt(document.querySelector("#edit-receita-consulta-id").value),
        prescricao: document.querySelector("#edit-receita-prescricao").value,
        remedio: document.querySelector("#edit-receita-remedio").value
    };

    try {
        const response = await fetch(url_editarReceita, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpo)
        });

        const result = await response.json();

        if (response.ok && result.status !== false) {
            alert("Receita atualizada com sucesso!");
            window.location.href = "../dentista/receitasDentista.html";
        } else {
            alert("Erro: " + (result.mensagem || "Erro ao editar receita"));
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão com a API.");
    }
}

// Excluir receita
async function excluirReceita(id) {
    if (!confirm("Deseja realmente excluir esta receita?")) return;

    try {
        const response = await fetch(`${url_excluirReceita}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (response.ok && result.status !== false) {
            alert("Receita excluída com sucesso!");
            window.location.href = "../dentista/receitasDentista.html";
        } else {
            alert("Erro: " + (result.mensagem || "Não foi possível excluir."));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar na API.");
    }
}
function configurarFormularios() {
    const formP = document.querySelector("#form-paciente");
    const formD = document.querySelector("#form-dentista");
    const formEditP = document.querySelector("#form-editar-paciente");
    const formEditD = document.querySelector("#form-editar-dentista");
    const formEditarC = document.querySelector("#form-editar-consulta");
    const formCriarC = document.querySelector("#form-criar-consulta");
    const formReceita = document.querySelector("#form-criar-receita");
    const formEditR = document.querySelector("#form-editar-receita");
    const btnExcluirContaP = document.querySelector("#btn-excluir-conta");
    const btnExcluirContaD = document.querySelector("#btn-excluir-conta-dentista");

    if (btnExcluirContaD) {
        btnExcluirContaD.addEventListener("click", ExcluirDentista);
        console.log("Escuta de Excluir Dentista ativa");
    }
    if (btnExcluirContaP) {
        btnExcluirContaP.addEventListener("click", ExcluirPaciente);
        console.log("Escuta de Excluir Paciente ativa");
    }
    if (formP) formP.addEventListener("submit", CriarPaciente);
    if (formD) formD.addEventListener("submit", CriarDentista);
    if (formEditP) formEditP.addEventListener("submit", EditarPaciente);
    if (formEditD) formEditD.addEventListener("submit", EditarDentista);

    if (formCriarC) {
        formCriarC.addEventListener("submit", CriarConsulta);
        console.log("Escuta de Criar Consulta ativa");
    }
    if (formEditarC) {
        formEditarC.addEventListener("submit", EditarConsulta);
        console.log("Escuta de Editar Consulta ativa");
    }

    const btnExcluirC = document.querySelector("#btn-excluir-consulta");
    if (btnExcluirC) {
        btnExcluirC.addEventListener("click", () => {
            const id = document.querySelector("#edit-consulta-id").value;
            if (id) excluirConsulta(id);
            else alert("Informe o ID da consulta para excluir.");
        });
    }
    if (formReceita) {
        formReceita.addEventListener("submit", CriarReceita);
        console.log("Escuta de Criar Receita ativa");
    }
    if (formEditR) {
        formEditR.addEventListener("submit", EditarReceita);
        console.log("Escuta de Editar Receita ativa");
    }

    const btnExcluirR = document.querySelector("#btn-excluir-receita");
    if (btnExcluirR) {
        btnExcluirR.addEventListener("click", () => {
            const id = document.querySelector("#edit-receita-id").value;
            if (id) excluirReceita(id);
            else alert("Informe o ID da receita para excluir.");
        });
    }
}

async function iniciarTelaPD() {
    const path = window.location.pathname;
    console.log("Caminho completo detectado:", path);

    if (path.includes("telaDentistas.html")) {
        await ListarDentistas();
    }
    else if (path.includes("telaPacientes.html")) {
        await ListarPacientes();
    }
    else if (path.includes("consultasDentista.html") || path.includes("consultasPaciente.html")) {
        await ListarConsultas();
    }
    else if (path.includes("receitasDentista.html")) {
        await ListarReceitas();
    }
    else if (path.includes("receitasPaciente.html")) {
        await ListarReceitasPaciente();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    configurarFormularios();

    await iniciarTelaPD();

    const path = window.location.pathname.toLowerCase();

    if (path.includes("consultasdentista") || path.includes("consultaspaciente")) {
        configurarBuscaConsultas();
    }
    else if (path.includes("receitasdentista")) {
        configurarBuscaReceitas();
        configurarBuscaReceitasPorDentista();
    }
    else if (path.includes("receitaspaciente")) {
        configurarBuscaReceitasPaciente();
    }
    else {
        configurarBuscaGeral();
    }
});