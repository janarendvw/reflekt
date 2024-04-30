import SignUpForm from '@/components/signupform'
import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <div className='w-full h-full min-h-[80vh] flex items-center justify-center'><SignUpForm /></div>
  )
}

export default page