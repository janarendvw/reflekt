"use client"
import React from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { trpc } from '@/app/_trpc/client'

type Props = {}



const LoginForm = (props: Props) => {
    const mutation = trpc.createUser.useMutation();

    const createUser = async () => {
        try {
          await mutation.mutateAsync({ email, password });
          // handle success, e.g. clear the form or show a success message
        } catch (error) {
          // handle error, e.g. show an error message
        }
      };

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submit')
        createUser()
    }
  return (
    <Card className='max-w-xs'>
    <form onSubmit={handleSubmit}>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to login, or click sign up to create a new account.</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
            <div>
                <Label htmlFor='login-email'>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} id='login-email' placeholder='Enter your email' />
            </div>
            <div>
                <Label htmlFor='login-password'>Password</Label>
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} id='login-password' placeholder='Enter your password' />
            </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
                <Button type='submit' variant={'secondary'}>Sign Up</Button>
                <Button type='submit'>Login</Button>
            </CardFooter>
    </form>
</Card>
  )
}

export default LoginForm