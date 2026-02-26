

export default function NumberInput({ value, onChange, label, min, max }: { value: number, onChange: (value: number) => void, label?: string, min?: number, max?: number }) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue) && (min === undefined || newValue >= min) && (max === undefined || newValue <= max)) {
            onChange(newValue);
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
                min={min}
                max={max}
            />
        </div>
    );
}   