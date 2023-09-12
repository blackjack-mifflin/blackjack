import {useState} from "react"

const AddButton = ({ handleAddMoney }) => {
    const [selectAmt, setSelectAmt] = useState(null);

    const handleClick = () => {
        if (selectAmt !== null) {
            handleAddMoney(parseInt(selectAmt, 10));
            setSelectAmt(null)
        }
    };

    return (
        <section>
            <button onClick={() => handleAddMoney(10)}>Add $10</button>
            <button onClick={() => handleAddMoney(20)}>Add $20</button>
            <button onClick={() => handleAddMoney(50)}>Add $50</button>
            <button onClick={() => handleAddMoney(100)}>Add $100</button>
                <input 
                    type="number"
                    placeholder="Custom Amount"
                    value={selectAmt}
                    onChange={(e) => setSelectAmt(e.target.value)}
                />
            <button onClick={handleClick}>Add Custom</button>
        </section>
    )
}

export default AddButton