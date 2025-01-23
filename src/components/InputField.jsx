export default function InputField(
  {
    id = "input-field",
    label = "Label",
    type = "text",
    placeholder = "",
    value = "",
    onChange,
    disabled = false,
  }
) {
  return (
    <div className="max-w-full mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-2 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}