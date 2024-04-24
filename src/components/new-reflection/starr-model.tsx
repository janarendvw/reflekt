"use client"
import React from 'react'
import { Textarea } from '../ui/textarea'

type Props = {
    content: string[],
    setContent: (content: string[]) => void
}

function StarrModel({content, setContent}: Props) {
    const tempContent = content

    const handleContentChange = (index: number, value: string) => {
        tempContent[index] = value
        setContent(tempContent)
    }

    
  return (
    <>
    <Textarea value={content[0]} onChange={(e) => handleContentChange(0, e.target.value)} className="h-40" placeholder="Situation" />
    <Textarea value={content[1]} onChange={(e) => handleContentChange(1, e.target.value)} className="h-40" placeholder="Task" />
    <Textarea value={content[2]} onChange={(e) => handleContentChange(2, e.target.value)} className="h-40" placeholder="Action" />
    <Textarea value={content[3]} onChange={(e) => handleContentChange(3, e.target.value)} className="h-40" placeholder="Result" />
    <Textarea value={content[4]} onChange={(e) => handleContentChange(4, e.target.value)} className="h-40" placeholder="Reflection" />
    </>
  )
}

export default StarrModel