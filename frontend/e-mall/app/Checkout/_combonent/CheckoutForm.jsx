import { useUser } from '@clerk/nextjs';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import orderApis from '../../_utility/OrderApis'
import CartApis from '../../_utility/CartApis';
import { CartContext } from '../../_Context/CartContext';
const CheckoutForm = ({amount}) => {
    const {cart, setCart} = useContext(CartContext);
    const {user} = useUser();
    const stripe = useStripe();
    const elements = useElements();
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }


      const handleError = (error) => {
       setLoading(false)
       setErrorMessage(error.message)
      }
      crOrder();
      sendEmail();
      const {error: submitError} = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

     const res = await fetch('api/create_intent',{
        method:'POST',
        body: JSON.stringify({
            amount: amount
        })
     })
     const clientSecret = await res.json()
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        clientSecret,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/Payment_confirm",
        },
      });
  
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
  

   const crOrder = () => {
    let productIds = [];
    cart.forEach(el => {
        productIds.push(el?.product?.id)
    })
    
    const data = {
        data:{
            email: user.primaryEmailAddress.emailAddress,
            username: user.fullName,
            amount,
            products: productIds
        }
    }
    orderApis.createOrder(data).then((res) => {
      if(res){
        cart.forEach(el=>{
          CartApis.deleteCartItem(el?.id).then(result=>{

          })
        })
      }
    })
   }

   const sendEmail = async()=>{
    const res = await fetch('api/send-email',{
      method:'POST',
      body: JSON.stringify({
				amount: amount,
				email: user.primaryEmailAddress.emailAddress,
				fullName: user.fullName
			})
      
   })
  }


    
  return (
   <>
    <form onSubmit={handleSubmit}>
      <div className='mx-32 md:mx-[320px] mt-12'>
      <PaymentElement />
      <button className=' rounded-lg w-full p-2 mt-4 text-white bg-primary'>Submit</button>
      </div>
    </form>
   </>
  );
};

export default CheckoutForm;