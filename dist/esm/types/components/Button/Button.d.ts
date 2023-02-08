/// <reference types="react" />
type options = {
    backgroundColor: string;
    fontLOL: number;
};
interface ButtonProps {
    label: string;
    onClick?: (text: string) => void;
    options?: options;
}
declare const Button: (props: ButtonProps) => JSX.Element;
export default Button;
