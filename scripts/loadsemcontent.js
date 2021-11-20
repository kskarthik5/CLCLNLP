window.onload=loadsem();
async function loadsem(){
    const result= await fetch("/getSem",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: localStorage.getItem('token')})
    }).then((res) => res.json());
    const sem=result.data;
    console.log(sem);
    const innercontent='<h5><a  href="/courses/sem'+sem+'">Semester '+sem+'</a></h5>\
        <a  href="/courses/sem'+sem+'" class="read-more1">View Courses ></a>';
    document.getElementById("semester-card").innerHTML=innercontent;
}

