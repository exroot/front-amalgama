import Label from '@/components/atoms/Label'
import SubTitle from '@/components/atoms/Subtitle'
import Title from '@/components/atoms/Title'
import FormError from '@/components/atoms/ErrorMessage'
import FormGroup from '@/components/molecules/FormGroup'
import { signup } from '@/services/authenticationServices'
import RegisterSchema from '@/validations/register.schema'
import { ErrorMessage, Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'

const Register = () => {
  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { data } = await signup(values)
      return data
    } catch (err: any) {
      if (err.response.data.errors.email) {
        actions.setFieldError('email', err.response.data.errors.email)
      }
      throw err
    }
  }
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
                You already have an account?{' '}
                <Link href="/login" passHref>
                  <a className="text-accent cursor-pointer font-bold hover:underline">
                    Log In
                  </a>
                </Link>
              </SubTitle>
              <Formik
                initialValues={{
                  email: '',
                  name: '',
                  password: '',
                  password_confirmation: '',
                  profile_image: '',
                  date_of_birth: '',
                }}
                validationSchema={RegisterSchema}
                validateOnBlur={false}
                onSubmit={async (values, actions) => {
                  console.log(values)
                  await handleSubmit(values, actions)
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
                        <ErrorMessage
                          name="email"
                          render={(msg) => <FormError>{msg}</FormError>}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <FormField
                          name="name"
                          type="name"
                          errors={errors}
                          touched={touched}
                        />
                        <ErrorMessage
                          name="name"
                          render={(msg) => <FormError>{msg}</FormError>}
                        />
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
                        <ErrorMessage
                          name="password"
                          render={(msg) => <FormError>{msg}</FormError>}
                        />
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
                        <ErrorMessage
                          name="password_confirmation"
                          render={(msg) => <FormError>{msg}</FormError>}
                        />
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
                        <ErrorMessage
                          name="profile_image"
                          render={(msg) => <FormError>{msg}</FormError>}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="date_of_birth">Date of birth</Label>
                        <FormField
                          name="date_of_birth"
                          type="date"
                          errors={errors}
                          touched={touched}
                        />
                        <ErrorMessage
                          name="date_of_birth"
                          render={(msg) => <FormError>{msg}</FormError>}
                        />
                      </FormGroup>
                    </div>
                    {/* Submit button */}
                    <FormGroup lastSibling>
                      <div className="flex justify-center">
                        <Button type={!isSubmitting ? 'submit' : 'button'}>
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
  )
}

export default Register
