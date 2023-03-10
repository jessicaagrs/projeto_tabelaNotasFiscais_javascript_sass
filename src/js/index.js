import { model } from "./model.js"

const table = document.getElementById('table');
const buttonLoadData = document.getElementById('buttonLoadData')
const buttonSupplier = document.getElementById('buttonSupplier')
const fadeModal = document.querySelector('#fade')
const modalSupplier = document.querySelector('#modal-supplier')
const buttonCloseModalSupplier = document.getElementById('buttonCloseModalSupplier')
const buttonOkModalSupplier = document.getElementById('buttonOkModalSupplier')
const buttonRefresh = document.getElementById('buttonRefresh')
const select = document.querySelector('#select-modal-supplier')
const buttonDate = document.getElementById('buttonDate')
const modalDate = document.querySelector('#modal-dates')
const buttonCloseModalDate = document.querySelector('#buttonCloseModalDate')
const buttonOkModalDate = document.querySelector('#buttonOkModalDate')

let indiceUltimaLinhaCarregada = 100;
let sizeLoad = 100

function onLoadData() {
    let newModel = model.slice(indiceUltimaLinhaCarregada, indiceUltimaLinhaCarregada + sizeLoad);

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

    colorCurrentInventory()
    colorStatusProduct()

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
    thBrand.textContent = `Fornecedor`
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
    colorCurrentInventory()
    colorStatusProduct()
}

window.addEventListener('load', onCreateTable);

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

function onFilterSuppliersModel() {
    const categoriasFiltradas = model.map(x =>
        x.brand,
    )
    const categoriesUnique = categoriasFiltradas.filter((elem, index) => {
        return categoriasFiltradas.indexOf(elem) === index;
    });

    categoriesUnique.sort((a, b) => {
        if (b > a)
            return -1
        if (b < a)
            return 1
        return 0
    })
    return categoriesUnique
}

function onOpenModalSupplier() {
    const suppliers = onFilterSuppliersModel()

    suppliers.forEach(element => {
        let option = document.createElement('option')
        option.textContent = element
        select.append(option)
    });

    fadeModal.classList.remove("hide")
    modalSupplier.classList.remove("hide")
}

buttonSupplier.addEventListener('click', onOpenModalSupplier)

function onCloseModalSupplier() {
    fadeModal.classList.add("hide")
    modalSupplier.classList.add("hide")
    select.value = ""

}

buttonCloseModalSupplier.addEventListener('click', onCloseModalSupplier)

buttonOkModalSupplier.addEventListener('click', (ev) => {
    let option = ev.target.parentNode.parentNode.children[1].selectedOptions[0].value
    onApplyFilterTableSupplier(option)
})

function onApplyFilterTableSupplier(option) {
    let tr = table.getElementsByTagName("tbody")[0].rows;
    let sizeModel = model.length
    let sizeTr = tr.length
    let remainingLoadingSize = sizeModel - sizeTr

    sizeLoad = remainingLoadingSize
    onLoadData()

    if (!option) {
        alert("Selecione um fornecedor para prosseguir.")
        return
    }

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.textContent.toLowerCase().includes(option.toLowerCase())) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    fadeModal.classList.add("hide")
    modalSupplier.classList.add("hide")
    buttonLoadData.style.display = "none"
}

buttonRefresh.addEventListener('click', () => {
    window.location.reload(true);
})

function onOpenModalDate(oEvent) {
    fadeModal.classList.remove("hide")
    modalDate.classList.remove("hide")
}

buttonDate.addEventListener('click', onOpenModalDate)

function onCloseModalDate() {
    fadeModal.classList.add("hide")
    modalDate.classList.add("hide")
    select.value = ""

}

buttonCloseModalDate.addEventListener('click', onCloseModalDate)

function onApplyFilterTableDate() {
    let dateBegin = new Date(document.getElementById('dateBegin').value)
    let dateEnd = new Date(document.getElementById('dateEnd').value)
    let tr = table.getElementsByTagName("tbody")[0].rows;

    for (let i = 0; i < tr.length; i++) {
        let td = new Date(formatInfoRowForDate(tr[i].getElementsByTagName("td")[3].textContent));
        if (td >= dateBegin && td <= dateEnd) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }

    }

    console.log(table.getElementsByTagName("tbody")[0].rows);

    fadeModal.classList.add("hide")
    modalDate.classList.add("hide")
    buttonLoadData.style.display = "none"
}

buttonOkModalDate.addEventListener('click', onApplyFilterTableDate)

function formatInfoRowForDate(rowDate) {
    let parts = rowDate.split("/");
    let year = parseInt(parts[2]);
    let month = parseInt(parts[1]) - 1;
    let day = parseInt(parts[0]);
    let date = new Date(year, month, day);
    return date
}

function colorCurrentInventory() {
    let tr = table.getElementsByTagName("tbody")[0].rows;

    for (let i = 0; i < tr.length; i++) {
        let initialIventory = Number(tr[i].getElementsByTagName("td")[4].textContent);
        let currentInventory = Number(tr[i].getElementsByTagName("td")[5].textContent);

        if (initialIventory < currentInventory) {
            tr[i].getElementsByTagName("td")[5].style.color = "#D90D1E"
            tr[i].getElementsByTagName("td")[5].style.fontWeight = "900"
        } else {
            tr[i].getElementsByTagName("td")[5].style.color = "#135EF2"
            tr[i].getElementsByTagName("td")[5].style.fontWeight = "900"
        }
    }

}

function colorStatusProduct() {
    let tr = table.getElementsByTagName("tbody")[0].rows;

    for (let i = 0; i < tr.length; i++) {
        let status = tr[i].getElementsByTagName("td")[9].textContent;

        if (status == "ativo") {
            tr[i].getElementsByTagName("td")[9].style.color = "#217D3B"
            tr[i].getElementsByTagName("td")[9].style.fontWeight = "900"
        } else {
            tr[i].getElementsByTagName("td")[9].style.color = "#D90D1E"
            tr[i].getElementsByTagName("td")[9].style.fontWeight = "900"
        }
    }
}

/*
function applyDateFilter() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  const rows = document.querySelectorAll('table tbody tr');

  rows.forEach(row => {
    const date = new Date(row.querySelector('td.date').textContent);

    if (date >= startDate && date <= endDate) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}
*/