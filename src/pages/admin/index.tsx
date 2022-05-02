import Head from 'next/head'
import Title from '@/components/atoms/Title'
import Layout from '@/components/templates/Layout'
import type { NextPage } from 'next'

const Administration: NextPage = () => {
  return (
    <>
      <Head>
        <title>Administración</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title>Administración</Title>
      </Layout>
    </>
  )
}

export default Administration
