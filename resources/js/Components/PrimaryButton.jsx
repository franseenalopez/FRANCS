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
                `inline-flex items-center rounded-full border border-transparent bg-gray-900 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:bg-black focus:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:bg-gray-900 ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
