import Button from "./Button.jsx";

export default function Modal(
  {
    title="Edit Data Location",
    isOpen,
    onClose,
    onConfirm,
    children,
    className,
  }
) {
  return (
    isOpen && (
      <div onClick={onClose} className={`bg-black/50 w-full h-screen fixed top-0 left-0 z-[80] flex justify-center items-center`}>
        <div onClick={(e) => e.stopPropagation()} className={`${className} bg-white rounded-lg border border-neutral-400 p-8`}>
          <div className="flex items-center justify-between">
            <p className="text-xl lg:text-4xl font-semibold text-neutral-900 text-start mb-6">{title}</p>
            <button className="w-8 h-8 bg-red-500 text-white rounded-lg mb-6" onClick={onClose}>x</button>
          </div>
          <div className="flex items-center justify-between">
            {children}
          </div>
          <Button onClick={onConfirm}>Simpan</Button>
        </div>
      </div>
    )
  )
}