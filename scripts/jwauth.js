auth();
async function auth(){
    const result = await fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())
    if (result.status == 'error') {
        console.log("auth failed")
        window.location.href="/"
        alert("Access Denied ");
    }
}