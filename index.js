document.getElementById('select_currency_from').addEventListener('change', function(event) {
    const selectedOption = event.target.selectedOptions[0];
    const address = selectedOption.getAttribute('data-address');
    console.log('Selected Address:', address);
});

var rates_data = []

function getRates(){
    fetch('https://ff.io/rates/fixed.xml')
    //    fetch('./s.xml')

       .then(response => response.text()) 
       .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");  // Parse the XML string
        const cache_rate =[]
        // Now you can work with the XML document
          // Now you can work with the XML document
          const items = xmlDoc.getElementsByTagName("item");
          for (let i = 0; i < items.length; i++) {
              const from = items[i].getElementsByTagName("from")[0].textContent;
              const to = items[i].getElementsByTagName("to")[0].textContent;
              const in_ = items[i].getElementsByTagName("in")[0].textContent;
              const out = items[i].getElementsByTagName("out")[0].textContent;
              const minamount = items[i].getElementsByTagName("minamount")[0].textContent;
              const maxamount = items[i].getElementsByTagName("maxamount")[0].textContent;

              // Add the parsed data to the rates_data array
              cache_rate.push({
                  from: from,
                  to: to,
                  in: in_,
                  out: out,
                  minamount: minamount,
                  maxamount: maxamount
              });
          }
          rates_data = cache_rate
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
getRates()


var select_currency_from = document.getElementById("select_currency_from");
var select_maxmin_from = document.getElementById("select_maxmin_from");
var select_label_from = document.getElementById("select_label_from");
var select_hinterror_from = document.getElementById("select_hinterror_from");
var select_rate_from = document.getElementById("select_rate_from");
var rate_usd_from = document.getElementById("rate_usd_from");


var receive_wallet = document.getElementById("receive_wallet");
var select_hinterror_to = document.getElementById("select_hinterror_to");
var select_maxmin_to = document.getElementById("select_maxmin_to");
var select_amount_to = document.getElementById("select_amount_to");



const selectAmountFrom = document.getElementById("select_amount_from");
const select_rate_to = document.getElementById("select_rate_to");
const rate_usd_to = document.getElementById("rate_usd_to");

selectAmountFrom.addEventListener('change', function() {
    const selectedValue = selectAmountFrom.value;  // Get the current value
    calculate(
        document.getElementById("select_currency_from").value,
        document.getElementById("select_currency_to").value,
        parseFloat(selectedValue))
});

selectAmountFrom.addEventListener('input', function() {
    const selectedValue = selectAmountFrom.value;  // Get the current value
    calculate(
        document.getElementById("select_currency_from").value,
        document.getElementById("select_currency_to").value,
        parseFloat(selectedValue))
    
});
function calculate(a,b,amt){
    rates_data.forEach(item => {
        if (item.from == a && item.to ==b){
            if(amt < item.minamount) {
                document.getElementById("select_hinterror_from").innerHTML= "amount must be lesser than minimum ammount";
                return
            }
            if(amt > item.maxamount) {
                document.getElementById("select_hinterror_from").innerHTML= "amount must be greater than maximum ammount";
                return
            }
            var result = parseFloat((amt * item.out)/item.in);
            var result_ = parseFloat((1)/item.out);
            var select_label_to = document.querySelector("#select_label_to .coin-name .name").textContent;
            var select_label_from = document.querySelector("#select_label_from .coin-name .name").textContent;
            
            localStorage.setItem('sending', amt);
            localStorage.setItem('sending_', select_label_from);
            localStorage.setItem('recieving', result);
            localStorage.setItem('recieving_', select_label_to);
            console.log(result);
            select_amount_to.value  = `≈ ${result}`;
            select_maxmin_to.innerHTML =    
            `   
                <button type="button" class="maxmin-value" data-value="1">
                    <span class="prefix">min:</span>
                    <span>1 ${localStorage.getItem("from_ticker")}</span>
                </button>

                <button type="button" class="maxmin-value" data-value="${result}">
                <span class="prefix">max:</span><span>${result} ${select_label_to}</span>
                </button>

                `;
                select_rate_to.innerHTML = `1 ${select_label_to } ≈ ${result_.toFixed(8)} ${select_label_from}`
                select_rate_from.innerHTML = `1 ${select_label_from} ≈ ${result} ${select_label_to }`
            return result

        }
    }); 
}
function generateUppercaseAlphanumericCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const length = 6;
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    
    return result;
}
// Example usage
 
