let storage  = {saveUser(user){
     localStorage.setItem('user_key',JSON.stringify(user))
    },
    getUser(){
     return   JSON.parse(localStorage.getItem('user_key') || '{}')
    },
    remove(){
        localStorage.removeItem('user_key')
    }}
    export default  storage