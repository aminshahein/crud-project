let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');7
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='creat';
let glvar;

// console.log(title,price,taxes,ads,discount,total,count,category,submit)


//get total 
function gettotel(){
if(price.value !=''){
    let resulte =(+price.value + +taxes.value + +ads.value)
    - +discount.value;
    total.innerHTML= resulte ;
    total.style.background='#040';
}else{
    total.innerHTML='';
    total.style.background='#a00d02';
}
}


//cereate product
let datapro;
if(localStorage.product !=null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[]; 
}



submit.onclick=function (){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        
    }
    if(mood==='create'){
        if(newpro.count>1){
            for( let i=0 ; i<newpro.count ; i++){
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
        }
    }
    else{
        datapro[ glvar ] = newpro;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block'
    }
//count
    
    


    //save localstorage 
    localStorage.setItem('product',     JSON.stringify(datapro)    )
    
    cleardata()
    showdata()
}


//clear inputs 

function cleardata(){
title.value=''
price.value=''
taxes.value=''
ads.value=''
discount.value=''
total.innerHTML=''
count.value=''
category.value=''


}




//read 

function showdata(){
    gettotel()
 let table ='';
 for(let i=0; i < datapro.length ; i++ ){
table +=`
 <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button>
    <td><button onclick="deleteData(${i})"  id="delete">delete</button>
    </td>
</tr>
`

 }

 
 document.getElementById('tbody').innerHTML=table ;
 //deleteAll
  let btnDelete =document.getElementById('deleteAll');
 if(datapro.length > 0 ){
btnDelete.innerHTML=`
<button onclick="deleteAll()" >deleteAll(${datapro.length})</button>
`
 }else{
    btnDelete.innerHTML='';
 }

}
showdata()

function deleteAll(){
    localStorage.clear
    datapro.splice(0)
    showdata()
}
 
//delete
function deleteData(i){
datapro.splice(i,1);
localStorage.product=JSON.stringify(datapro);
showdata()
}


//update
function updateData(i){
    title.value=datapro[i].title
   price.value=datapro[i].price
    taxes.value=datapro[i].taxes
    ads.value=datapro[i].ads
    discount.value=datapro[i].discount
    category.value=datapro[i].category
    gettotel()

    count.style.display='none'
    submit.innerHTML='updata'
    mood='update'
    glvar=i;
    scroll({
        top:0,
        behavior:"smooth",
    })

}


//search
let saerchMood='title';
let search =document.getElementById('search');
function getsearchMood(id){
// console.log(id)
if(id=="searchtitle"){
    saerchMood='title';
    search.Placeholder='Search By Title'
}else{
    saerchMood='Category'
    search.Placeholder='Search By Category'

}
search.focus()
search.value='';
showdata()
}


function searchData(value){
    let table='';
if(saerchMood=='title'){
for(let i=0 ; i<datapro.length;i++){
    if(datapro[i].title.includes(value.toLowerCase())){
        table +=`
 <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button>
    <td><button onclick="deleteData(${i})"  id="delete">delete</button>
    </td>
</tr>
`
    }
}



}

else{
    for(let i=0 ; i<datapro.length;i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            table +=`
     <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button>
        <td><button onclick="deleteData(${i})"  id="delete">delete</button>
        </td>
    </tr>
    `
        }
    }
    

    }
    
    document.getElementById('tbody').innerHTML=table ;

}