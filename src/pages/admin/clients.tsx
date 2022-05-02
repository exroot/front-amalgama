import Head from 'next/head'
import Title from '@/components/atoms/Title'
import Layout from '@/components/templates/Layout'
import type { NextPage } from 'next'

const Clients: NextPage = () => {
  return (
    <>
      <Head>
        <title>Clientes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title>Clientes</Title>
      </Layout>
    </>
  )
}

export default Clients
