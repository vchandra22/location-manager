export default function Button(
  {
    type = "submit",
    label = "Simpan",
    onClick,
    disabled = false,
    className = "",
  }
) {
  return (
    <button
      type={type}
      className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}