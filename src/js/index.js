import { model } from "./model.js"

const table = document.getElementById('table');
const buttonLoadData = document.getElementById('buttonLoadData')
let indiceUltimaLinhaCarregada = 100;

function onLoadData() {
    let newModel = model.slice(indiceUltimaLinhaCarregada, indiceUltimaLinhaCarregada + 100);

    newModel.forEach(dado => {
        let linha = table.insertRow(-1)
        let celula1 = linha.insertCell(0)
        let celula2 = linha.insertCell(1)
        let celula3 = linha.insertCell(2)
        let celula4 = linha.insertCell(3)
        let celula5 = linha.insertCell(4)
        let celula6 = linha.insertCell(5)
        let celula7 = linha.insertCell(6)
        let celula8 = linha.insertCell(7)
        let celula9 = linha.insertCell(8)
        let celula10 = linha.insertCell(9)
        celula1.innerHTML = dado.product
        celula2.innerHTML = dado.brand
        celula3.innerHTML = dado.sku
        celula4.innerHTML = formatDate(dado.date)
        celula5.innerHTML = dado.initialIventory
        celula6.innerHTML = dado.currentInventory
        celula7.innerHTML = dado.nfe
        celula8.innerHTML = dado.color
        celula9.innerHTML = dado.categorie
        celula10.innerHTML = dado.status
    });

    indiceUltimaLinhaCarregada += 100;
}

buttonLoadData.addEventListener('click', onLoadData)


function onCreateTable() {
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

    for (let i = 0; i < 100; i++) {
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

window.addEventListener('load', onCreateTable);

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}