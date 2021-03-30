import Head from "next/head"
import styles from "../styles/Home.module.css"

import initiateCheckout from "../lib/payments"

import products from "../products.json"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MyorganicBody</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>MyOrganics Body</h1>

        <p className={styles.description}>
          Get all your organic products from here{" "}
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { id, title, description, image, price } = product
            return (
              <li key={id} className={styles.card}>
                <a href='#'>
                  <img src={image} alt='{title}' />
                  <h3>{title}</h3>
                  <p>£{price}</p>
                  <p>{description}</p>
                </a>
                <p>
                  <button
                    className={styles.button}
                    onClick={() => {
                      initiateCheckout({
                        lineItems: [
                          {
                            price: id,
                            quantity: 1,
                          },
                        ],
                      })
                    }}
                  >
                    Buy Now
                  </button>
                </p>
              </li>
            )
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        ></a>
      </footer>
    </div>
  )
}
