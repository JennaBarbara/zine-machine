

export default function NumberInput({ value, onChange, label, max }: { value: number , onChange: (value: number) => void, label?: string, min?: number, max?: number }) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue) && (newValue >= 0)) {
            onChange(newValue);
        } else if (e.target.value === "") {
            onChange(0);
        }
    };


    return (
        <div className="flex flex-col gap-1">
            {label && <span className="text-sm">{label}</span>}
            <input 
                type="number"
                value={value}
                onChange={handleChange}
                className="p-2 border-0 outline-2 outline-stone-500 rounded-md w-full"
                step="0.5"
                min="0"
                max={max}
            />
            {(max !== undefined && value > max)  && <span className="text-sm text-red-500">Value cannot exceed {max}mm.</span>}
        </div>
    );
}   

  