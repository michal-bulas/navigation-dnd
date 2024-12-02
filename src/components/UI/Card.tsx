import { twMerge } from 'tailwind-merge';

interface CardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={twMerge(
        'box-border w-full overflow-hidden rounded-lg border border-border bg-card-bg p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
