// Função para pegar os dados dos Estados
function populateUFs(){
    var ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res =>  res.json() )
    .then(states => {

        for(var state of states){

            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()

// Função para pegar os dados das cidades
function getCities(event){
    var citySelect = document.querySelector("select[name=city]")
    var stateInput = document.querySelector("input[name=state]")

    var ufValue= event.target.value

    var indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState]

    var url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option"
    citySelect.disabled = true

    fetch(url)
    .then(res =>  res.json() )
    .then(cities => {

        for(var city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
   
// Itens de coleta
// Pegar todos os li's
var itemsToCollect = document.querySelectorAll(".items-grid li")

for(var item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

var collectedItems= document.querySelector("input[name=items]")

var selectedItems = []

function handleSelectedItem(event){
    var itemLi = event.target
    
    // Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    var itemId = itemLi.dataset.id

    console.log("ITEM ID: ", itemId)

    // Verificar se existem itens selecionados, sem sim
    // pegar os itens selecionados
    var alreadySelected = selectedItems.findIndex(function(item){
        var itemFound = item == itemId
        return itemFound
    })

    // Se ja estiver selecionado, 
    if(alreadySelected >= 0){
        // tirar da seleção
        var filteredItems = selectedItems.filter(item =>{
            var ItemIsDifferent = item != itemId
            return ItemIsDifferent
        })

        selectedItems = filteredItems

    }else{
    // Se não estiver selecionado, adicionar á seleção
        selectedItems.push(itemId)
    }

    console.log("selectedItems: ", selectedItems)

    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}