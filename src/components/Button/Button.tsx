// import React from 'react'

// type options={
//     activeBackgound: string
//     fontLOL: number
// }

// interface ButtonProps {
//     label: string,
//     onClick?: (text:string ) => void,
//     options?: options,
//     kebl?: number

// }

// const Button = (props: ButtonProps) => {
//     return (
//         <p style={{fontSize:props.options?.fontLOL,padding:props.kebl}} className='button' onClick={({target}: any)=>{
//             target.style.backgroundColor = props.options?.activeBackgound
//             if(props.onClick){
//                 props.onClick("Hello")

//             }
//         }}>{props.label}</p>
//     )
// }
// export default Button
// convert to class
 import React from 'react'
 type options={   
     activeBackgound: string,
        fontLOL: number
    }
    interface ButtonProps {
        label: string,
        onClick?: (text:string ) => void,
        options?: options,
        kebl?: number

    }
    export default class Button extends React.Component<ButtonProps>{
        render(){
            return (
                <p style={{fontSize:this.props.options?.fontLOL,padding:this.props.kebl}} className='button' onClick={({target}: any)=>{
                    target.style.backgroundColor = this.props.options?.activeBackgound
                    if(this.props.onClick){
                        this.props.onClick("Hello")
                    }
                }}>{this.props.label}</p>
            )
        }
    }
