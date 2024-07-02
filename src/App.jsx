import Form from './Form';
import AuthProvider from './AuthProvider'

export default function App() {

  return (
    <>
      <AuthProvider>
        <Form />
      </AuthProvider>
    </>
  )
}