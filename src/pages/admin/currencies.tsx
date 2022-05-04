import Head from "next/head";
import Title from "src/components/atoms/Title";
import Layout from "src/components/templates/Layout";
import type { NextPage } from "next";
import useCurrencies from "src/hooks/useCurrencies";
import { useToasts } from "react-toast-notifications";
import { useEffect, useState } from "react";
import TableInstance from "src/components/molecules/Table";
import FormError from "src/components/atoms/FormError";
import { saveCurrency } from "src/services/currenciesServices";
import Button from "src/components/atoms/Button";
import { Form, Formik } from "formik";
import Modal from "src/components/molecules/Modal";
import CurrencySchema from "src/validations/currency.schema";
import FormGroup from "src/components/molecules/FormGroup";
import Label from "src/components/atoms/Label";
import FormField from "src/components/molecules/FormField";

const TableCurrencies = ({
  columnsDisplayed,
  setEnableNext,
  setEnableBack,
  currencies,
  loadingCurrencies,
}: any) => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (!currencies) {
      return;
    }
    setEnableNext(currencies.length > 10 ? true : false);
    setEnableBack(currencies.length > 10 ? true : false);
    setTableData(() => {
      const currency = currencies.map((currency: any) => {
        return {
          id: currency?.id,
          symbol: currency?.symbol,
          description: currency?.description,
        };
      });
      return currency;
    });
  }, [currencies]);

  if (loadingCurrencies || !tableData) {
    return <div>Loading...</div>;
  }

  return (
    <TableInstance
      tableData={tableData}
      columnsDisplayed={columnsDisplayed}
      columnsLabels={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Symbol",
          accessor: "symbol",
        },
        {
          Header: "Description",
          accessor: "description",
        },
      ]}
    />
  );
};

const Currencies: NextPage = () => {
  const { addToast } = useToasts();
  const [initialValues] = useState({
    symbol: "",
    description: "",
  });
  const [visible, setVisible] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {
    data: currencies,
    isLoading: loadingCurrencies,
    mutate: mutateCurrencies,
  } = useCurrencies({
    page,
    limit,
    show_meta: true,
  });

  const [enableBack, setEnableBack] = useState(false);
  const [enableNext, setEnableNext] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { data } = await saveCurrency(values);
      addToast(`${values.type} saved succesfully.`, {
        appearance: "success",
      });
      await mutateCurrencies((prevData: any) => {
        const newData = [...prevData, data];
        return newData;
      }, false);
      setVisible(false);
      return data;
    } catch (err) {
      console.error("ERROR at handleSubmit: ", err);
      addToast(`Error trying to save registry.`, {
        appearance: "error",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Currencies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex justify-between">
          <Title>Currencies</Title>
          <Button onClick={() => setVisible((prev) => !prev)} type="button">
            Add currency
          </Button>
        </div>
        <Modal
          showModal={visible}
          content={
            <Formik
              initialValues={{ ...initialValues }}
              validationSchema={CurrencySchema}
              validateOnBlur={false}
              onSubmit={async (values, actions) =>
                handleSubmit(values, actions)
              }
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="mx-auto rounded-lg bg-white px-6 pt-8 pb-6 shadow-md">
                  <FormGroup>
                    <Label htmlFor="symbol">
                      Symbol <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="symbol"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    {touched.symbol && errors.symbol && (
                      <FormError>{errors.symbol}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="description">
                      Description <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="description"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    {touched.description && errors.description && (
                      <FormError>{errors.description}</FormError>
                    )}
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
                        <Button type="submit">Save</Button>
                      </div>
                    </div>
                  </FormGroup>
                </Form>
              )}
            </Formik>
          }
        />
        <div className="rounded-lg py-4">
          <div className="flex items-center justify-end space-x-2 pb-2">
            <span className="font-medium text-gray-700">Display:</span>
            <FormField
              name="limit"
              type="select"
              options={[5, 10, 20, 50, 100]}
              formik={false}
              onChange={(e: any) => setLimit(e.target.value)}
            />
          </div>

          <TableCurrencies
            setEnableBack={setEnableBack}
            setEnableNext={setEnableNext}
            columnsDisplayed={["id", "symbol", "description"]}
            limit={limit}
            offset={(page - 1) * limit}
            currencies={currencies}
            loadingCurrencies={loadingCurrencies}
          />
        </div>
      </Layout>
    </>
  );
};

export default Currencies;
