

// Fetch For Data

const GetData = async () => {
    const promise = await fetch('../data/data.json');
    const data = await promise.json();
    const peopleData = data.People;

    // console.log(peopleData[1]);

    return peopleData;
}
GetData();




export { GetData }