import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)

export default async function initiateCheckout({ lineItems } = {}) {
  const stripe = await stripePromise
  await stripe.redirectToCheckout({
    lineItems,
    mode: "payment",
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  })
}
