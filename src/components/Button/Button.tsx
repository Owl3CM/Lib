import React from 'react'
interface ButtonProps {
    label: string
}
const Button = (props: ButtonProps) => {
    return (
        <p className='button' onClick={({currentTarget})=>{
            console.log('Button clicked')
            currentTarget.style.backgroundColor = 'red'
        }}>{props.label}</p>
    )
}
export default Button

