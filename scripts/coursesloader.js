const temp=window.location.href;
const lang=temp.substring(temp.indexOf("/courses"));
load();
async function load(){
    const result = await fetch(lang, {
        method: 'POST',
    }).then((res) => res.json())
    data=result.data;
        data.forEach(async (obj,i) => {
            const cid=obj.cid;
            const result2 = await fetch('/cdb', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cid:cid})
            }).then((res) => res.json())
            const inhtml='<div class="col-xl-4 col-lg-4 col-md-6"> \
            <div class="single-course mb-70"> \
                <div class="course-img">\
                    <img src="assets/img/gallery/popular_sub2.png" alt="">\
                </div>\
                <div class="course-caption">\
                    <div class="course-cap-top">\
                        <h4><a href="'+ lang + '/player/'+i+'">'+obj.title+'</a></h4>\
                    </div>\
                    <div class="course-cap-bottom d-flex justify-content-between">\
                        <ul>\
                            <li><i class="ti-user"></i>'+result2.data.visits+'</li>\
                        </ul>\
                        <span></span>\
                    </div>\
                </div>\
            </div>\
            </div>';
            console.log(result.data.visits);
            document.getElementById("nav-tabContent").appendChild(document.createRange().createContextualFragment(inhtml));
        });   
    //document.getElementById("nav-tabContent").innerHTML=inhtml;
}


