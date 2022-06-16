
var posts = [];
const max = 10;


$(document).ready(() => {

    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        posts = data;

        let container = $("#posts");
        let pagination = $("#pagination");
        let page = 1;
        let totalPage = Math.ceil(posts.length/max);
        
        container.html(getHTML(posts,1));
        pagination.html(getBtns(posts));

        let btns = $(".page-link");
        for(let btn of btns){
           btn.addEventListener("click",(e) => {
                let pg = Number(e.target.innerText);
                page = pg;
                container.html(getHTML(posts,page));
           });
        }


        $("#prev").click((e) => {
            page = getPrevPage(page,totalPage);
            container.html(getHTML(posts,page));
        });

        $("#next").click((e) => {
           page = getNextPage(page,totalPage);
           container.html(getHTML(posts,page));
        })
    });

    fetch("http://localhost:8080/hexa/api/news")
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
});

// (array,number,node)
function getHTML(datas,pageFrom){


    let start = (Number(pageFrom) - 1) * max;
    let end = start + max;

    let html = '';//result


    for(let i = start ; i < end ; i++){
        html += `
        <div id="post" class="p-2 shadow-sm">
            <h6 class="h6">${datas[i].id}</h6>
            <h6 class="h6">Title : ${datas[i].title} </h6>
            <p class="h6" style="font-size:18px;">${datas[i].body}</p>
        </div>
        `;
    }

    return html;
}

function getBtns(datas){
    let max = 10;

    let totalPage = Math.ceil(datas.length/max);
    let html = '<li class="page-item"><span class="btn btn-primary" id="prev"><i class="fa-solid fa-angles-left"></i></span></li>';

    for(let i = 1 ; i <= totalPage ; i++){
        html += ` <li class="page-item"><span class="page-link">${i}</span></li>`
    }

    html += `<li class="page-item"><span class="btn btn-primary" id="next"><i class="fa-solid fa-angles-right"></i></span></li>`;

    return html;
}

function getPrevPage(now,total){
    let page = Number(now);
    let result ;

    page <= 1 ? result = Number(total) : result = page - 1 ;
    return result;
}

function getNextPage(now,total){
    let page = Number(now);
    let result;

    page >= Number(total) ? result = 1 : result = page + 1;

    return result;
}