// Selecting input fields
const stName = document.getElementById('stName');
const stCourse = document.getElementById('course');
const stMail = document.getElementById('stMail');
const stNum = document.getElementById('stContact');
const register = document.getElementById('register');
const list = document.getElementById('list');

// Adding new records
register.addEventListener('click', addField);

function addField(){
    const newRecord = document.createElement('div');    //creating new row/record
    newRecord.classList.add('record','recordStyle');
    
    let patt1 = /^[A-Za-z ]+$/;
    if(stName.value!=='' && patt1.test(stName.value)!==false){  //validation on name input
        nameField = document.createElement('span');     //creating new field span element
        nameField.classList.add('name','newName');
        nameField.textContent = stName.value;
        newRecord.appendChild(nameField);
    }
    else if(stName.value==''){
        alert(`Add Student's Name`);
        return
    }
    else{
        alert('Enter Characters Only');
        return
    }
    
    if(stCourse.value!==''){
        courseField = document.createElement('span');
        courseField.classList.add('course');
        courseField.innerHTML = stCourse.value;
        newRecord.appendChild(courseField);
    }
    else if(stCourse.value==''){
        alert(`Select Course`);
        return
    }
    
    let patt2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(stMail.value!=='' && patt2.test(stMail.value)!==false){      //validation on mail input
        mailField = document.createElement('span');
        mailField.classList.add('mail');
        mailField.innerHTML = stMail.value;
        newRecord.appendChild(mailField);
    }
    else if(stMail.value==''){
        alert(`Add Email Address`);
        return
    }
    else{
        alert('Enter Valid Email Address');
        return
    }

    let patt3 = /^\+?[0-9-]{10,15}$/;
    if(stNum.value!=='' && patt3.test(stNum.value)!==false){        //validation on number input
        numField = document.createElement('span');
        numField.classList.add('contact');
        numField.innerHTML = stNum.value;
        newRecord.appendChild(numField);
    }
    else if(stNum.value===''){
        alert(`Add Contact Number`);
        return
    }
    else{
        alert('Enter Numeric Value & 10-15 Digist Only');
        return
    }
    
    const btns = document.createElement('span');        //creating, appending edit & delete buttons
    btns.classList.add('btns');
    const edtBtn = document.createElement('button');
    edtBtn.classList.add('fa-solid', 'fa-pen-to-square', 'btn2');
    btns.appendChild(edtBtn);
    const dltBtn = document.createElement('button');
    dltBtn.classList.add('fa-solid', 'fa-trash', 'btn2');
    btns.appendChild(dltBtn);
    newRecord.appendChild(btns);

    list.appendChild(newRecord);        //appending all new fields into a new row
    
    // Adding a vertical scrollbar
    let recordsCount = document.getElementById('list').childElementCount;
    list.style.overflowY = recordsCount > 11 ? 'scroll' : 'hidden';
    
    saveToLocalStorage();

    stName.value = '';
    stCourse.value = '';
    stMail.value = '';
    stNum.value = '';
}

// Functionality to Edit & Delete existing records
list.addEventListener('click', event=>{
    const item = event.target;
    const row = item.parentNode.parentNode;
    
    if(item.classList[1] === 'fa-pen-to-square'){
        stName.value = row.querySelector('.name').innerHTML;
        stCourse.value = row.querySelector('.course').innerHTML;
        stMail.value = row.querySelector('.mail').innerHTML;
        stNum.value = row.querySelector('.contact').innerHTML;
        row.remove();
    }
    else if(item.classList[1] === 'fa-trash'){
        row.remove();
        saveToLocalStorage();
    }
});

// Setting Local Storage
function saveToLocalStorage() {
    const rows = [...list.querySelectorAll('.recordStyle')];
    const records = rows.map(row => ({
        name: row.querySelector('.name').innerText,
        course: row.querySelector('.course').innerText,
        mail: row.querySelector('.mail').innerText,
        number: row.querySelector('.contact').innerText,
    }));  
    localStorage.setItem('students', JSON.stringify(records));
}

// Getting Local Storage
window.addEventListener('load', ()=>{
    const records = JSON.parse(localStorage.getItem('students') || '[]');
    records.forEach(student => {
        const row = document.createElement('div');
        row.classList.add('record','recordStyle');
        row.innerHTML = 
                `<span class="name">${student.name}</span>
                <span class="course">${student.course}</span>
                <span class="mail">${student.mail}</span>
                <span class="contact">${student.number}</span>
                <span class="btns">
                    <button class="fa-solid fa-pen-to-square btn2"></button>
                    <button class="fa-solid fa-trash btn2"></button>
                </span>`;
        list.appendChild(row);
    });
});
