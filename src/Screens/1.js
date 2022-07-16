import React from 'react';

const Test = () => {


    const [data, setData] = useState({});
    const [counter, setCounter] = useState(0);

    // function getuserInfo() {

    //     let url = 'https://www.google.com/';

    //     fetch(url, {
    //         method: 'POST'
    //     })
    //         .then(data => data.json())
    //         .then(data => {
    //             setData(data);
    //         })

    // }

    function makeCounter() {
        setTimeout(() => {
            setCounter(counter + 1)
        }, 1000);
    }

    React.useEffect(() => {
        makeCounter();
    }, [])


    return (
        <div>
            {/* <div>Displaying data</div> */}
            <div>{counter}</div>
            
        </div>
    )
}

export default Test;