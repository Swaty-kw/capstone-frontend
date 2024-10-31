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

const addPet = async (petInfo) => {
    try {

        const formData = new FormData();
        for (key in petInfo){
            if (key !="image") formData.append(key, petInfo[key]);
        }
        formData.append("image", {
            name: "image.jpg",
            type: "image/jpeg",
            uri: petInfo.image
        });

        const {data} = await instance.post("petdetails", formData);
        return data
        
    } catch (error) {
        console.log(error)
    }
}

  

export {getUserPets, addPet}