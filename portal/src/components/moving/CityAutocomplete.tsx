'use client'

import { useState, useRef, useEffect } from 'react'
import { CITY_COORDINATES } from '@/lib/moving/national-data'

// Build deduplicated display list: "City, ST"
const CITY_OPTIONS: string[] = (() => {
  const seen = new Set<string>()
  const results: string[] = []
  for (const [name, info] of Object.entries(CITY_COORDINATES)) {
    const display = `${name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}, ${info.state}`
    // Skip aliases (nyc, sf, la, etc.) — only keep entries with spaces or 4+ chars
    if (name.length <= 3 && !name.includes(' ')) continue
    // Skip duplicate coordinates (aliases like "new york city" vs "new york")
    const coordKey = `${info.lat},${info.lng}`
    if (seen.has(coordKey)) continue
    seen.add(coordKey)
    results.push(display)
  }
  return results.sort()
})()

interface Props {
  value: string
  onChange: (value: string) => void
  onSelect: (city: string) => void
  onBlur?: (value: string) => void
  placeholder: string
  className?: string
}

export default function CityAutocomplete({ value, onChange, onSelect, onBlur, placeholder, className }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (text: string) => {
    onChange(text)
    if (text.trim().length < 2) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }
    const lower = text.toLowerCase()
    const matches = CITY_OPTIONS.filter(c => c.toLowerCase().includes(lower)).slice(0, 8)
    setSuggestions(matches)
    setShowDropdown(matches.length > 0)
    setHighlightIndex(-1)
  }

  const handleSelect = (city: string) => {
    onChange(city)
    onSelect(city)
    setShowDropdown(false)
    setSuggestions([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault()
        inputRef.current?.blur()
        onSelect(value)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex(prev => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightIndex >= 0) {
        handleSelect(suggestions[highlightIndex])
      } else {
        inputRef.current?.blur()
        onSelect(value)
        setShowDropdown(false)
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-semibold text-blue-700">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => handleChange(e.target.value)}
        onBlur={() => {
          if (value.trim() && onBlur) {
            onBlur(value.trim())
          }
        }}
        onFocus={() => {
          if (value.trim().length >= 2) {
            const lower = value.toLowerCase()
            const matches = CITY_OPTIONS.filter(c => c.toLowerCase().includes(lower)).slice(0, 8)
            if (matches.length > 0) {
              setSuggestions(matches)
              setShowDropdown(true)
            }
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((city, i) => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              onMouseEnter={() => setHighlightIndex(i)}
              className={`px-3 py-2 text-sm cursor-pointer ${
                i === highlightIndex ? 'bg-blue-50 text-blue-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {highlightMatch(city, value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
