import { load,load2 } from "./load.js";
const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('modal-cart')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const checkoutBtn2 = document.getElementById('checkout-btn2')
const closeModal = document.getElementById('close-modal-btn')
const closeModal2 = document.getElementById('close-modal-btn2')
const cartCount  = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')
var selectedOption = document.getElementsByName('OPTION')
const municipio = document.getElementById("municipio")
const bairro = document.getElementById('Bairro')
const rua = document.getElementById('Rua/Avenida')
const numeroCasa = document.getElementById('Numero')
const cartModalFinal = document.getElementById('modal-cart-final')
const CartEnde = document.querySelectorAll('#Endereço input')
const InputTroco = document.getElementById("Troco")
const cartModalCep = document.getElementById('card-ce-invalido')
const cartPagamento = document.getElementById('cart-forma-pag')

const btncartModelCloseCEP = document.getElementById('close-modalCep-btn2')

const completo = document.getElementById('Completo')
const fade = document.getElementById('fade')
console.log(fade);

let card = []
let total_itens = 0
window.onload = () => {
    load()
};

cartBtn.addEventListener('click', () => {
 cartModal.style.display = "flex"
 atualizaCarrinho()
})
cartPagamento.addEventListener('click', (evento) => {
    if (evento.target.value == 'Dinheiro') {
        InputTroco.style.display = 'flex'
        
    } else{
        InputTroco.style.display = 'none'

    }
})
cartModal.addEventListener('click', (evento) =>{
    if(evento.target == cartModal){
        cartModal.style.display = 'none'
    }

})
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none'


})
closeModal2.addEventListener('click', () => {
    cartModalFinal.style.display = 'none'


})
// evento caso radio dinheiro for clicado 
// Clicando no item 
menu.addEventListener('click', (evento) =>{
    let parentButtom = evento.target.closest(".add-to-cart-btn")
    if(parentButtom){
        const name = parentButtom.getAttribute('data-name')
        const preco = parseFloat(parentButtom.getAttribute('data-price'))
        // adiciando item ao carrinho 
        addCarrinho(name,preco)
    }
})
// Clicando para remover o protudo do carrinho
cartItemsContainer.addEventListener('click', (evento) =>{
    if(evento.target.classList.contains('remove')){
        const name = evento.target.getAttribute('data-name')
        remover(name)
     

    }
})
// Colocando cep 
addressInput.addEventListener("keyup", (ev) =>{
    let inpuValue = ev.target.value
    inpuValue.replace("-","")
    /// Se tem alguma coisa dentro 
    if (inpuValue) {
        addressWarn.classList.remove("border-red-500")
        // addressInput.classList = 'bg-red-700'
        addressWarn.classList.add('hidden')
        if (inpuValue.length === 8){
            console.log(inpuValue);
            get_cep(inpuValue)
        
        }
        
    }

})
checkoutBtn.addEventListener("click", () => {
  
    if (card.length == 0) {
        return;
        
    }
    fade.style.display = 'flex'
    setTimeout(function(){cartModalFinal.style.display = 'flex'},2000)
    setTimeout(function(){fade.style.display = 'none'},2500)
})
checkoutBtn2.addEventListener("click", () => {
    let pagamendo
   for (let index = 0; index < selectedOption.length; index++) {
    if (selectedOption[index].checked) {
       pagamendo = selectedOption[index].value;
        
    }
    
   }
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden")
        // addressInput.classList = 'bg-red-700'
        addressInput.classList.add('border-red-500')
        municipio.classList.add('border-red-500')
        bairro.classList.add('border-red-500')
        numeroCasa.classList.add('border-red-500')
        completo.classList.add('border-red-500')
        rua.classList.add('border-red-500')
        selectedOption.classList.add('border-red-500')
        
        return;
    }
    const erros = []
    for (let index = 0; index < CartEnde.length; index++) {
        const element = CartEnde[index];
        if (element.value == "") {
            element.classList.add('border-red-500')
            erros.push(element)
            
        }
        
    }
    if (erros.length > 0 ) {
        return;
        
    }
    const cartItemns = card.map(item =>{
        return (`Produto : ${item.name} \n Quatidade  : ${item.qta}  \n Preço : R$ ${item.preco} \n`
        )

    }).join("")
  
    const message = encodeURIComponent(cartItemns)
    const phone = 5585991637516
    const body = `
    %0A*DETALHES*
    %0A*Forma de Pagamento* : ${pagamendo}%0A
    *Endereço*%0A
    *Cep* : ${addressInput.value}%0A 
    *Municipio* : ${municipio.value}%0A 
    *Bairro* : ${bairro.value}%0A 
    *Endereço* : ${rua.value}%0A 
    *Numero* : ${numeroCasa.value}%0A 
    *Ponto de Referencia* : ${completo.value}%0A
    
    `
        load2()
        setTimeout(() => {window.open(`https://wa.me/${phone}?text=${message}${body}`,"_blank")}, 1284)
 
    
    card.length = 0
    addressInput.value = ""
    atualizaCarrinho()

})
btncartModelCloseCEP.addEventListener('click', ()=>{
    cartModalCep.style.display = 'none'

})

function addCarrinho(name, preco){
    // PESQUISA DIFERENÇA ENTRE MAP E FIND
    let existemItem = card.find(item => 
        item.name == name  
    );
    if(existemItem){
       existemItem.qta += 1
       total_itens += 1
   
       
    } else{
    card.push({
        'name'  : name,
        'preco' : preco,
        'qta' : 1
    
    })
    total_itens += 1
}
atualizaCarrinho()

}

function atualizaCarrinho(){
 cartItemsContainer.innerHTML = ""
 let total = 0

 card.forEach(itens => {
    const cardItemElement = document.createElement("div")
    cardItemElement.classList.add('flex',"justify-bettween", "mb-4","flex-col")
    cardItemElement.innerHTML = `
    <div class="flex items-center justify-between">
        <div>
        <p clas="font-medium"><b class="font-bold">Produto</b> : ${itens.name}</p>
        <p><b class="font-bold">Quantidade</b> : ${itens.qta}</p>
        <p><b class="font-bold">R$</b> : ${itens.preco}</p>
        </div>
        <div><buttom class="remove bg-red-500 hover:cursor-pointer text-white px-4   py-1 " data-name="${itens.name}">Remover</buttom></div>
    </di>
    
    `
    total += parseFloat(itens.preco) * itens.qta
    cartItemsContainer.appendChild(cardItemElement)
  
    
 });


cartCount.textContent = total_itens
cartTotal.textContent = total.toLocaleString("pt-BR",{
    style : 'currency',
    currency : 'BRL'
})
}


function remover (name) {
    const index = card.findIndex(item => item.name == name )
    if(index !== 1){
        const item = card[index]
        if (item.qta > 1){
            item.qta -= 1
            if (total_itens >= 1) {
                total_itens -= 1 
            }
            atualizaCarrinho()
        }else{
            card.splice(index,1)
            if (total_itens >= 1) {
                total_itens -= 1 
            }
            atualizaCarrinho()

        }
    }

}





async function get_cep(cep){
    fade.style.display = 'flex'
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json(); // Aguarda a resolução da promessa
    console.log(response.status);
    console.log(data);
    if (data.erro != true) {
    fade.style.display = 'none'
    municipio.value = data.localidade
    bairro.value = data.bairro
    rua.value = data.logradouro
    } else{
        fade.style.display = 'none'
        cartModalCep.style.display = 'flex'
    }



}






