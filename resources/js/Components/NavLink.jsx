import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={cn(
                "",
                active
                    ? "underline underline-offset-4 font-medium"
                    : "underline-offset-0 font-normal",
                className,
            )}
        >
            {children}
        </Link>
    );
}
