import React from 'react';

const HTMLDisplay: React.FC<HTMLDisplayProps> = ({ innerHtml, className }) => {
    return (
        <span
            className={className}
            dangerouslySetInnerHTML={innerHtml}
        />
    );
};

export default HTMLDisplay;

interface HTMLDisplayProps {
    innerHtml?: {
        __html: string;
    };
    className?: string;
}
