let addUser = document.querySelector('.adduser');
let user_id = 0

async function customers(){
    let api = await fetch('http://192.168.137.178:5000/api/users')
    api = await api.json()
    return  api
}



addUser.onclick = async (event) =>{
    
    event.preventDefault()
    var database = await customers() 
    
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
        await fetch('http://192.168.137.178:5000/api/users', {
            method: 'POST',
            body: JSON.stringify({
            username: usernameInput,
            telephone: '+'+telephoneInput
        }),
        })
    

    ul.innerHTML += `<li class="customer-item">
    <span class="customer-name">${database[database.length-1].username}</span>
    <a class="customer-phone" href="tel:${phone}">${phone}</a>
    </li>`;
    event.preventDefault()
    document.querySelector('#usernameInput').value = ''
    document.querySelector('#telephoneInput').value = ''
}

async function render(){
    var database = await customers() 
    let foodsSelect = document.getElementById("foodsSelect");
    let addWaters = document.querySelector('.addWaters')

    for(let i= 0; i < database.length; i++){
        console.log(i);
        let ul = document.querySelector('.customers-list')
        ul.innerHTML += `<li class="customer-item">
            <span class="customer-name">${database[i].username}</span>
            <a class="customer-phone" href="tel:${database[i].telephone}">${database[i].telephone}</a>
            </li>`;
    }

    document.querySelectorAll('.customer-item').forEach((e, i) => {
        e.onclick = async function(){
            var id = document.querySelector('#clientId');
            var soni = document.querySelectorAll('.order-count');
            document.querySelector('h1[id="userHeader"]').innerText = database[i].username;
            if(database[i].fanta > 0){
                document.querySelectorAll('.order-item').forEach((el) => {
                    if(el.id == 'fanta'){
                        el.classList.add('active')
                    }else{
                        el.classList.remove('active')
                    }
                })
            }
            if(database[i].cola > 0){
                document.querySelectorAll('.order-item').forEach((el) => {
                    if(el.id == 'cola'){
                        el.classList.add('active')
                    }else{
                        el.classList.remove('active')
                    }
                })
            }
            id.innerHTML = database[i].client_id;
            soni[0].innerHTML = database[i].cola;
            soni[2].innerHTML = database[i].combo;
            soni[1].innerHTML = database[i].fanta;


            foodsSelect.onchange = async function(){
                var val = this.value;
                addWaters.onclick = async function(event){
                    var foodsCount = document.getElementById("foodsCount").value;
                    var soni = document.querySelectorAll('.order-count');
                    if (foodsCount > 10) {
                        alert('10tadan oshiq buyurtma qilish mumkin emas!')
                        event.preventDefault()
                        return
                    }else{
                        if (foodsCount.trim()) {
                            database[i][val] += +foodsCount;
                        }
                        if (database[i].cola > 0) {
                            document.querySelector('#cola').classList.add('active')
                        }else
                        {
                            document.querySelector('#fanta').classList.remove('active')
                            event.preventDefault()

                        }
                        if (database[i].combo > 0) {
                            document.querySelector('#combo').classList.add('active')
                        }else
                        {
                            document.querySelector('#fanta').classList.remove('active')
                            event.preventDefault()

                        }

                        if (database[i].fanta > 0) {
                            document.querySelector('#fanta').classList.add('active')
                        }else
                        {
                            document.querySelector('#fanta').classList.remove('active')
                            event.preventDefault()

                        }
                    }
                    await fetch('http://192.168.137.178:5000/api/orders', {
                        method: 'POST',
                        body: JSON.stringify({
                            client_id: document.querySelector('#clientId').textContent,
                            [val]: foodsCount,
                            food: [val]
                        }),
                    })
                    event.preventDefault()
                    return 

                }                
            }

            const test = await customers() 
            test.forEach((e)=>{
                if (e.cola == 0) {
                    document.querySelector('#cola').classList.remove('active')
                }
            })

            if (database[i].cola > 0) {
                document.querySelector('#cola').classList.add('active')
            }
            if (database[i].fanta > 0) {
                document.querySelector('#fanta').classList.add('active')
            }
            if (database[i].combo > 0) {
                document.querySelector('#combo').classList.add('active')
            }else
            {
                document.querySelector('#fanta').classList.remove('active')
            }

            // id.innerHTML = database[i].client_id;
            soni[0].innerHTML = database[i].cola;
            soni[1].innerHTML = database[i].fanta;
            soni[2].innerHTML = database[i].combo;
            
        }
    })
}

render()