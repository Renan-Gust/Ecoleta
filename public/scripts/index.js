var buttonSearch = document.querySelector("#page-home main a")
var modal = document.querySelector("#modal")
var close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () =>{
    modal.classList.remove("hide")
})

close.addEventListener("click", () =>{
    modal.classList.add("hide")
})