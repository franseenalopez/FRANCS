import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-xl border-gray-200 bg-gray-50 px-4 py-3 shadow-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all font-medium placeholder:text-gray-400 ' +
                className
            }
            ref={localRef}
        />
    );
});
