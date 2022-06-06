const seats=document.querySelectorAll('.row .seat:not(.occupied)');
const count=document.getElementById('number');
const price=document.getElementById('price');
const container=document.querySelector('.container');
const movie=document.getElementById('movies');
let val=parseInt(movie.value);
populateUI();
movie.addEventListener('change',function()
{
    val=parseInt(movie.value);
    storemovie(movie.selectedIndex,movie.value);
    updatetotal();
})
container.addEventListener('click',function(e)
{
    if(e.target.classList.contains('seat')===true && e.target.classList.contains('occupied')===false)
    {
       e.target.classList.toggle('selected');
    }
    updatetotal();
})
function updatetotal()
{
    const selectedseats=document.querySelectorAll('.row .seat.selected');
    const len=selectedseats.length;
    count.innerText=len;
    price.innerText=val*len;
    store();
}
function store()
{
    const selectedseats=document.querySelectorAll('.row .seat.selected');

    
        const selectIndex=[...selectedseats].map(function(seat)
        {
             return [...seats].indexOf(seat);
        })
        localStorage.setItem('selectedseatsindex',JSON.stringify(selectIndex));
    
}
function storemovie(movieIndex,movieprice)
{
    localStorage.setItem('MovieIndex',JSON.stringify(movieIndex));
    localStorage.setItem('Movieprice',movieprice);
}
function populateUI()
{
    const selectedseats=JSON.parse(localStorage.getItem('selectedseatsindex'));
    if(selectedseats!==null)
    {
        seats.forEach(function(seat,index)
        {
            if(selectedseats.indexOf(index)>-1)
            {
                seat.classList.add('selected');
            }
        })
    }
    const getmovieindex=JSON.parse(localStorage.getItem('MovieIndex'));
    movie.selectedIndex=getmovieindex;
    const getmovieprice=JSON.parse(localStorage.getItem('Movieprice'));
    val=parseInt(getmovieprice);
    updatetotal();
    
}