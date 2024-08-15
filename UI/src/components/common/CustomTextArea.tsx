import React, { forwardRef, TextareaHTMLAttributes } from 'react';

interface CustomTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id?: string;
    className?: string;
    rows?: number;
}

const CustomTextArea: React.ForwardRefRenderFunction<HTMLTextAreaElement, CustomTextAreaProps> = (
    { id = 'textArea', className = '', rows = 4, ...props },
    ref
) => {
    return (
        <textarea
            ref={ref}
            id={id}
            className={className}
            rows={rows}
            {...props}
        />
    );
};

export default forwardRef(CustomTextArea);

