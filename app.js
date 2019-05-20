const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());



    app.get('/',async (req,res)=>{
        
        const stripe = require('stripe')('sk_test_7keJtRbYItbAxJP3XnO9gtwh00kllOJx5v');
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
        name: 'T-shirt',
        description: 'Comfortable cotton t-shirt',
        images: ['https://cdn.shopify.com/s/files/1/0686/5373/products/new_element_760x.jpg?v=1550770625%27'],
        amount: 1300,
        currency: 'usd',
        quantity: 1,
        }],
        success_url: 'http://localhost:5000/success',
        cancel_url: 'http://localhost:5000/cancel',
    });

    res.send(session.id)


});


app.get('/success',(req,res)=>{ res.send('success')});
app.get('/cancell',(req,res)=>{ res.send('cancell')});


app.listen('5000',()=>{
    console.log('server is running...');
})