import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type ReactComponent = () => JSX.Element

const AuthenticatedPage = (Page: ReactComponent) => {
  function MyComponent() {
    const navigate = useNavigate()

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("token")

      if (!isAuthenticated) {
        // Redirect to the sign-in page
        navigate("/sign-in")
      }
    }, [])

    return <Page />
  }

  return MyComponent
}

export default AuthenticatedPage
