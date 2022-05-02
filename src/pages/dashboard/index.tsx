import Head from 'next/head'
import Title from '@/components/atoms/Title'
import Layout from '@/components/templates/Layout'
import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inicio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title>Inicio</Title>
      </Layout>
    </>
  )
}

export default Dashboard
