import { model } from "./model.js"

const table = document.getElementById('table');

function createTable(i, index) {
    let thead = document.createElement('thead')
    let trHead = document.createElement('tr')
    let thProduct = document.createElement('th')
    let thBrand = document.createElement('th')
    let thSku = document.createElement('th')
    let thDate = document.createElement('th')
    let thInitialInventory = document.createElement('th')
    let thCurrentInventory = document.createElement('th')
    let thNfe = document.createElement('th')
    let thColor = document.createElement('th')
    let thCategorie = document.createElement('th')
    let thStatus = document.createElement('th')
    let tbody = document.createElement('tbody')

    thProduct.textContent = `Produto`
    thBrand.textContent = `Marca`
    thSku.textContent = `SKU`
    thDate.textContent = `Data`
    thInitialInventory.textContent = `Estoque Inicial`
    thCurrentInventory.textContent = `Estoque Atual`
    thNfe.textContent = `Nf-e`
    thColor.textContent = `Cor`
    thCategorie.textContent = `Categoria`
    thStatus.textContent = `Status`

    thead.appendChild(thProduct)
    thead.appendChild(thBrand)
    thead.appendChild(thSku)
    thead.appendChild(thDate)
    thead.appendChild(thInitialInventory)
    thead.appendChild(thCurrentInventory)
    thead.appendChild(thNfe)
    thead.appendChild(thColor)
    thead.appendChild(thCategorie)
    thead.appendChild(thStatus)
    trHead.appendChild(thead)
    table.append(thead)

    for (i; i <= index && i < model.length; i++) {
        let trTbody = document.createElement('tr')
        let tdProduct = document.createElement('td')
        let tdBrand = document.createElement('td')
        let tdSku = document.createElement('td')
        let tdDate = document.createElement('td')
        let tdInitialInventory = document.createElement('td')
        let tdCurrentInventory = document.createElement('td')
        let tdNfe = document.createElement('td')
        let tdColor = document.createElement('td')
        let tdCategorie = document.createElement('td')
        let tdStatus = document.createElement('td')
        tdProduct.textContent = model[i].product
        tdBrand.textContent = model[i].brand
        tdSku.textContent = model[i].sku
        tdDate.textContent = formatDate(model[i].date)
        tdInitialInventory.textContent = model[i].initialIventory
        tdCurrentInventory.textContent = model[i].currentInventory
        tdNfe.textContent = model[i].nfe
        tdColor.textContent = model[i].color
        tdCategorie.textContent = model[i].categorie
        tdStatus.textContent = model[i].status

        trTbody.appendChild(tdProduct)
        trTbody.appendChild(tdBrand)
        trTbody.appendChild(tdSku)
        trTbody.appendChild(tdDate)
        trTbody.appendChild(tdInitialInventory)
        trTbody.appendChild(tdCurrentInventory)
        trTbody.appendChild(tdNfe)
        trTbody.appendChild(tdColor)
        trTbody.appendChild(tdCategorie)
        trTbody.appendChild(tdStatus)
        tbody.appendChild(trTbody)
    }

    table.append(tbody)

}

window.addEventListener('load', createTable(0, 199));


//0, 199
// 200, 399
//400, 599
//600, 799
//800, 1000

function formatDate(date){
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}