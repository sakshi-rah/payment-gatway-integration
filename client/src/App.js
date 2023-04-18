import React from 'react'
import axios from 'axios'

import "./App.css"

function App() {

    const paymentHandler = (response) => {
        console.log(response)
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    }

    const initPayment = async (amount) => {

        const { data } = await axios.post("/createOrder", {
            amount: amount,
            notes: {
                user: "Test User",
                item: "silk saree"
            }
        })

        const orderId = data.order.id

        const options = {
            "key": "rzp_test_Hx1u2oka1Tudh0",
            "amount": amount * 100,
            "currency": "INR",
            "name": "Sakshi Collection",
            "description": "buy best quality products",
            "image": "https://the-s-collection.com/wp-content/uploads/2022/03/S-Logo.png",
            "order_id": orderId,
            "handler": paymentHandler,
            "prefill": {
                "name": "Atul Rahangdale",
                "email": "atulrah@gmail.com",
                "contact": "+91 0000000000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#a6ff4d"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on('payment.failed', function (response) {
            alert('Payment Failed')
            console.log(response);
        });
    }
    return (
        <div>
            <h1 className='text-center'>Buy Products</h1>

            <div class="card product-card">
                <img src="https://cdn.shopify.com/s/files/1/1760/4649/products/south-silk-saree-deep-pink-zari-woven-south-silk-saree-silk-saree-online-28958080073921_300x.jpg?v=1648470851" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Silk Fancy Saree</h5>
                    <p class="card-text">₹ 4,824</p>
                    <a href='https://www.karagiri.com/products/deep-pink-zari-woven-south-silk-saree-36429'>          
                    <button type="button" onClick={() => { initPayment(4824) }} class="btn btn-success">Buy Now</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default App