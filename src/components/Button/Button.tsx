import React from 'react'
interface ButtonProps {
    label: string
}
const Button = (props: ButtonProps) => {
    return (
        <button className='lol-col' onClick={({currentTarget})=>{
            console.log('Button clicked')
            currentTarget.style.backgroundColor = 'red'
        }}>{props.label}</button>
    )
}
export default Button

