'use client'

import { useRouter } from 'next/navigation'

export default function Page() {

  function makeAccount(){
    router.push('/homepage')
  }

  const router = useRouter()

  return (
    <div>
      <h1>Welcome to the signup page.</h1>
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
          <input type="submit" value="Login" onClick={makeAccount}/>
        </div>
      </form>
    </div>
  );
}
