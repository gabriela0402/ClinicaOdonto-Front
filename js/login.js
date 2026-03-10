document.getElementById('formLogin').addEventListener('submit', function(event) {
            event.preventDefault();

            const tipo = document.getElementById('tipoUsuario').value;

            if (tipo === 'paciente') {
                window.location.href = "paciente/inicioPaciente.html";
            } else if (tipo === 'dentista') {
                window.location.href = "dentista/inicioDentista.html";
            } else {
                alert("Por favor, selecione se você é Paciente ou Dentista.");
            }
        });