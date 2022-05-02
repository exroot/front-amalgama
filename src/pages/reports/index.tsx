import Head from 'next/head'
import Title from '@/components/atoms/Title'
import Layout from '@/components/templates/Layout'
import type { NextPage } from 'next'

const Reports: NextPage = () => {
  return (
    <>
      <Head>
        <title>Reportes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title>Reportes</Title>
      </Layout>
    </>
  )
}

export default Reports
