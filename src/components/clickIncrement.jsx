import React, {useState} from 'react';

function PlusButton({onClick, amount, operation}) {
    return (
        <button onClick={()=> onClick(amount,operation)}>+{amount}</button>
    );
}
const MinusButton = ({onClick,amount, operation}) =>{
    return (
        <button onClick={()=> onClick(amount, operation)}>-{amount}</button>
    );
};

const Result = ({count})=>{
    return <h4>{count}</h4>
};

const Main = () =>{
    const [count, setCount] = useState(0);
    const handleOperation = (amount,operation) => {
        if(operation === 'add'){
            setCount(count+amount)
        }else{
            setCount(count-amount > 0 ? count-amount : 0)
        }
    };
    return (
        <React.Fragment>
            <div>
                <PlusButton onClick={handleOperation} amount={1} operation="add"/>
                <PlusButton onClick={handleOperation} amount={5} operation="add"/>
                <PlusButton onClick={handleOperation} amount={10} operation="add"/>
                <PlusButton onClick={handleOperation} amount={100} operation="add"/>
            </div>
            <div>
                <MinusButton onClick={handleOperation} amount={1} operation="minus"/>
                <MinusButton onClick={handleOperation} amount={5} operation="minus"/>
                <MinusButton onClick={handleOperation} amount={10} operation="minus"/>
                <MinusButton onClick={handleOperation} amount={100} operation="minus"/>
            </div>
            <Result count={count} />
        </React.Fragment>
    )

};

export default Main;
