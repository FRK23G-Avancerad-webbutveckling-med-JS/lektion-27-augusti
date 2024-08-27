import CreateAccount from './components/createAccount'
import LoginForm from './components/LoginForm'
export default function App() {
  return (
    <main>
      <h1>Här är vår sida</h1>
      <h2>Skapa konto</h2>
      <CreateAccount />
      <h2>Logga in:</h2>
      <LoginForm />
    </main>
  )
}
