import React, { useContext } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../components/CheckoutForm'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const stripePromise = loadStripe(
  'pk_test_51Kx8UqKkc56uh5keWENgIkUvU6KFeXDGPltNfwlxaAmrSfLJYGIm9Ga6SaaplguyUedUqBK0Sw1J18JhbkU3vT1B00PA2zniCK',
)
const PaymentPage = () => {
  const { user } = useContext(AuthContext)

  const location = useLocation()
  const [clientSecret, setClientSecret] = useState('')
  const [reservationId, setReservationId] = useState('')
  const [reservationDates, setReservationDates] = useState(null)
  const houseId=location.state.house._id;
  var ranonce = false
  console.log(location.state.house._id)
  useEffect(() => {
    if (!ranonce) {
      //Run you code

      const makeRequest = async () => {
        try {
          const res = await axios.post(
            `http://localhost:8800/api/reservation/create-payment-intent/${location.state.house._id}`,
            {
              dates: location.state.dates,
              userId: user._id,
              price: location.state.house.price,
            },
            { withCredentials: true, credentials: 'include' },
          )
          setClientSecret(res.data.clientSecret)
          setReservationId(res.data.reservationId)
          setReservationDates(res.data.reservationDates)
        } catch (err) {
          console.log(err)
        }
      }
      makeRequest()

      ranonce = true
    }
  }, [])

  const options = {
    // passing the client secret obtained in step 3
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance: { theme: 'stripe' },
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm

            
            reservationId={reservationId}
            reservationDates={reservationDates}
            houseId={houseId}
          />
        </Elements>
      )}
    </>
  )
}

export default PaymentPage
