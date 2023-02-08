import React from 'react'

type options={
    activeBackgound: string
    fontLOL: number
}

interface ButtonProps {
    label: string,
    onClick?: (text:string ) => void,
    options?: options,
    kebl?: number

}


const Button = (props: ButtonProps) => {
    return (
        <p style={{fontSize:props.options?.fontLOL,padding:props.kebl}} className='button' onClick={({target}: any)=>{
            target.style.backgroundColor = props.options?.activeBackgound
            if(props.onClick){
                props.onClick("Hello")

            }
        }}>{props.label}</p>
    )
}
export default Button

