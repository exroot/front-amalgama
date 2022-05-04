import Head from "next/head";
import Title from "src/components/atoms/Title";
import Layout from "src/components/templates/Layout";
import type { NextPage } from "next";
import { useToasts } from "react-toast-notifications";
import useUsers from "src/hooks/useUsers";
import { useState, useEffect } from "react";
import { saveUser } from "src/services/usersServices";
import Button from "src/components/atoms/Button";
import Modal from "src/components/molecules/Modal";
import { Form, Formik } from "formik";
import FormError from "src/components/atoms/FormError";
import UserSchema from "src/validations/user.schema";
import FormGroup from "src/components/molecules/FormGroup";
import Label from "src/components/atoms/Label";
import FormField from "src/components/molecules/FormField";
import TableInstance from "src/components/molecules/Table";

const TableUsers = ({
  columnsDisplayed,
  setEnableNext,
  setEnableBack,
  users,
  loadingUsers,
}: any) => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (!users) {
      return;
    }
    setEnableNext(users.length > 10 ? true : false);
    setEnableBack(users.length > 10 ? true : false);
    setTableData(() => {
      const user = users.map((user: any) => {
        return {
          email: user?.email,
          name: user?.name,
          is_active: user?.is_active ? "True" : "False",
          is_admin: user?.is_admin ? "True" : "False",
          date_of_birth: user?.date_of_birth,
        };
      });
      return user;
    });
  }, [users]);

  if (loadingUsers || !tableData) {
    return <div>Loading...</div>;
  }
  return (
    <TableInstance
      tableData={tableData}
      columnsDisplayed={columnsDisplayed}
      columnsLabels={[
        {
          Header: "email",
          accessor: "email",
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Status",
          accessor: "is_active",
        },
        {
          Header: "Admin",
          accessor: "is_admin",
        },
        {
          Header: "Date of birth",
          accessor: "date_of_birth",
        },
      ]}
    />
  );
};

const Clients: NextPage = () => {
  const { addToast } = useToasts();
  const [initialValues] = useState({
    email: "",
    password: "",
    date_of_birth: "",
    profile_image: "",
    name: "",
    is_admin: "",
    is_active: "",
  });
  const [visible, setVisible] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {
    data: users,
    isLoading: loadingUsers,
    mutate: mutateUsers,
  } = useUsers({
    page,
    limit,
    show_meta: true,
  });

  const [enableBack, setEnableBack] = useState(false);
  const [enableNext, setEnableNext] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { data } = await saveUser(values);
      addToast(`${values.type} saved succesfully.`, {
        appearance: "success",
      });
      await mutateUsers((prevData: any) => {
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
        <title>Clients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex justify-between">
          <Title>Clients</Title>
          <Button onClick={() => setVisible((prev) => !prev)} type="button">
            Add client
          </Button>
        </div>
        <Modal
          showModal={visible}
          content={
            <Formik
              initialValues={{ ...initialValues }}
              validationSchema={UserSchema}
              validateOnBlur={false}
              onSubmit={async (values, actions) =>
                handleSubmit(values, actions)
              }
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="mx-auto rounded-lg bg-white px-6 pt-8 pb-6 shadow-md">
                  <FormGroup>
                    <Label htmlFor="email">
                      Email <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="email"
                      type="email"
                      errors={errors}
                      touched={touched}
                    />
                    {touched.email && errors.email && (
                      <FormError>{errors.email}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="name">
                      Name <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="name"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    {touched.name && errors.name && (
                      <FormError>{errors.name}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">
                      Password <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="password"
                      type="password"
                      errors={errors}
                      touched={touched}
                    />
                    {touched.password && errors.password && (
                      <FormError>{errors.password}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="profile_image">
                      Profile image <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="profile_image"
                      type="text"
                      errors={errors}
                      touched={touched}
                    />
                    {touched.profile_image && errors.profile_image && (
                      <FormError>{errors.profile_image}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="date_of_birth">
                      Date of birth <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="date_of_birth"
                      type="date"
                      errors={errors}
                      touched={touched}
                    />
                    {touched.date_of_birth && errors.date_of_birth && (
                      <FormError>{errors.date_of_birth}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="is_admin">
                      Admin Role <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="is_admin"
                      type="select"
                      errors={errors}
                      touched={touched}
                      label={"Select admin status"}
                      options={["False", "True"]}
                    />

                    {touched.is_admin && errors.is_admin && (
                      <FormError>{errors.is_admin}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="is_active">
                      Active <span className="text-red-400">*</span>
                    </Label>
                    <FormField
                      name="is_active"
                      type="select"
                      errors={errors}
                      touched={touched}
                      label={"Select user status"}
                      options={["False", "True"]}
                    />
                    {touched.is_active && errors.is_active && (
                      <FormError>{errors.is_active}</FormError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <div className="block w-full items-center justify-between space-y-4 sm:flex sm:space-y-0">
                      <div className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        <span className="text-red-400">*</span> Fields are
                        mandatory
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

          <TableUsers
            setEnableBack={setEnableBack}
            setEnableNext={setEnableNext}
            columnsDisplayed={[
              "email",
              "name",
              "is_active",
              "is_admin",
              "date_of_birth",
            ]}
            limit={limit}
            offset={(page - 1) * limit}
            users={users}
            loadingUsers={loadingUsers}
          />
        </div>
      </Layout>
    </>
  );
};

export default Clients;
