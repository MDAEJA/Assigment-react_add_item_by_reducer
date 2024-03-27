import React, { useReducer, useState } from 'react'
import "../component/productListStyle.css"
import { type } from '@testing-library/user-event/dist/type'

function DisplayProduct() {

    const[total,setTotal] = useState(0);

   const productList = {
   item_list :  [{id: 1, name: "Product-1", price:100,quantity:0},
    {id: 2, name: "Product-2", price:100,quantity:0},
    {id: 3, name: "Product-3", price:100,quantity:0},]
   
   }
   

const reduce = (state,action)=>{
    switch(action.type){
        case "ADD_ITEM" :
            console.log(action.payload);
            return {
                // Use map to update the completed status of the todo with the given id
                item_list: state.item_list.map((todo) => {
                    if(todo.id === action.payload){
                        let totalchange = todo.price;
                        setTotal(total + totalchange)
                      return{...todo,quantity:todo.quantity+1}
                    }
                    else{
                        return todo;
                    }
                }
               
                //   todo.id === action.payload ? { ...todo, quantity : todo.quantity + 1 } : todo
                ),

              };  
          
        // return  

        case 'REMOVE_ITEM' :
            return {
                item_list:state.item_list.map((item)=>{
                    if(item.id === action.payload){
                        let totalchange = item.price;
                        setTotal(total - totalchange)
                        if(total < 0) alert ("please first add item")
                        return {
                            ...item , quantity : item.quantity - 1
                        }
                    }
                    else{
                        return item
                    }
                })
            }
        
    
    default :

    return state;
    }
}

const[state,dispatch] = useReducer(reduce,productList);
   const Increment = (product_id)=>{
    //   dispatch({type:"ADD_ITEM", payload : product_id})
    console.log(product_id)
    dispatch({ type : "ADD_ITEM", payload : product_id});
   }

   const Decrement = (prodid)=>{
    dispatch({type : 'REMOVE_ITEM',payload : prodid})
   }
  return (
    <>
    <div className='main-div'>

        <div className='product-div'> 
            <h1 style={{color:'black',fontStyle:'italic',textDecoration:'underline',textAlign:"center"}}>PRODUCTS</h1>

            {
                state.item_list.map((item,index)=>{
                    return  <div className='product-add' key={item.id}>
                    <div><span>{item.name}</span></div>
                    <div><h4>{item.price}</h4></div>
                    <div style={{display:'flex',gap:'10px',margin:'0 5px',border:'2px solid white',borderRadius:"10px",alignItems:"center",padding:"2px 3px",justifyContent:'center'}}>
                        <span onClick={()=>{Decrement(item.id)}} style={{fontSize:'20px'}}>-</span>
                        <span >{item.quantity}</span>
                        <span onClick={()=>{Increment(item.id)}} style={{fontSize:'20px'}}>+</span>
                    </div>
                    </div>
                })
            }

           


        </div>

        <div className='cart-div'>
            <h1 style={{color:'black',fontStyle:'italic',textDecoration:'underline',textAlign:"center"}}>CART</h1>

            {
                state.item_list.map((item,index)=>{
                    if(item.quantity > 0){
                        return <div className='cart-add'> 
                            <div><span>{item.name}</span></div>
                            <div><h4>{item.quantity}</h4></div>
                            <div><h5>x</h5></div>
                            <div><h4>{item.price}</h4></div>
                        </div>
                    } 

                   
                   
                   
                })
            }

            <div className='total-div'>
                 <div><h3>Total</h3></div>
                 <div><h3>{total}</h3></div>
            </div>



        </div>

    </div>
    </>
  )
}

export default DisplayProduct
