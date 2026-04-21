// Initialize EmailJS (Replace with your actual Public Key)
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

// 1. pH Slider Logic
const phSlider = document.getElementById('phSlider');
const inkPreview = document.getElementById('inkPreview');
const hexText = document.getElementById('hexValue');
const rgbText = document.getElementById('rgbValue');

const colors = {
    acidic: { r: 209, g: 73, b: 91, hex: '#D1495B' }, // Hibiscus Red
    alkaline: { r: 72, g: 61, b: 139, hex: '#483D8B' } // Deep Violet
};

phSlider.addEventListener('input', (e) => {
    const val = e.target.value / 100;
    
    // Interpolate RGB values
    const r = Math.round(colors.acidic.r + (colors.alkaline.r - colors.acidic.r) * val);
    const g = Math.round(colors.acidic.g + (colors.alkaline.g - colors.acidic.g) * val);
    const b = Math.round(colors.acidic.b + (colors.alkaline.b - colors.acidic.b) * val);
    
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hex = rgbToHex(r, g, b);

    inkPreview.style.backgroundColor = rgb;
    hexText.innerText = hex.toUpperCase();
    rgbText.innerText = `${r}, ${g}, ${b}`;
});

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// 2. Batch Traceability Mock Logic
function traceBatch() {
    const id = document.getElementById('batchInput').value;
    const impactVal = document.getElementById('impact-val');
    const harvestVal = document.getElementById('harvest-val');

    if(id.includes('HB')) {
        impactVal.innerText = "2.4 kg CO2";
        harvestVal.innerText = "Oct 12, 2024";
        alert("Batch Found: Sourced from 'The Secret Garden Florals', London.");
    } else {
        alert("Batch ID not found. Try #HB-2026");
    }
}

// 3. Subscription Toggle
const toggle = document.getElementById('toggleSub');
toggle.addEventListener('click', () => {
    toggle.classList.toggle('active-toggle');
    const prices = document.querySelectorAll('.text-price');
    prices.forEach(p => {
        if(toggle.classList.contains('active-toggle')) {
            p.innerText = "$25.60"; // 20% off
        } else {
            p.innerText = "$32.00";
        }
    });
});

// 4. RECEIVE ORDERS VIA GMAIL
// This uses EmailJS to send a professional email without a backend
function handleOrder(productName) {
    const isSub = toggle.classList.contains('active-toggle') ? "Yes" : "No";
    
    const templateParams = {
        product: productName,
        subscription: isSub,
        customer_email: "customer@example.com", // In a real app, get this from a form
        order_id: Math.floor(Math.random() * 100000)
    };

    // To make this work:
    // 1. Create account at emailjs.com
    // 2. Connect your Gmail
    // 3. Create an "Email Template"
    // 4. Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' below

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
           alert('Order Sent to FloraHue! Check your Gmail for confirmation.');
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           alert('Failed to send order... Please check EmailJS configuration.');
           console.log('FAILED...', error);
        });
}