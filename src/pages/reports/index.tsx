import Head from 'next/head'
import Title from 'src/components/atoms/Title'
import Layout from 'src/components/templates/Layout'
import type { NextPage } from 'next'
import { useToasts } from 'react-toast-notifications'
import { useState } from 'react'
import useRegistries from 'src/hooks/useRegistries'
import useCategories from 'src/hooks/useCategories'
import useCurrencies from 'src/hooks/useCurrencies'

const Reports: NextPage = () => {
  const { addToast } = useToasts()
  const [visible, setVisible] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const {
    data: registries,
    isLoading: loadingRegistries,
    mutate: mutateRegistries,
  } = useRegistries({
    page: page,
  })
  const [types, _] = useState(['Income', 'Expense'])
  const { data: categories } = useCategories({ limit: 100 })
  const { data: currencies } = useCurrencies({ limit: 100 })
  const [enableBack, setEnableBack] = useState(false)
  const [enableNext, setEnableNext] = useState(false)
  return (
    <>
      <Head>
        <title>Reports</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Title>Reports</Title>
      </Layout>
    </>
  )
}

export default Reports
