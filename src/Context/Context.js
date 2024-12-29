import context from './useContext';
import { useHistory } from 'react-router-dom';
import { useState,useEffect } from 'react';
const Context = (props) => {
    const [login,setLogin]=useState(false);
    return (
        <context.Provider value={{login,setLogin}}>
                        {props.children}
        </context.Provider>
    )
}
export default Context;