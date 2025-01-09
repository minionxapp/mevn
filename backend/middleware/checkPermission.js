export const checkPermission = (requestUser,resourceUserId)=>{
    if(requestUser.role ==='admin'){
        return
    }

    if(requestUser.id === resourceUserId.toString()){
        return 
    }

    throw new Error("Anda tidak bisa melakukan update/delete yang bukan milik anda")
}