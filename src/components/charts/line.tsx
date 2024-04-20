"use client"
import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { ActionPoint } from '@prisma/client'

type Props = {
    data: ActionPoint[]
}

function Line({data}: Props) {
    console.log(data)
    
  return (
    <ResponsiveLine data={data} />  )
}

export default Line