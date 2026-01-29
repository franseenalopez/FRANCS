export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-full border border-transparent bg-[#2B2B2B] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition duration-300 ease-in-out hover:bg-[#3BE798] hover:text-[#2B2B2B] focus:bg-[#3BE798] focus:text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 shadow-lg ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
