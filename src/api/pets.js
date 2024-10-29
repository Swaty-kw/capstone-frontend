import instance from "."

const getUserPets = async () => {
    try {
        const {data} = await instance.get("owners/profile");
        console.log("data", data)
        return data; 
    } catch (error) {
        console.log(error)
    }
    
}

export {getUserPets}