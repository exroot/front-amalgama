import Head from 'next/head'
import Title from '@/components/atoms/Title'
import Layout from '@/components/templates/Layout'
import type { NextPage } from 'next'
import { ErrorMessage, Form, Formik } from 'formik'
import FormError from '@/components/atoms/ErrorMessage'
import FormGroup from '@/components/molecules/FormGroup'
import Label from '@/components/atoms/Label'
import FormField from '@/components/molecules/FormField'
import { useEffect, useMemo, useState } from 'react'
import RegistriesSchema from '@/validations/registries.schema'
import Button from '@/components/atoms/Button'
import Modal from '@/components/molecules/Modal'
import useCategories from '@/hooks/useCategories'
import useCurrencies from '@/hooks/useCurrencies'
import useRegistries from '@/hooks/useRegistries'
import { useSortBy, useTable } from 'react-table'
import Table from '@/components/molecules/Table'
import { saveRegistry } from '@/services/registriesServices'
import { useToasts } from 'react-toast-notifications'

const TableRegistries = ({
  columnsDisplayed,
  offset,
  limit,
  setEnableNext,
  setEnableBack,
  date,
  Registries,
  loadingRegistries,
}: any) => {
  const [tableData, setTableData] = useState(null)

  useEffect(() => {
    console.log('REGISTRIES: ', Registries)
    if (!Registries) {
      return
    }
    setEnableNext(Registries.length > 10 ? true : false)
    setEnableBack(Registries.length > 10 ? true : false)
    setTableData(() => {
      const registry = Registries.map((registry: any) => {
        return {
          title: registry?.title,
          category: registry?.category?.category,
          description: registry?.description,
          currency: registry?.currency?.symbol,
          amount: registry?.amount,
          created_at: registry?.created_at,
        }
      })
      console.log('registry: ', registry)
      return registry
    })
  }, [Registries])

  if (loadingRegistries || !tableData) {
    return <div>Loading...</div>
  }

  return (
    <TableInstanceRegistries
      tableData={tableData}
      columnsDisplayed={columnsDisplayed}
    />
  )
}

const TableInstanceRegistries = ({ columnsDisplayed, tableData }: any) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Currency',
        accessor: 'currency',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Datetime',
        accessor: 'created_at',
      },
    ].filter((column) => columnsDisplayed.includes(column.accessor))
    return [columns, tableData]
  }, [columnsDisplayed, tableData])

  const renderCell = (cell: any) => {
    return cell.render('Cell')
  }

  const tableInstance = useTable({ columns, data }, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <Table
      getTableProps={getTableProps}
      getTableBodyProps={getTableBodyProps}
      headerGroups={headerGroups}
      rows={rows}
      prepareRow={prepareRow}
      renderCell={renderCell}
    />
  )
}

const Registries: NextPage = () => {
  const { addToast } = useToasts()
  const [initialValues] = useState({
    title: '',
    category: '',
    currency: '',
    description: '',
    amount: '',
  })
  const [visible, setVisible] = useState(false)
  const {
    data: Registries,
    isLoading: loadingRegistries,
    mutate: mutateRegistries,
  } = useRegistries({
    page: 3,
  })
  const [types, _] = useState(['Income', 'Expense'])
  const { data: categories } = useCategories({ limit: 100 })
  const { data: currencies } = useCurrencies({ limit: 100 })
  const [enableBack, setEnableBack] = useState(false)
  const [enableNext, setEnableNext] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { data } = await saveRegistry(values)
      addToast(`${values.type} saved succesfully.`, {
        appearance: 'success',
      })
      await mutateRegistries((prevData: any) => {
        const newData = [...prevData, data]
        return newData
      }, false)
      setVisible(false)
      return data
    } catch (err) {
      console.error('ERROR at handleSubmit: ', err)
      addToast(`Error trying to save registry.`, {
        appearance: 'error',
      })
    }
  }
  return (
    <>
      <Head>
        <title>Incomes/Expenses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex justify-between">
          <Title>Incomes/Expenses</Title>
          <Button onClick={() => setVisible((prev) => !prev)} type="button">
            Add registry
          </Button>
        </div>

        <Modal
          showModal={visible}
          content={
            <Formik
              initialValues={{ ...initialValues }}
              validationSchema={RegistriesSchema}
              validateOnBlur={false}
              onSubmit={async (values, actions) =>
                handleSubmit(values, actions)
              }
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="mx-auto rounded-lg bg-white px-6 pt-8 pb-6 shadow-md">
                  <FormGroup>
                    <Label htmlFor="title">
                      Title <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="title"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    <ErrorMessage
                      name="title"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="type">
                      Type <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="type"
                      type="select"
                      errors={errors}
                      touched={touched}
                      options={types}
                    />
                    <ErrorMessage
                      name="type"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="amount">
                      Amount <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="amount"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    <ErrorMessage
                      name="amount"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="currency">
                      Currency <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="currency"
                      type="select"
                      errors={errors}
                      touched={touched}
                      options={currencies}
                      optionLabel={'symbol'}
                      optionValue={'id'}
                    />
                    <ErrorMessage
                      name="currency"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="category">
                      Category <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="category"
                      type="select"
                      errors={errors}
                      touched={touched}
                      options={categories || []}
                      optionLabel="category"
                      optionValue="id"
                    />
                    <ErrorMessage
                      name="category"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <FormField
                      name="description"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    <ErrorMessage
                      name="description"
                      render={(msg) => <FormError>{msg}</FormError>}
                    />
                  </FormGroup>

                  <FormGroup>
                    <div className="block w-full items-center justify-between space-y-4 sm:flex sm:space-y-0">
                      <div className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        <span className="text-red-400">*</span> Fields are
                        mandatory.
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="block h-12 w-full rounded-lg border border-blue-800 bg-white px-4 py-2 font-bold uppercase tracking-wide text-blue-800 outline-none duration-200 ease-in-out hover:bg-gray-100
    focus:outline-none sm:w-56"
                          type="button"
                          onClick={() => setVisible(false)}
                        >
                          Cancel
                        </button>
                        <Button type="submit">Save </Button>
                      </div>
                    </div>
                  </FormGroup>
                </Form>
              )}
            </Formik>
          }
        />
        <div className="rounded-lg py-4">
          <TableRegistries
            setEnableBack={setEnableBack}
            setEnableNext={setEnableNext}
            columnsDisplayed={[
              'title',
              'category',
              'currency',
              'description',
              'amount',
              'created_at',
            ]}
            limit={limit}
            offset={(page - 1) * limit}
            Registries={Registries}
            loadingRegistries={loadingRegistries}
          />
        </div>
      </Layout>
    </>
  )
}

export default Registries
