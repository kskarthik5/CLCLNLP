const form = document.getElementById('contactForm')
form.addEventListener('submit', registerUser)

async function registerUser(event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const name = document.getElementById('name').value
    const language = document.getElementById('language').value
    const sem= document.getElementById('institution').value
    const result = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,username,
            password, sem, language
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        // everythign went fine
        alert('Registered as \''+username+'\'. You can login using this username')
        window.location.href = "/"
    } else {
        alert(result.error)
    }
}

data={
    "cpp": [
    {"title": "INTRODUCTION TO C++ PROGRAMMING","vlink":"PLwXbGyE9aR4MiC9xrqUn209a3wV9Ciaab"},
    {"title": "DESIGNING GUI APPLICATIONS WITH GTK","vlink":"PL2i17lRog5pBe7t9zJdFdugQ6bxgjntJD"}
    ],
    "java":[
    {"title":"INTRODUCTION TO JAVA PROGRAMMING","vlink":"PLwXbGyE9aR4O1fKj9wlDU6SBS8SUvBLYa"},
    {"title":"GUI USING JAVA","vlink":"PLsyeobzWxl7pVZdyDXj0arOdTzo4MYekh"}
    ],
    "python":
    [
    {"title": "INTRODUCTION TO PYTHON PROGRAMMING","vlink":"PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3"},
         {"title": "GUI USING PYTHON ","vlink":"PLwXbGyE9aR4OUMbxkKjy61WcOTX-PPNoN"}
    ],
    "SEMESTER III":
    [
        {"title": "COMPUTER ORGANIZATION AND ARCHITECTURE (COA)","vlink":"PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX"},
        {"title": "DATABASE MANAGEMENT SYSTEMS (DBMS)","vlink":"PLwXbGyE9aR4O3u_A5j9sYSk6wxThY_xsO"},
        {"title": "DATA STRUCTURES (DS)","vlink":"PLVlQHNRLflP_OxF1QJoGBwH_TnZszHR_j"},
        {"title": "DIGITAL LOGIC AND DESIGN ANALYSIS (DLDA)","vlink":"PLEbnTDJUr_IdITOdOXupPTpOh_Xa8emfw"}    
    ]
}