const btnPaciente = document.getElementById('btn-paciente');
const btnDentista = document.getElementById('btn-dentista');
const formPaciente = document.getElementById('form-paciente');
const formDentista = document.getElementById('form-dentista');

btnPaciente.addEventListener('click', () => {
    btnPaciente.classList.add('ativo');
    btnDentista.classList.remove('ativo');
    
    formPaciente.style.display = 'flex';
    formDentista.style.display = 'none';
});

btnDentista.addEventListener('click', () => {
    btnDentista.classList.add('ativo');
    btnPaciente.classList.remove('ativo');
    
    formDentista.style.display = 'flex';
    formPaciente.style.display = 'none';
});