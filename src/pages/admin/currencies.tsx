import Head from 'next/head'
import Title from '@/components/atoms/Title'
import Layout from '@/components/templates/Layout'
import type { NextPage } from 'next'

const Currencies: NextPage = () => {
  return (
    <>
      <Head>
        <title>Monedas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title>Monedas</Title>
      </Layout>
    </>
  )
}

export default Currencies
