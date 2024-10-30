import instance from "."

const getUserPets = async () => {
    try {
        const {data} = await instance.get("owners/profile");
       // const {data} = await instance.get("petdetails/");
        console.log("apiFunctionData", data)
        return data; 
    } catch (error) {
        console.log(error)
    }
    
}

export {getUserPets}