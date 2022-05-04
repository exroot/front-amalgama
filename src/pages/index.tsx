import Head from 'next/head'
import Title from 'src/components/atoms/Title'
import Layout from 'src/components/templates/Layout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inicio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title>Dashboard</Title>
      </Layout>
    </>
  )
}

export default Home
