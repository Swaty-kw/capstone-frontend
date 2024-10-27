import instance from "."


const register = async () =>{
    try {
        const {data} = await instance.post("owners/signup")
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}

const login = async () => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export {register, login}