const myForm = document.querySelector('#my-form')
const expenseamountInput = document.querySelector('#expenseamount');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category')
const msg = document.querySelector('.msg');
myForm.addEventListener('submit', onSubmit);
document.addEventListener('DOMContentLoaded', DisplayExpenses)

function DisplayExpenses()
{
  axios.get("https://crudcrud.com/api/bfc88949991a4b009bc61b291e69a4bb/expenses")
  .then((res) => { 
  var html = ""
  for(var i=0;i<res.data.length;i++)
  {
    html+='<li>' + res.data[i].expenseamount +" - " + res.data[i].description +" - " + res.data[i].category + ' <button onclick="deleteRow('+i+')"> Delete Expense </button>' + ' <button onclick="editRow('+i+')"> Edit Expense </button>' + '</li>'  
  }
  document.getElementById("output").innerHTML = html   
  }).catch((err) => console.log(err))
}

function onSubmit(e) 
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
    axios.post("https://crudcrud.com/api/bfc88949991a4b009bc61b291e69a4bb/expenses",myNewObj).then( res => DisplayExpenses()).catch( err => console.log(err))
    expenseamountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';   
  }
}

function deleteRow(i)
{
  axios.get("https://crudcrud.com/api/bfc88949991a4b009bc61b291e69a4bb/expenses").then((res) => {
    let url = "https://crudcrud.com/api/bfc88949991a4b009bc61b291e69a4bb/expenses/"+res.data[i]._id;
    axios.delete(url).then( res => DisplayExpenses()).catch( err => console.log(err))
    }).catch( err => console.log(err))
}

function editRow(i)
{
  axios.get("https://crudcrud.com/api/bfc88949991a4b009bc61b291e69a4bb/expenses").then( res => {
    expenseamountInput.value = res.data[i].expenseamount;
    descriptionInput.value = res.data[i].description;
    categoryInput.value = res.data[i].category;
    deleteRow(i);
    DisplayExpenses()
  }).catch( err => console.log(err))

}

