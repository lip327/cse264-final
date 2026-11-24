'use client'

import { useRouter } from 'next/navigation'

export default function Page() {

  function signup(){
    router.push('/signup')
  }

  function loginAccount(){
    router.push('/homepage')
  }


  const router = useRouter()

  return (
    <div>
      <h1>Welcome to the login page.</h1>
      <button onClick={signup}>If you have no account, click here to go to the sign up page.</button>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <input type="submit" value="Login" onClick={loginAccount}/>
        </div>
      </form>
    </div>
  );
}
