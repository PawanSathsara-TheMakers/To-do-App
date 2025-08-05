import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  context: any // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  try {
    const body = await request.json()
    const { title, description, completed } = body

    const todo = await prisma.todo.update({
      where: { id: context.params.id },
      data: {
        title,
        description,
        completed
      }
    })

    return NextResponse.json(todo)
  } catch {
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: any // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  try {
    await prisma.todo.delete({
      where: { id: context.params.id }
    })

    return NextResponse.json({ message: 'Todo deleted successfully' })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
} 