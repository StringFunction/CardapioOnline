let elem_p = document.getElementById('preolader')
let elem_l = document.getElementById('loader')
let elem_s = document.getElementById('sombra')
console.log('passei aqui')

export function load(){
    elem_p.classList.remove("preolader")
    elem_l.classList.remove('loader')
    elem_s.classList.remove("sombra")
}
export async function load2(){
    console.log('ola mundo');
    elem_p.classList.add("preolader")
    elem_l.classList.add('loader')
    elem_s.classList.add("sombra")
    setTimeout(load, 1280)
}


