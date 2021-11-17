getUserInfo()
async function getUserInfo() {
    const result = await fetch('/db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())
    const data=JSON.parse(result.data);
    const name=data.name;
    const sem=data.sem;
    console.log(typeof(data));
    var banner="<a><br>User : "+name+ "<br>Current Sem : "+sem+"</a>";
    document.getElementById("profile-banner").innerHTML=banner;
}
