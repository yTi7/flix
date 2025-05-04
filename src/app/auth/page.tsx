import AuthTabs from '@/app/auth/AuthTabs'

const Auth = () => {
  const styles = {
    container: ``,
  }

  return (
    <>
      <main className={'flex h-screen w-screen items-center justify-center'}>
        <AuthTabs />
      </main>
    </>
  )
}

export default Auth
