document.getElementById('formCadastro').addEventListener('submit', async function(event) {
    event.preventDefault();

    const tipo = document.getElementById('tipoUsuario').value;
    const dados = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

    let apiUrl = tipo === 'paciente' ? '/api/pacientes' : '/api/dentistas';
    let proximaPagina = tipo === 'paciente' ? 'paciente/inicioPaciente.html' : 'dentista/inicioDentista.html';

    try {
        console.log(`Enviando dados de ${tipo} para: ${apiUrl}`, dados);
        window.location.href = proximaPagina;

    } catch (error) {
        alert("Ocorreu um erro ao processar o cadastro.");
        console.error(error);
    }
});