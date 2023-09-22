// 引入模块

import { load } from "/web/util/LoadView.js";

load("topbar-news")


let list = []
// 搜索请求（jsonserver中模糊搜索用要搜索的参数加上_like）

// 根据id来给上监听事件
search.oninput = async function() {
    // 判断输入框内容为空的时候不显示列表和输入内容为空的时候结束（后台不会返回空数组）
    if(!search.value){
        listgroup.style.display="none"
        return
    }
    listgroup.style.display = "block"
    // console.log(search.value);
    let res = await fetch('http://localhost:3000/news?title_like=' + search.value).then(res => res.json())
    console.log(res);
    // 将相关数据显示到查询列表中
    listgroup.innerHTML = res.map(item => `
        <li class="list-group-item"><a href='/web/detail/index.html?id=${item.id}'>${item.title}</a></li>
    `).join("")
}

// 当输入框失去焦点的时候查询列表隐藏
search.onblur = function() {
    setTimeout(() => {
        listgroup.style.display = "none"
    },300)
}

// 卡片新闻的显示
async function renderList() {
    // 将新闻存起来
    list = await fetch("http://localhost:3000/news").then(res => res.json())
    // 将结果倒序（最新发布的在前）
    list.reverse()
    console.log(list.slice(0,4)); //打印最新四条新闻
    card.innerHTML = list.slice(0,4).map(item => `
    <div class="card" data-id = "${item.id}">
        <div style="background-image:url(${item.photo});" class="imgphoto"></div>
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">作者：${item.author}</p>
        </div>
    </div>
    
    `).join("")

    // 点击卡片的时候跳带着id跳到详情页
    for(let item of document.querySelectorAll(".card")){
        item.onclick = function() {
            // console.log(item.dataset.id);
            location.href = `/web/detail/index.html?id=${item.dataset.id}`
        }
    }
}

renderList()

// 新闻分类部分
async function rederNewTab(){
    list = await fetch("http://localhost:3000/news").then(res => res.json())
    // 利用lodash从list里面拿到按类型分组的数据
    let categoryObj = _.groupBy(list,item => item.category)
    console.log(categoryObj);
    // console.log(categoryObj["典型案例"]);
    // 倒序（按照最新发布在前排序）
    categoryObj["通知公告"].reverse()
    // categoryObj["典型案例"].reverse()
    // categoryObj["最新通告"].reverse()
    
    tab0.innerHTML = categoryObj["最新动态"].map(item => `
        <div class="listitem" data-id="${item.id}">
            <img src="${item.photo}" data-id="${item.id}"/>
             <div style="text-align: center;line-height: 90px;" data-id="${item.id}">${item.title}</div>
            <p class="card-text" style="font-size:12px;color:gray;text-align: center;" data-id="${item.id}">作者:${item.author}</p>
        </div>
    `).join("")

    tab1.innerHTML = categoryObj["典型案例"].map(item => `
        <div class="listitem" data-id="${item.id}">
            <img src="${item.photo}" data-id="${item.id}"/>
             <div style ="line-height:90px; text-align:center" data-id="${item.id}">${item.title}</div>
            <p class="card-text" style="font-size:12px;color:gray;text-align: center;" data-id="${item.id}">作者:${item.author}</p>
        </div>
    `).join("")

    tab2.innerHTML = categoryObj["通知公告"].map(item => `
        <div class="listitem" data-id="${item.id}">
            <img src="${item.photo}" data-id="${item.id}"/>
             <div style="line-height: 90px; text-align:center" data-id="${item.id}">${item.title}</div>
            <p class="card-text" style="font-size:12px;color:gray;text-align: center;" data-id="${item.id}">作者:${item.author}</p>
        </div>
    `).join("")

    tab0.onclick = function(evt){
        location.href = `/web/detail/index.html?id=${evt.target.dataset.id}`
    }
    tab1.onclick = function(evt){
        location.href = `/web/detail/index.html?id=${evt.target.dataset.id}`
    }
    tab2.onclick = function(evt){
        location.href = `/web/detail/index.html?id=${evt.target.dataset.id}`
    }

    // 根据id进行遍历
    // let tabs = [tab0,tab1,tab2]
    // tabs.forEach((item) => {
    //     // item.innerHTML = categoryObj[0]
    //     item.innerHTML = categoryObj["最新动态"].map(item => `
    //     <div class="listitem" data-id="${item.id}">
    //         <img src="${item.photo}" data-id="${item.id}"/>
    //         <div data-id="${item.id}">${item.title}</div>
    //         <p class="card-text" style="font-size:12px;color:gray;" data-id="${item.id}">作者:${item.author}</p>
    //     </div>
        
    //     `).join("")
    // })

}
rederNewTab()
