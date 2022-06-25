const myForm = document.querySelector('#my-form')
const expenseamountInput = document.querySelector('#expenseamount');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category')
const msg = document.querySelector('.msg');
myForm.addEventListener('submit', onSubmit);
document.addEventListener('DOMContentLoaded', DisplayExpenses)

async function DisplayExpenses()
{
  try
  {
  let res = await axios.get("https://crudcrud.com/api/7b8eecf732774d8fb607585d2d407341/expenses")
  var html = ""
  for(var i=0;i<res.data.length;i++)
  {
    html+='<li>' + res.data[i].expenseamount +" - " + res.data[i].description +" - " + res.data[i].category + ' <button onclick="deleteRow('+i+')"> Delete Expense </button>' + ' <button onclick="editRow('+i+')"> Edit Expense </button>' + '</li>'  
  }
  document.getElementById("output").innerHTML = html 
  }
  catch(err)
  {
    console.log(err)
  } 
}

async function onSubmit(e) 
{
  e.preventDefault();
  if(expenseamountInput.value === '' || descriptionInput.value === '' || categoryInput.value === '') 
  {
    msg.innerHTML = 'Please enter all fields*';
    msg.style.color = 'red'
    setTimeout(() => msg.remove(), 5000);
  } 
  else 
  {
    let myNewObj={expenseamount:expenseamountInput.value,description:descriptionInput.value,category:categoryInput.value}
    try
    {
      let res = await axios.post("https://crudcrud.com/api/7b8eecf732774d8fb607585d2d407341/expenses", myNewObj)
      DisplayExpenses()
    }
    catch(err)
    {
      console.log(err)
    }
    expenseamountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';   
  }
}

async function deleteRow(i)
{   
  try
  {
    let res = await axios.get("https://crudcrud.com/api/7b8eecf732774d8fb607585d2d407341/expenses")
    let url = "https://crudcrud.com/api/7b8eecf732774d8fb607585d2d407341/expenses/"+res.data[i]._id;  
    try
    {
      let res = await axios.delete(url)
      DisplayExpenses()
    }
    catch(err)
    {
      console.log(err)
    }
  }
    catch(err)
    {
      console.log(err)
    }  
}

async function editRow(i)
{
  try
  {
    let res = await axios.get("https://crudcrud.com/api/7b8eecf732774d8fb607585d2d407341/expenses")
    expenseamountInput.value = res.data[i].expenseamount;
    descriptionInput.value = res.data[i].description;
    categoryInput.value = res.data[i].category;
    deleteRow(i);
    DisplayExpenses()
  }
  catch(err)
  {
    console.log(err)
  }  
}

