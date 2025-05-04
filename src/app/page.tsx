import Main from './auth/Main'
import Navbar from './navbar'

export default function Home() {
  return (
    <>
      <div className={`h-fit w-full bg-transparent backdrop-blur-md`}>
        <Navbar />
      </div>
      <Main />
    </>
  )
}
