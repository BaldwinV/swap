var address = localStorage.getItem('address')
var from_ticker = localStorage.getItem('from_ticker')
var time_started = localStorage.getItem('time_started')
var ff_exch_from = localStorage.getItem('ff.exch.from')
var ff_exch_to = localStorage.getItem('ff.exch.to')
var sending = localStorage.getItem('sending')
var sending_ = localStorage.getItem('sending_')
var sending__ = localStorage.getItem('sending__')
var recieving = localStorage.getItem('recieving')
var recieving_ = localStorage.getItem('recieving_')
var receiving__ = localStorage.getItem('receiving__')
var order_id = localStorage.getItem('order_id')
var from_network_ticker = localStorage.getItem('from_network_ticker')
var to_network_ticker = localStorage.getItem('to_network_ticker')




function formatTimestamp(timestamp) {
    // Ensure timestamp is a valid number
    if (isNaN(timestamp)) {
        console.error('Invalid timestamp');
        return 'Invalid timestamp';
    }

    const date = new Date(timestamp); // Convert the timestamp to a Date object

    // Validate if the date object is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid Date');
        return 'Invalid Date';
    }

    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month, pad with leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Get day, pad with leading zero if needed
    const year = date.getFullYear(); // Get the full year
    
    let hours = date.getHours(); // Get hours (24-hour format)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes, pad with leading zero if needed
    
    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // Handle midnight case (0 becomes 12)
    
    // Format time as 'MM/DD/YYYY h:mm AM/PM'
    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
    
    return formattedDate;
}




var dir_from = document.querySelectorAll(".order-direction > .dir-from");
dir_from.forEach(function(element) {
    var dir_cont = element.querySelectorAll(".dir-cont");
    dir_cont.forEach(function(dir) {
        dir.setAttribute('data-value', ff_exch_from);
    });
    
    var svgcoin = element.querySelector(".dir-cont > .svgcoin");
    var coin_address = element.querySelector(".dir-cont > .coin-address");
    svgcoin.classList.add(ff_exch_from.toLowerCase());
    coin_address.setAttribute("title",sending__);
    coin_address.innerHTML = sending__;
});

var dir_to = document.querySelectorAll(".order-direction > .dir-to");
dir_to.forEach(function(element) {
    var dir_cont = element.querySelectorAll(".dir-cont");
    dir_cont.forEach(function(dir) {
        dir.setAttribute('data-value', ff_exch_to);
    });

    var svgcoin = element.querySelector(".dir-cont > .svgcoin");
    var coin_address = element.querySelector(".dir-cont > .coin-address");
    svgcoin.classList.add(ff_exch_to.toLowerCase());
    coin_address.setAttribute("title",receiving__);
    coin_address.innerHTML = receiving__;
});

var order_send_value = document.getElementById("order_send_value");
order_send_value.innerHTML = `${sending} ${sending_}<sup>${from_network_ticker}</sup>`;

var order_receive_value = document.getElementById("order_receive_value");
order_receive_value.innerHTML = `${parseFloat(recieving).toFixed(8)} ${recieving_}<sup>${to_network_ticker}</sup>`;



document.querySelector("#order_info_inner > div.order-id-wrap > div > span > span").innerHTML = order_id
document.querySelector("#order_info_inner > div.order-id-wrap > div > span").setAttribute("data-copy",order_id)
document.querySelector("#order_details > div.order-data-destination > p > span").innerHTML =receiving__;
document.querySelector("#coinname ").innerHTML = recieving_;
document.querySelector(`#order_details > div.order-data-details > 
    div > p.order-p-amount > b`).setAttribute('data-copy',sending)
document.querySelector(`#order_details > div.order-data-details > 
    div > p.order-p-amount > b`).setAttribute('data-value',sending_)
document.querySelector(`#order_details > div.order-data-details > 
    div > p.order-p-amount > b`).innerHTML = `${sending}  ${sending_}<sup>${from_network_ticker}</sup>`


document.querySelector(`#order_details > div.order-data-details > div
    > p.order-p-address > span > b`).setAttribute("data-copy",sending__)

document.querySelector(`#order_details > div.order-data-details > div
    > p.order-p-address > span > b`).setAttribute("title",sending__)
document.querySelector(`#order_details > div.order-data-details > div
    > p.order-p-address > span > b`).innerHTML = sending__ +`<i class="ico copy"></i>`
    
var order_time_creation = document.getElementById("order_time_creation")
order_time_creation.setAttribute("timestamp",time_started);
order_time_creation.innerHTML = formatTimestamp(parseInt(time_started));

document.getElementById("logo_arrow_to").setAttribute("data-value",ff_exch_to)
document.getElementById("logo_text_to").setAttribute("data-value",ff_exch_to)



var order_time = document.getElementById("order_time")

function updateCountdown() {
    if (time_started == null) {
        order_time.innerHTML = `Order Expired`;
        return;
    }
    const currentTime = new Date().getTime(); // Get the current timestamp.
    const remainingTime = (parseInt(time_started) + (30 * 60*1000)) - parseInt(currentTime); // Calculate the remaining time (30 minutes = 30 * 60 * 1000 ms).
    if (remainingTime > 0) {
        const remainingMinutes = Math.floor(remainingTime / 60000); // Convert milliseconds to minutes.
        const remainingSeconds = Math.floor((remainingTime % 60000) / 1000); // Get the remaining seconds.
        // Format minutes and seconds to always have two digits.
        const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

        // Update the countdown display.
        order_time.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
    } else {
        // If the time has passed, display "Order Expired".
        order_time.innerHTML = `Order Expired`;
    }
    updateCountdown
}


function startCountdown() {
    setInterval(updateCountdown, 100);
}
startCountdown()
const qr_type01 = document.getElementById("qr_type01");
const qr_type02 = document.getElementById("qr_type02");

function generateAndGetQRCodeBase64(text) {
    // Generate the QR code
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: text,
        width: 258,
        height: 258,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Wait for the QR code to be generated and then retrieve the base64
    const canvas = document.querySelector("#qrcode canvas");  // Get the canvas element of the QR code
    if (canvas) {
        const base64 = canvas.toDataURL("image/png");  // Convert canvas to base64 PNG image
        return base64;  // Return base64 string
    } else {
        console.error('QR code canvas not found.');
        return null;
    }
}
qr_type01.setAttribute("src", generateAndGetQRCodeBase64(sending__));

const addamt = `address:${sending__}?amount=${sending}`;
qr_type02.setAttribute("src", generateAndGetQRCodeBase64(addamt));