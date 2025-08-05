'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      if (!response.ok) throw new Error('Failed to fetch todos')
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError('Failed to load todos')
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      })

      if (!response.ok) throw new Error('Failed to add todo')
      
      const newTodo = await response.json()
      setTodos([newTodo, ...todos])
      setTitle('')
      setDescription('')
    } catch (err) {
      setError('Failed to add todo')
    }
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const todo = todos.find(t => t.id === id)
      if (!todo) return

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          completed: !completed,
        }),
      })

      if (!response.ok) throw new Error('Failed to update todo')
      
      setTodos(todos.map(t => 
        t.id === id ? { ...t, completed: !completed } : t
      ))
    } catch (err) {
      setError('Failed to update todo')
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete todo')
      
      setTodos(todos.filter(t => t.id !== id))
    } catch (err) {
      setError('Failed to delete todo')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Todo App
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter todo title..."
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter todo description..."
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Todo
          </button>
        </form>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No todos yet. Add one above!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  todo.completed ? 'border-green-500' : 'border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id, todo.completed)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <h3 className={`text-lg font-medium ${
                        todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`mt-1 text-sm ${
                          todo.completed ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {todo.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Created: {new Date(todo.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
