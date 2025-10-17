import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from '../src/components/TaskForm'

describe('TaskForm', () => {
  it('deve renderizar o formulário corretamente', () => {
    const mockOnAdd = vi.fn()
    render(<TaskForm onAdd={mockOnAdd} />)
    
    expect(screen.getByPlaceholderText('Digite uma nova tarefa...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument()
  })

  it('deve adicionar uma tarefa quando o formulário for submetido com texto válido', async () => {
    const user = userEvent.setup()
    const mockOnAdd = vi.fn()
    render(<TaskForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText('Digite uma nova tarefa...')
    const button = screen.getByRole('button', { name: 'Adicionar' })
    
    await user.type(input, 'Nova tarefa de teste')
    await user.click(button)
    
    expect(mockOnAdd).toHaveBeenCalledWith('Nova tarefa de teste')
    expect(input.value).toBe('')
  })

  it('deve mostrar erro quando a tarefa tiver menos de 3 caracteres', async () => {
    const user = userEvent.setup()
    const mockOnAdd = vi.fn()
    render(<TaskForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText('Digite uma nova tarefa...')
    const button = screen.getByRole('button', { name: 'Adicionar' })
    
    await user.type(input, 'ab')
    await user.click(button)
    
    expect(screen.getByText('A tarefa deve ter pelo menos 3 caracteres!')).toBeInTheDocument()
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('deve desabilitar o botão quando o input estiver vazio', () => {
    const mockOnAdd = vi.fn()
    render(<TaskForm onAdd={mockOnAdd} />)
    
    const button = screen.getByRole('button', { name: 'Adicionar' })
    expect(button).toBeDisabled()
  })

  it('deve habilitar o botão quando o input tiver conteúdo', async () => {
    const user = userEvent.setup()
    const mockOnAdd = vi.fn()
    render(<TaskForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText('Digite uma nova tarefa...')
    const button = screen.getByRole('button', { name: 'Adicionar' })
    
    await user.type(input, 'Tarefa válida')
    expect(button).not.toBeDisabled()
  })

  it('deve submeter o formulário quando pressionar Enter', async () => {
    const user = userEvent.setup()
    const mockOnAdd = vi.fn()
    render(<TaskForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText('Digite uma nova tarefa...')
    await user.type(input, 'Tarefa via Enter')
    await user.keyboard('{Enter}')
    
    expect(mockOnAdd).toHaveBeenCalledWith('Tarefa via Enter')
  })
})
