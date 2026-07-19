import React, { useEffect } from 'react'

function ThemeToggle() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  return null // No UI
}

export default ThemeToggle