import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { serverClient } from '../_trpc/serverClient'

type Props = {}

export default async function page({}: Props) {
  const data = await serverClient.getReflection()
  return (
    <>
    <main className='w-full min-h-[calc(100vh-60px)] flex items-center justify-center'>
    <div className='max-w-screen-xl'>
      <DataTable columns={columns} data={data} />
    </div>
    </main>
    </>
  )
}

