//Listen for Submit
document.getElementById('loan-form').addEventListener('submit', showloader)
    
    // show loaderunction(e


//Calculate Result
function calculateResults(){

    //UI Variables

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //Grabbing the values and converting the to decimals

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payment

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block'
        document.getElementById('loading').style.display = 'none'
    
    } else {
        showerror('please check your numbers');
        

    }

}

function showerror(error){
    document.getElementById('results').style.display = 'none'
    document.getElementById('loading').style.display = 'none'

    // create a div element 
    const errordiv = document.createElement('div');
    errordiv.className = 'alert alert-danger';

    //create textnode and append to div

    errordiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const loantext = document.querySelector('.heading')

    card.insertBefore(errordiv, loantext);


    setTimeout(clearError => {
        document.querySelector('.alert').remove()
    }, 3000);
}

function showloader(e){
    document.getElementById('results').style.display = 'none'
    document.getElementById('loading').style.display = 'block'

    setTimeout(calculateResults, 2000);

    e.preventDefault()
}
