import Label from '@/components/atoms/Label'
import SubTitle from '@/components/atoms/Subtitle'
import Title from '@/components/atoms/Title'
import FormError from '@/components/atoms/ErrorMessage'
import FormGroup from '@/components/molecules/FormGroup'
import { login } from '@/services/authenticationServices'
import LoginSchema from '@/validations/login.schema'
import { ErrorMessage, Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import useSession from '@/hooks/useSession'
import redirectTo from '@/utils/redirectTo'

const Login = () => {
  const router = useRouter()
  const { addToast } = useToasts()
  const { user, mutateUser } = useSession({
    redirectTo: router?.query?.next || '/dashboard',
    redirectIfFound: true,
    oneCall: true,
  })
  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { data } = await login(values)
      addToast('Login successfuly', {
        appearance: 'success',
      })
      const { tokens, ...userData } = data
      localStorage.setItem('access', tokens?.access)
      await mutateUser({ ...userData }, { revalidate: false })
      await redirectTo('/dashboard')
    } catch (err: any) {
      if (err?.response?.data?.errors?.detail) {
        actions.setFieldError('email', err.response.data.errors.detail)
      } else {
        console.log(err)
      }
      throw err
    }
  }
  return (
    <>
      <Head>
        <title>Amalgama - Login</title>
      </Head>
      <main>
        <div className="flex h-full flex-row lg:h-screen lg:overflow-hidden">
          <div className="h-full w-full bg-white">
            <div className="mx-auto mt-4 flex w-full flex-col justify-center">
              <div className="text-center">
                <Title>Log In</Title>
              </div>
              <SubTitle className="my-2 block text-center text-black lg:hidden">
                You don't have an account yet?{' '}
                <Link href="/register" passHref>
                  <a className="text-accent cursor-pointer font-bold hover:underline">
                    Register
                  </a>
                </Link>
              </SubTitle>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                validateOnBlur={false}
                onSubmit={async (values, actions) =>
                  handleSubmit(values, actions)
                }
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="mx-auto w-full max-w-xl rounded-lg bg-gray-100 px-6 pt-6 pb-4 shadow-md">
                    {/* Email form group */}
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
                    {/* Submit button */}
                    <FormGroup lastSibling>
                      <div className="flex justify-center">
                        <Button type={!isSubmitting ? 'submit' : 'button'}>
                          Sign In
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

export default Login
