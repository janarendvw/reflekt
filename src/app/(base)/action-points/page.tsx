import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { columns } from './columns'
import { serverClient } from '@/app/_trpc/serverClient'


type Props = {}

async function page({}: Props) {

    const data = await serverClient.actionpoint.getAllActionPoints()

  return (
    <DataTable columns={columns} data={data} />
  )
}

export default page