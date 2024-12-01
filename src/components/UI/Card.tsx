import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={twMerge(
        'border-border bg-card-bg box-border w-full rounded-lg border p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
