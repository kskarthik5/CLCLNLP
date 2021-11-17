var form = document.getElementById('logoutbutton')
        form.addEventListener('submit', login)
        async function login(event) {
            localStorage.setItem('token',null);
        }