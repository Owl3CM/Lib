import React from 'react';
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
export default class Button extends React.Component<ButtonProps> {
    render(): JSX.Element;
}
export {};
