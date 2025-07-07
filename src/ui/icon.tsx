import { cn } from "@/lib/utils";

export type IconProps = {
    icon: string;
    sizeClass?: string;
    className?: string;
    onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
    icon,
    sizeClass = "size-6",
    className,
    onClick
}) => {
    return (
        <i className={cn("block", icon, sizeClass, className)} onClick={onClick}></i>
    );
};