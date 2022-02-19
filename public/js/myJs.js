let tableRow= document.querySelectorAll('.service__table tr');
let DateCommand= document.querySelector('.service__date');
let timeCommand= document.querySelector('.service__time-input');
let buttonSend= document.querySelector('.service__button')
let modale= document.querySelector('.modale');
let table= document.querySelector('.service__table');

let dataSelected={};
let optionsRequet;
const iscomplete=()=>{
    if(Object.keys(dataSelected).length===3){
        buttonSend.style.display='inline-block'
       
    }
}


const displayResultatCommand =(response)=>{
        modale.innerHTML= response
        modale.classList.add('visible')
        table.classList.add('hidden')
        buttonSend.classList.add('hidden')
    if(!response.includes('succeful')){
        modale.style.color='red'
    }

    
    setTimeout(()=>{
      
        modale.classList.remove('visible')
        table.classList.remove('hidden')
        buttonSend.classList.remove('hidden')
        modale.style.color='green'
    },4000)
}


DateCommand.addEventListener('change',e=>{
    dataSelected.date= e.target.value;
    iscomplete()
})
timeCommand.addEventListener('change',e=>{
    dataSelected.time= e.target.value;
  
    iscomplete()
})





tableRow.forEach((row,indexRow,tableRow)=>{
    
    row.addEventListener('click',e=>{
        let tableRowSelected=e.target.parentNode;
        for(let i=0; i<tableRow.length;i++){
            tableRow[i].classList.remove('row-selected')
        }

        tableRowSelected.classList.add('row-selected')

        dataSelected.service=tableRowSelected.querySelector('.service__name').innerHTML
       
      
    
         
        iscomplete()
    
       
        
        
    })
})

buttonSend.addEventListener('click',e=>{
    e.preventDefault()
    
    optionsRequet={
        method:'post',
        headers:{'content-type':'application/json'},
        body: JSON.stringify(dataSelected)
    }
    fetch('/saveData',optionsRequet)
    .then(response=> response.json())
    .then(data=> displayResultatCommand(data.response))
}) 