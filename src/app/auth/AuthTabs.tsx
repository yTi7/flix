'use client'
import { EmailInput, PasswordInput } from '@/app/auth/FormInputs'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { signIn, signUp } from '@/lib/auth-client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { IoLogoGoogle } from 'react-icons/io'

const styles = {
  tabsTrigger: `cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all focus:outline-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none`,
  card: `w-[400px] rounded-md`,
}
export default function AuthTabs() {
  return (
    <div className={`flex flex-col space-y-2`}>
      <Tabs defaultValue="sign-in" className="w-[400px] items-center">
        <TabsList className="gap-1 bg-transparent">
          <TabsTrigger value="sign-in" className={styles.tabsTrigger}>
            SignIn
          </TabsTrigger>
          <TabsTrigger value="sign-up" className={styles.tabsTrigger}>
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInFormCard />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUpFormCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const GoogleSignInButton = () => (
  <Button
    className={`w-full`}
    variant="outline"
    onClick={async () => {
      const { data, error } = await signIn.social({
        provider: 'google',
      })
    }}
  >
    <IoLogoGoogle className="mr-2" />
    Sign in with Google
  </Button>
)

const handleSignIn = async (formData: FormData, router: AppRouterInstance) => {
  console.log(formData)
  const { data, error } = await signIn.email(
    {
      email: formData.get('signInEmail') as string,
      password: formData.get('signInPassword') as string,
    },
    {
      onError(context) {
        console.log('Error signing in:', context.error)
      },
      onSuccess(context) {
        router.push('/')
      },
    },
  )
}

const SignInFormCard = () => {
  const router = useRouter()
  return (
    <form action={async formData => await handleSignIn(formData, router)}>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className={`flex flex-col gap-2`}>
          <EmailInput name="signInEmail" />
          <PasswordInput name="signInPassword" />
          <Button className={`mt-2 w-full`} variant="default" type="submit">
            Sign In
          </Button>
        </CardContent>
        <CardFooter className={`flex flex-col gap-6`}>
          <div className="after:border-border relative w-full text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="text-muted-foreground bg-card relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <GoogleSignInButton />
        </CardFooter>
      </Card>
    </form>
  )
}

const handleSignUp = async (formData: FormData, router: AppRouterInstance) => {
  const { data, error } = await signUp.email(
    {
      email: formData.get('signUpEmail') as string,
      password: formData.get('signUpPassword') as string,
      name: formData.get('signUpName') as string,
      callbackURL: process.env.NEXT_PUBLIC_BASE_URL,
    },
    {
      onSuccess(context) {
        router.push('/')
      },
    },
  )
}

const SignUpFormCard = () => {
  const router = useRouter()
  return (
    <form action={async formData => await handleSignUp(formData, router)}>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className={`flex flex-col gap-2`}>
          <Input name="signUpName" placeholder="Name" />
          <EmailInput name="signUpEmail" />
          <PasswordInput name="signUpPassword" />
          <Button className={`mt-2 w-full`} variant="default" type="submit">
            Sign Up
          </Button>
        </CardContent>
        <CardFooter className={`flex flex-col gap-6`}>
          <div className="after:border-border relative w-full text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="text-muted-foreground bg-card relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <GoogleSignInButton />
        </CardFooter>
      </Card>
    </form>
  )
}
