const btnPaciente = document.getElementById('btn-paciente');
const btnDentista = document.getElementById('btn-dentista');
const formPaciente = document.getElementById('form-paciente');
const formDentista = document.getElementById('form-dentista');

btnPaciente.addEventListener('click', () => {
    // Alterna as classes dos botões
    btnPaciente.classList.add('ativo');
    btnDentista.classList.remove('ativo');
    
    // Alterna a exibição dos formulários
    formPaciente.style.display = 'flex';
    formDentista.style.display = 'none';
});

btnDentista.addEventListener('click', () => {
    // Alterna as classes dos botões
    btnDentista.classList.add('ativo');
    btnPaciente.classList.remove('ativo');
    
    // Alterna a exibição dos formulários
    formDentista.style.display = 'flex';
    formPaciente.style.display = 'none';
});