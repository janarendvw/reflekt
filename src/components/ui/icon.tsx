import React from 'react'

type Props = {
    name: string
}

function Icon({name, ...inherited}: Props) {
  return (
    <i {...inherited} className='material-symbols-rounded'>{name}</i>
  )
}

export default Icon