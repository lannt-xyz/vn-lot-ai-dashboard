import React from 'react';

interface IconButtonProps {
    icon: string;
    title?: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, title = '', disabled = false, className, onClick }) => {
    const defaultClasses = 'font-light items-center justify-center';
    const combinedClasses = `${defaultClasses} ${className || ''}`;

    return (
        <button
            type="button"
            className={combinedClasses}
            disabled={disabled}
            onClick={onClick}
        >
            <img title={title} src={icon} alt="icon" />
        </button>
    );
};

export default IconButton;