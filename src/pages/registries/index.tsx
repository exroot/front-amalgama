import Head from "next/head";
import Title from "src/components/atoms/Title";
import Layout from "src/components/templates/Layout";
import type { NextPage } from "next";
import { Form, Formik } from "formik";
import FormError from "src/components/atoms/FormError";
import FormGroup from "src/components/molecules/FormGroup";
import Label from "src/components/atoms/Label";
import FormField from "src/components/molecules/FormField";
import { useEffect, useState } from "react";
import RegistriesSchema from "src/validations/registries.schema";
import Button from "src/components/atoms/Button";
import Modal from "src/components/molecules/Modal";
import useCategories from "src/hooks/useCategories";
import useCurrencies from "src/hooks/useCurrencies";
import useRegistries from "src/hooks/useRegistries";
import TableInstance from "src/components/molecules/Table";
import { saveRegistry } from "src/services/registriesServices";
import { useToasts } from "react-toast-notifications";

const TableRegistries = ({
  columnsDisplayed,
  setEnableNext,
  setEnableBack,
  registries,
  loadingRegistries,
}: any) => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (!registries) {
      return;
    }

    setEnableNext(registries.length > 10 ? true : false);
    setEnableBack(registries.length > 10 ? true : false);
    setTableData(() => {
      const registry = registries.map((registry: any) => {
        return {
          title: registry?.title,
          category: registry?.category?.category,
          description: registry?.description,
          currency: registry?.currency?.symbol,
          amount: registry?.amount,
          created_at: registry?.created_at,
        };
      });
      return registry;
    });
  }, [registries]);

  if (loadingRegistries || !tableData) {
    return <div>Loading...</div>;
  }

  return (
    <TableInstance
      tableData={tableData}
      columnsDisplayed={columnsDisplayed}
      columnsLabels={[
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Category",
          accessor: "category",
        },
        {
          Header: "Description",
          accessor: "description",
        },
        {
          Header: "Currency",
          accessor: "currency",
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "Datetime",
          accessor: "created_at",
        },
      ]}
    />
  );
};

const Registries: NextPage = () => {
  const { addToast } = useToasts();
  const [initialValues] = useState({
    title: "",
    category: "",
    currency: "",
    description: "",
    amount: "",
    registryType: "",
    created_at: "",
  });
  const [visible, setVisible] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {
    data: registries,
    isLoading: loadingRegistries,
    mutate: mutateRegistries,
  } = useRegistries({
    page: page,
  });
  const [registryTypes, _] = useState(["Income", "Expense"]);
  const { data: categories } = useCategories({ limit: 100 });
  const { data: currencies } = useCurrencies({ limit: 100 });
  const [enableBack, setEnableBack] = useState(false);
  const [enableNext, setEnableNext] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { data } = await saveRegistry({
        ...values,
        type: values.registryType,
      });
      addToast(`${values.registryType} saved succesfully.`, {
        appearance: "success",
      });
      await mutateRegistries((prevData: any) => {
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
                    {touched.title && errors.title && (
                      <FormError>{errors.title}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="registryType">
                      Type <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="registryType"
                      type="select"
                      errors={errors}
                      touched={touched}
                      options={registryTypes}
                    />
                    {touched["registryType"] && errors["registryType"] && (
                      <FormError>{errors["registryType"]}</FormError>
                    )}
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
                    {touched.amount && errors.amount && (
                      <FormError>{errors.amount}</FormError>
                    )}
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
                      optionLabel={"symbol"}
                      optionValue={"id"}
                    />
                    {touched.currency && errors.currency && (
                      <FormError>{errors.currency}</FormError>
                    )}
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
                    {touched.category && errors.category && (
                      <FormError>{errors.category}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="description">Description</Label>
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

          {/* <TableRegistries
            setEnableBack={setEnableBack}
            setEnableNext={setEnableNext}
            columnsDisplayed={[
              "title",
              "category",
              "currency",
              "description",
              "amount",
              "created_at",
            ]}
            limit={limit}
            offset={(page - 1) * limit}
            registries={registries}
            loadingRegistries={loadingRegistries}
          /> */}
        </div>
      </Layout>
    </>
  );
};

export default Registries;
