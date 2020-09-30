import React, { useState } from 'react'
import './styles.css'

const useForm=()=>{
    const [items,setItems]=useState([]);
    
    const findIndex=(array,name)=>{
        let index = array.findIndex(v=> {
            return v.name===name;
          });
        return index;  
    }

    const addItem=(name,defaultValue)=>{
        const array = items.slice();
        const index =findIndex(array,name);
        if(index===-1){
            const item={
                name,
                value:defaultValue
            }
            array.push(item); 
            setItems(array);
            return item;    
        }
        return items[index];
    }


    const handleChange=(name,value)=>{
        const array = items.slice();
        array[findIndex(array,name)].value=value
        setItems(array);
    }

    return {
        init: (name,defaultValue="")=>{
            const item=addItem(name,defaultValue);
            return {
                ...item,
                onChange: e=>{
                    handleChange(name,e.target.value)
                },
            }
        },

        getValues:()=>{
            return items;
        }
    }
}

export default()=>{
    const form = useForm();

    const onSubmit=()=>{
        console.log(form.getValues())
    }

    return(<div>
        Form example
        <div>
            <div>
                name:<input {...form.init("name")}/>
            </div>
            <div>
                age　:<input {...form.init("age")}/>
            </div>
            <div>
                <button onClick={onSubmit}>
                    submit
                </button>
            </div>
        </div>
    </div>);
}