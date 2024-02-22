import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { prisma } from '../client'

type Props = {}

async function fetchReflections() {
  const response = prisma.reflection.findMany({
    skip: 0,
    take: 10,
  })
  return response
}

export default async function page({}: Props) {
  const data = await fetchReflections()
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

