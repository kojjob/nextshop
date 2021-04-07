import { useState } from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import Nav from "../components/nav"

import initiateCheckout from "../lib/payments"

import products from "../products.json"
const defaultCart = {
  products: {},
}
export default function Home() {
  const [cart, updateCart] = useState(defaultCart)

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`)
    return {
      ...cart.products[key],
      priceItem: product.price,
    }
  })
  // total items in cart
  const subTotal = cartItems.reduce((accm, { priceItem, quantity }) => {
    return accm + priceItem * quantity
  }, 0)

  // total quantity in cart
  const totalItems = cartItems.reduce((accm, { quantity }) => {
    return accm + quantity
  }, 0)
  // Add items to cart
  function addToCart({ id } = {}) {
    updateCart((prev) => {
      let cartState = { ...prev }
      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        }
      }
      return cartState
    })
  }
  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        }
      }),
    })
  }
  return (
    <div className={styles.container}>
      <Nav />
      <Head>
        <title>MyorganicBody</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>MyOrganic Body</h1>

          <p className={styles.description}>
            Get all your organic products from here{" "}
          </p>
          <p className={styles.description}>
            <strong>Items:</strong>
            {totalItems}
            <br />
            <strong>Total Cost:</strong> £{subTotal}
            <br />
            <button className={styles.button} onClick={checkout}>
              Check Out
            </button>
          </p>
        </header>
        <ul className={styles.grid}>
          {products.map((product) => {
            const { id, title, image, price } = product
            return (
              <li key={id} className={styles.card}>
                <a href='#'>
                  <img src={image} alt='{title}' />
                  <div className={styles.info}>
                    <h3>{title}</h3>
                    <div className={styles.price}>£{price}</div>
                  </div>
                </a>
                <p>
                  <button
                    className={styles.button}
                    //Click to add to cart
                    onClick={() => {
                      addToCart({
                        id,
                      })
                    }}
                  >
                    Add to Cart
                  </button>
                </p>
              </li>
            )
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://nextshop-ivory.vercel.app/#'
          target='_blank'
          rel='noopener noreferrer'
        >
          MyorganicBody
        </a>
      </footer>
    </div>
  )
}
