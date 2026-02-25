interface ToggleButtonGroupProps {
  options: { label: string, value: string }[],
  value: string, 
  onChange: (value: string) => void
}

export default function ToggleButtonGroup({ options, value, onChange }: ToggleButtonGroupProps) {

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button 
          key={option.value} 
          className={`cursor-pointer z-50 outline-2 outline-stone-500 rounded-md bg-stone-100 hover:bg-stone-200 disabled:opacity-50 p-2 ${value === option.value ? 'bg-stone-300' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}