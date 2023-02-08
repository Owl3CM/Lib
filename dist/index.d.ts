/// <reference types="react" />
type options = {
    activeBackgound: string;
    fontLOL: number;
};
interface ButtonProps {
    label: string;
    onClick?: (text: string) => void;
    options?: options;
    kebl?: number;
}
declare const Button: (props: ButtonProps) => JSX.Element;

export { Button };
