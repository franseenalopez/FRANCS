export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-bold text-[#1a1a1a] ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
