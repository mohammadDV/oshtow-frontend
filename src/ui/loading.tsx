import { cn } from "@/lib/utils";
import { ComponentBase } from "@/types/component-base.type";
import { Size } from "@/types/size.type";
import { Variant } from "@/types/variant.type";

type LoadingProps = ComponentBase & {
    type: "spinner" | "ring";
};

const sizeClasses: Record<Size, string> = {
    sm: "w-4",
    default: "w-6",
    lg: "w-10",
};

const typeClasses: Record<LoadingProps['type'], string> = {
    spinner: 'loading-spinner',
    ring: 'loading-ring'
};

const variantClasses: Record<Variant, string> = {
    primary: "text-primary",
    neutral: "text-neutral-500",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
    info: "text-info",
}

export const Loading: React.FC<LoadingProps> = ({
    type = "spinner",
    variant,
    size = "default",
    className,
}) => {

    const classes = cn(
        "loading pointer-events-none w-6 aspect-square inline-block",
        className || '',
        variant ? variantClasses[variant] : '',
        sizeClasses[size],
        typeClasses[type]
    );
    return <span className={classes}></span>;
};