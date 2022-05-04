import Head from "next/head";
import Title from "src/components/atoms/Title";
import Layout from "src/components/templates/Layout";
import type { NextPage } from "next";
import useCategories from "src/hooks/useCategories";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { saveCategory } from "src/services/categoriesServices";
import Button from "src/components/atoms/Button";
import FormError from "src/components/atoms/FormError";
import Modal from "src/components/molecules/Modal";
import { Form, Formik } from "formik";
import CategorySchema from "src/validations/category.schema";
import FormGroup from "src/components/molecules/FormGroup";
import Label from "src/components/atoms/Label";
import FormField from "src/components/molecules/FormField";
import TableInstance from "src/components/molecules/Table";

const TableCategories = ({
  columnsDisplayed,
  setEnableNext,
  setEnableBack,
  categories,
  loadingCategories,
}: any) => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (!categories) {
      return;
    }
    setEnableNext(categories.length > 10 ? true : false);
    setEnableBack(categories.length > 10 ? true : false);
    setTableData(() => {
      if (!categories.length) {
        return [];
      }
      const category = categories.map((category: any) => {
        return {
          id: category?.title,
          category: category?.category?.category,
        };
      });
      return category;
    });
  }, [categories]);

  if (loadingCategories || !tableData) {
    return <div>Loading...</div>;
  }

  return (
    <TableInstance
      tableData={tableData}
      columnsDisplayed={columnsDisplayed}
      columnsLabels={[
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Category",
          accessor: "category",
        },
      ]}
    />
  );
};

const Categories: NextPage = () => {
  const { addToast } = useToasts();
  const [initialValues] = useState({
    category: "",
  });
  const [visible, setVisible] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {
    data: categories,
    isLoading: loadingCategories,
    mutate: mutateCategories,
  } = useCategories({
    page,
    limit,
    show_meta: true,
  });

  const [enableBack, setEnableBack] = useState(false);
  const [enableNext, setEnableNext] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { data } = await saveCategory(values);
      addToast(`${values.type} saved succesfully.`, {
        appearance: "success",
      });
      await mutateCategories((prevData: any) => {
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
        <title>Categories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex justify-between">
          <Title>Categories</Title>
          <Button onClick={() => setVisible((prev) => !prev)} type="button">
            Add category
          </Button>
        </div>
        <Modal
          showModal={visible}
          content={
            <Formik
              initialValues={{ ...initialValues }}
              validationSchema={CategorySchema}
              validateOnBlur={false}
              onSubmit={async (values, actions) =>
                handleSubmit(values, actions)
              }
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="mx-auto rounded-lg bg-white px-6 pt-8 pb-6 shadow-md">
                  <FormGroup>
                    <Label htmlFor="category">
                      Category <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="category"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    {touched.category && errors.category && (
                      <FormError>{errors.category}</FormError>
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

          <TableCategories
            setEnableBack={setEnableBack}
            setEnableNext={setEnableNext}
            columnsDisplayed={["id", "category"]}
            limit={limit}
            offset={(page - 1) * limit}
            categories={categories}
            loadingCategories={loadingCategories}
          />
        </div>
      </Layout>
    </>
  );
};

export default Categories;
