import FormSignIn from "components/common/form/FormSignIn"
import "styles/SignInUp.scss"
import Layout from "components/common/layouts/Layout"

const SignIn = () => {
  return (
    <>
      <Layout>
        <div className="container-page-signin">
          <FormSignIn />
        </div>
      </Layout>
    </>
  )
}

export default SignIn
