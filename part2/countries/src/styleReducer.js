import React, {useReducer} from "react";
import weatherStyles from './Weather.css'

const styleReducer = (state ={weatherStyles} , action) => {
    console.log('state', state)
switch (action.type) {
    case "STYLE_1": 
    return {

    }
    default: 
    return state
}
}

const AppStyles = () => {
    const [state, dispatch] = useReducer(authReducer, authState)

    const handleSubmit = e => {
        e.preventDefault()
        
    }
}