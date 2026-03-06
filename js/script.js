// Mudamos o nome para btnP, btnD, formP e formD para evitar conflitos
const btnP = document.getElementById('btn-paciente');
const btnD = document.getElementById('btn-dentista');
const formP = document.getElementById('form-paciente');
const formD = document.getElementById('form-dentista');

// Verifica se os botões existem na página antes de adicionar o evento
if (btnP && btnD) {
    btnP.addEventListener('click', () => {
        btnP.classList.add('ativo');
        btnD.classList.remove('ativo');
        
        formP.style.display = 'flex';
        formD.style.display = 'none';
    });

    btnD.addEventListener('click', () => {
        btnD.classList.add('ativo');
        btnP.classList.remove('ativo');
        
        formD.style.display = 'flex';
        formP.style.display = 'none';
    });
}