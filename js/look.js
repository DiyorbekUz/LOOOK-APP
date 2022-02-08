let addUser = document.querySelector('.adduser');
let user_id = 0

let customers = []
addUser.onclick = (event) =>{
    
    user_id++
    let foodsSelect = document.getElementById("foodsSelect");
    let addWaters = document.querySelector('.addWaters')
    let telephoneInput = document.querySelector('#telephoneInput').value
    let phone = telephoneInput
    let usernameInput = document.querySelector('#usernameInput').value
    let ul = document.querySelector('.customers-list')
    let checkNum = telephoneInput.slice(0,5)
    if (usernameInput.length > 10 || usernameInput.trim().length < 3) {
        alert('Usernamening maximal uzunligi 10 tadan oshmasligi kerak! va uzunligi 3tadan ko\'p bo\'lishi kere')
        event.preventDefault()
        return
    }
    if (checkNum != '99891' && checkNum != '99894' && checkNum != '99895' && checkNum != '99899' && checkNum != '99897' && checkNum != '99890' && checkNum != '99833' && checkNum != '99888' && telephoneInput.length != 12) {
        alert('Telefon raqam hato kiritilgan')
        event.preventDefault()
        return
    }
    
    event.preventDefault()

    customers.push({
        client_id: user_id, username: usernameInput, telephone: telephoneInput, cola: 0, fanta: 0
    })

    ul.innerHTML += `<li class="customer-item">
    <span class="customer-name">${usernameInput}</span>
    <a class="customer-phone" href="tel:${phone}">${phone}</a>
    </li>`;
    document.querySelector('#usernameInput').value = ''
    document.querySelector('#telephoneInput').value = ''

    // Bu userga click buganda iwledi
    document.querySelectorAll('.customer-item').forEach((e, i) => {
        e.onclick = function(){
            var soni = document.querySelectorAll('.order-count');
            var id = document.querySelector('#clientId');
            document.querySelector('h1[id="userHeader"]').innerText = customers[i].username;
            if(customers[i].fanta > 0){
                document.querySelectorAll('.order-item').forEach((el) => {
                    if(el.id == 'fanta'){
                        el.classList.add('active')
                    }else{
                        el.classList.remove('active')
                    }
                })
            }
            if(customers[i].cola > 0){
                document.querySelectorAll('.order-item').forEach((el) => {
                    if(el.id == 'cola'){
                        el.classList.add('active')
                    }else{
                        el.classList.remove('active')
                    }
                })
            }


            foodsSelect.onchange = function(){
                var val = this.value;
                addWaters.onclick = function(event){
                    var foodsCount = document.getElementById("foodsCount").value;
                    var soni = document.querySelectorAll('.order-count');
                    console.log(customers[i].cola)
                    let current = customers[i][val] + +foodsCount
                    if (foodsCount > 10 || current > 10) {
                        alert('10tadan oshiq buyurtma qilish mumkin emas!')
                    }else{
                        if (foodsCount.trim()) {
                            customers[i][val] += +foodsCount;
                        }
                        if (customers[i].cola > 0) {
                            document.querySelector('#cola').classList.add('active')
                        }
                        if (customers[i].fanta > 0) {
                            document.querySelector('#fanta').classList.add('active')
                        }else
                        {
                            document.querySelector('#fanta').classList.remove('active')
                        }
                        soni[0].innerHTML = customers[i].cola;
                        soni[1].innerHTML = customers[i].fanta;
                    }
                    event.preventDefault()
                    return 
                }
                
            }
            customers.forEach((e)=>{
                if (e.cola == 0) {
                    document.querySelector('#cola').classList.remove('active')
                }
            })

            if (customers[i].cola > 0) {
                document.querySelector('#cola').classList.add('active')
            }
            if (customers[i].fanta > 0) {
                document.querySelector('#fanta').classList.add('active')
            }else
            {
                document.querySelector('#fanta').classList.remove('active')
            }

            id.innerHTML = customers[i].client_id;
            soni[0].innerHTML = customers[i].cola;
            soni[1].innerHTML = customers[i].fanta;

            event.preventDefault()


        }
    })
    
    event.preventDefault()

}
