import Head from 'next/head'
import Title from 'src/components/atoms/Title'
import Layout from 'src/components/templates/Layout'
import type { NextPage } from 'next'

const Administration: NextPage = () => {
  return (
    <>
      <Head>
        <title>Administration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title>Administration</Title>
      </Layout>
    </>
  )
}

export default Administration
