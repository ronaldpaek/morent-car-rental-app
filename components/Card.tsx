import { FC, ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    breakpoint?: 'sm' | 'md';
}

const Card: FC<CardProps> = ({ children, breakpoint = "md" }) => {
    return (
        <div
            className={`rounded-[10px] bg-white-0 p-4 shadow-md sm:p-6 ${
                breakpoint === 'md' ? 'w-full' : 'min-w-[240px] sm:min-w-[306px]'
            }`}
        >
            {children}
        </div>
    );
};

export default Card;