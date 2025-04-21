import React from 'react';

interface IconButtonProps {
    icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
            <div className='flex items-center justify-center w-5 h-5'>
                {typeof icon === 'string' ? (
                    <img title={title} src={icon} alt="icon" className="w-5 h-5" />
                ) : (
                    React.createElement(icon, { className: 'w-5 h-5' }) // Render Heroicon or React component
                )}
            </div>
        </button>
    );
};

export default IconButton;