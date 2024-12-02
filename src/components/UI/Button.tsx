import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold hover:brightness-95',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
