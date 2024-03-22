import { load,load2 } from "./load.js";
const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('modal-cart')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModal = document.getElementById('close-modal-btn')
const cartCount  = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')
let card = []
let total_itens = 0

setTimeout(load, 1280)
console.log(cartModal);
cartBtn.addEventListener('click', () => {
 cartModal.style.display = "flex"
 atualizaCarrinho()
})

cartModal.addEventListener('click', (evento) =>{
    if(evento.target == cartModal){
        cartModal.style.display = 'none'
    }

})
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none'


})
menu.addEventListener('click', (evento) =>{
    let parentButtom = evento.target.closest(".add-to-cart-btn")
    if(parentButtom){
        const name = parentButtom.getAttribute('data-name')
        const preco = parseFloat(parentButtom.getAttribute('data-price'))
        
        addCarrinho(name,preco)
    }
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
console.log(card);
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
        <p clas="font-medium">${itens.name}</p>
        <p>${itens.qta}</p>
        <p>${itens.preco.toFixed(2)}</p>
        </div>
        <div><buttom class="remove" data-name="${itens.name}">Remover</buttom></div>
    </di>
    
    `
    total += itens.preco * itens.qta
    cartItemsContainer.appendChild(cardItemElement)
  
    
 });


cartCount.textContent = total_itens
cartTotal.textContent = total.toLocaleString("pt-BR",{
    style : 'currency',
    currency : 'BRL'
})
}

cartItemsContainer.addEventListener('click', (evento) =>{
    if(evento.target.classList.contains('remove')){
        const name = evento.target.getAttribute('data-name')
        remover(name)
     

    }
})

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

addressInput.addEventListener("input", (ev) =>{
    let inpuValue = ev.target.value
    if (inpuValue) {
        addressWarn.classList.remove("border-red-500")
        // addressInput.classList = 'bg-red-700'
        addressWarn.classList.add('hidden')
        
    }

})

checkoutBtn.addEventListener("click", () => {
    if (card.length == 0) {
        return;
        
    }
    if (addressInput.value === "") {
        console.log('ola mundo');
        console.log(addressWarn);
        addressWarn.classList.remove("hidden")
        // addressInput.classList = 'bg-red-700'
        addressInput.classList.add('border-red-500')
        return;
    }
    const cartItemns = card.map(item =>{
        return (`Produto : (${item.name}) \n Quatidade (${item.qta}) \n Preco (${item.preco}) \n`
        )

    }).join("")
  
    const message = encodeURIComponent(cartItemns)
    const phone = 5585991637516
   
        load2()
        setTimeout(() => {window.open(`https://wa.me/${phone}?text=${message} Endereço : ${addressInput.value}`,"_blank")}, 1284)
    

    
    card.length = 0
    addressInput.value = ""
    atualizaCarrinho()

})





