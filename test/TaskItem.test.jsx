import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from '../src/components/TaskItem'

describe('TaskItem', () => {
  const mockTask = {
    id: 1,
    title: 'Tarefa de teste',
    completed: false,
    createdAt: '2024-01-01T10:00:00.000Z'
  }

  const mockTaskCompleted = {
    id: 2,
    title: 'Tarefa concluída',
    completed: true,
    createdAt: '2024-01-01T10:00:00.000Z'
  }

  it('deve renderizar a tarefa corretamente', () => {
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    expect(screen.getByText('Tarefa de teste')).toBeInTheDocument()
    expect(screen.getByText(/Criada em:/)).toBeInTheDocument()
    expect(screen.getByTitle('Clique para marcar como concluída')).toBeInTheDocument()
  })

  it('deve chamar onToggle quando clicar no título da tarefa', async () => {
    const user = userEvent.setup()
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    const taskTitle = screen.getByText('Tarefa de teste')
    await user.click(taskTitle)
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it('deve mostrar a tarefa como concluída quando completed for true', () => {
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTaskCompleted}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    const taskItem = screen.getByText('Tarefa concluída').closest('.task-item')
    expect(taskItem).toHaveClass('completed')
  })

  it('deve entrar no modo de edição quando clicar no botão de editar', async () => {
    const user = userEvent.setup()
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    const editButton = screen.getByTitle('Editar')
    await user.click(editButton)
    
    expect(screen.getByDisplayValue('Tarefa de teste')).toBeInTheDocument()
    expect(screen.getByTitle('Salvar')).toBeInTheDocument()
  })

  it('deve salvar a edição quando pressionar Enter', async () => {
    const user = userEvent.setup()
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    // Entrar no modo de edição
    const editButton = screen.getByTitle('Editar')
    await user.click(editButton)
    
    // Editar o texto
    const editInput = screen.getByDisplayValue('Tarefa de teste')
    await user.clear(editInput)
    await user.type(editInput, 'Tarefa editada')
    await user.keyboard('{Enter}')
    
    expect(mockOnEdit).toHaveBeenCalledWith(1, 'Tarefa editada')
    // Verificar se saiu do modo de edição
    expect(screen.getByTitle('Editar')).toBeInTheDocument()
  })

  it('deve cancelar a edição quando pressionar Escape', async () => {
    const user = userEvent.setup()
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    // Entrar no modo de edição
    const editButton = screen.getByTitle('Editar')
    await user.click(editButton)
    
    // Editar o texto
    const editInput = screen.getByDisplayValue('Tarefa de teste')
    await user.clear(editInput)
    await user.type(editInput, 'Texto que será cancelado')
    await user.keyboard('{Escape}')
    
    expect(mockOnEdit).not.toHaveBeenCalled()
    expect(screen.getByText('Tarefa de teste')).toBeInTheDocument()
  })

  it('deve chamar onDelete quando clicar no botão de deletar', async () => {
    const user = userEvent.setup()
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    const deleteButton = screen.getByTitle('Deletar tarefa')
    await user.click(deleteButton)
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('deve formatar a data corretamente', () => {
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    // Verifica se a data está formatada no padrão brasileiro
    expect(screen.getByText(/Criada em: 01\/01\/2024/)).toBeInTheDocument()
  })

  it('deve salvar a edição quando clicar fora do input (onBlur)', async () => {
    const user = userEvent.setup()
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    // Entrar no modo de edição
    const editButton = screen.getByTitle('Editar')
    await user.click(editButton)
    
    // Editar o texto
    const editInput = screen.getByDisplayValue('Tarefa de teste')
    await user.clear(editInput)
    await user.type(editInput, 'Tarefa via blur')
    
    // Simular blur (clique fora)
    editInput.blur()
    
    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith(1, 'Tarefa via blur')
    })
  })

  it('não deve chamar onEdit se o texto não mudou', async () => {
    const user = userEvent.setup()
    const mockOnToggle = vi.fn()
    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()
    
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
    
    // Entrar no modo de edição
    const editButton = screen.getByTitle('Editar')
    await user.click(editButton)
    
    // Clicar em salvar sem alterar o texto
    const saveButton = screen.getByTitle('Salvar')
    await user.click(saveButton)
    
    expect(mockOnEdit).not.toHaveBeenCalled()
  })
})
