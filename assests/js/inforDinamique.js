import {hamburgers,bebidas } from "./cardadio.js";

const cardHambuguers = document.getElementById('hambuguers')


hamburgers.map(item =>{
    const cardItemsHamb = document.createElement('div')
    cardItemsHamb.innerHTML = `
    <div class="flex gap-2">
                <img src="${item.img}" alt="" srcset="" class="
                w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300
                ">
                <div>
                    <p class="font-bold">${item.nome}</p>
                    <p class="text-sm">${item.descricao}
                    </p>
                    <div class="flex items-center gap-2 justify-between mt-3">
                        <p class="font-bold text-lg">R$ ${item.preco}</p>
                        <button class="bg-gray-900 px-5 rounded add-to-cart-btn" data-name="${item.nome}" data-price="${item.preco}"><i class="bi bi-cart text-white"></i></button>
                    </div>
                </div>
            </div>
    
    `
    cardHambuguers.appendChild(cardItemsHamb)

})
async function get_cep(cep){
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json(); // Aguarda a resolução da promessa
    console.log(data);
}






