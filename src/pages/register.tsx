import Label from "src/components/atoms/Label";
import SubTitle from "src/components/atoms/Subtitle";
import Title from "src/components/atoms/Title";
import FormError from "src/components/atoms/FormError";
import FormGroup from "src/components/molecules/FormGroup";
import { signup } from "src/services/authenticationServices";
import RegisterSchema from "src/validations/register.schema";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Button from "src/components/atoms/Button";
import FormField from "src/components/molecules/FormField";
import { useToasts } from "react-toast-notifications";
import redirectTo from "src/utils/redirectTo";

const Register = () => {
  const { addToast } = useToasts();
  const handleSubmit = async (values: any, actions: any) => {
    try {
      await signup(values);
      addToast("User registered succesfully.", {
        appearance: "success",
      });
      redirectTo("/login");
    } catch (err: any) {
      if (err.response.data.errors.email) {
        actions.setFieldError("email", err.response.data.errors.email);
      }
      throw err;
    }
  };
  return (
    <>
      <Head>
        <title>Amalgama - Register</title>
      </Head>
      <main>
        <div className="flex h-full flex-row lg:h-screen lg:overflow-hidden">
          <div className="h-full w-full bg-white">
            <div className="mx-auto mt-4 flex w-full flex-col justify-center">
              <div className="text-center">
                <Title>Register</Title>
              </div>
              <SubTitle className="my-2 block text-center text-black lg:hidden">
                You already have an account?{" "}
                <Link href="/login" passHref>
                  <a className="text-accent cursor-pointer font-bold hover:underline">
                    Log In
                  </a>
                </Link>
              </SubTitle>
              <Formik
                initialValues={{
                  email: "",
                  name: "",
                  password: "",
                  password_confirmation: "",
                  profile_image: "",
                  date_of_birth: "",
                }}
                validationSchema={RegisterSchema}
                validateOnBlur={false}
                onSubmit={async (values, actions) => {
                  console.log(values);
                  await handleSubmit(values, actions);
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="mx-auto w-full max-w-xl rounded-lg bg-gray-100 px-6 pt-6 pb-4 shadow-md">
                    {/* Email form group */}
                    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
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
                        <Label htmlFor="name">Name</Label>
                        <FormField
                          name="name"
                          type="name"
                          errors={errors}
                          touched={touched}
                        />
                        {touched.name && errors.name && (
                          <FormError>{errors.name}</FormError>
                        )}
                      </FormGroup>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                      {/* Password form group */}
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
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
                        <Label htmlFor="password_confirmation">
                          Password confirmation
                        </Label>
                        <FormField
                          name="password_confirmation"
                          type="password"
                          errors={errors}
                          touched={touched}
                        />
                        {touched.password_confirmation &&
                          errors.password_confirmation && (
                            <FormError>
                              {errors.password_confirmation}
                            </FormError>
                          )}
                      </FormGroup>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                      {/* Password form group */}
                      <FormGroup>
                        <Label htmlFor="profile_image">Profile Image</Label>
                        <FormField
                          name="profile_image"
                          type="profile_image"
                          errors={errors}
                          touched={touched}
                        />
                        {touched.profile_image && errors.profile_image && (
                          <FormError>{errors.profile_image}</FormError>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="date_of_birth">Date of birth</Label>
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
                    </div>
                    {/* Submit button */}
                    <FormGroup lastSibling>
                      <div className="flex justify-center">
                        <Button type={!isSubmitting ? "submit" : "button"}>
                          Register
                        </Button>
                      </div>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
