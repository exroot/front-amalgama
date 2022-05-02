import Head from 'next/head'
import Title from '@/components/atoms/Title'
import Layout from '@/components/templates/Layout'
import type { NextPage } from 'next'

const Categories: NextPage = () => {
  return (
    <>
      <Head>
        <title>Categorías</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title>Categorías</Title>
      </Layout>
    </>
  )
}

export default Categories
