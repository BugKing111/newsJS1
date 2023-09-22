// 该模块用来写js逻辑

// 页面加载
async function load(id){
  
    let topbarText = await fetch("/web/topbar/index.html").then(res=>res.text())
    document.querySelector(".topbar").innerHTML = topbarText
    if(id){
        document.querySelector(`#${id}`).style.color= "#0a58ca"
    }
    
}
 
// 导出
export { load }