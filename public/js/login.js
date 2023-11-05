document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
    let isPasswordVisible = false;
  
    eyeIcon.addEventListener("click", function() {
        if (isPasswordVisible) {
            passwordInput.type = "password";
            eyeIcon.src = "./assets/olho-fechado.png";
        } else {
            passwordInput.type = "text";
            eyeIcon.src = "./assets/olho-aberto.png";
        }
  
        isPasswordVisible = !isPasswordVisible;
    });
  });
  
  function checkLogin() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    
    // Depurar os valores dos campos
    console.log("Username:", usernameInput.value);
    console.log("Password:", passwordInput.value);

    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.text()) // Alterado para receber texto em vez de JSON
    .then(data => {
        if (data === 'Credenciais inválidas. Tente novamente.') {
            document.getElementById("error-message").textContent = data; // Exibir a mensagem de erro
        } else {
            window.location.href = data; // Redirecionar para a página de estoque
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
function logout() {
    window.location.href = '/'; // Redireciona para a página de login
}
