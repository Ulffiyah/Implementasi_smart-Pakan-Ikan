import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Welcome from './Welcome'

describe('Welcome', () => {
  it('semua tombol memanggil setCurrentScreen', () => {
    const setCurrentScreen = vi.fn()
    render(<Welcome setCurrentScreen={setCurrentScreen} />)
    const tombol = screen.getAllByRole('button')
    expect(tombol.length).toBeGreaterThan(0)
    tombol.forEach((t) => fireEvent.click(t))
    expect(setCurrentScreen).toHaveBeenCalled()
  })
})
