import mongoose,{Schema} from "mongoose";
const DevTabelSchema = new mongoose.Schema({
    name:{
        type :String,
        required :[true,"Name connot be empty"],
        unique:[false]
    },
    desc:{
        type :String,
        required :[true,"Desc cannot be empty"],
        unique:[false]
    },
    priv:{
        type :String,
        required :[true,"Desc cannot be empty"],
        enum:["Public","Private"],
        unique:[false]
    },
    userId :{
        type :Schema.Types.ObjectId,
        ref :'User',
        required : [true,"UserId harus diisi"]
    },
    owner:{
        type :String,
        // required :[false,"Nama tabel tidak boleh kosong"],
        unique:[false]
    }    
},
{
    timestamps :true
})

const DevTabel = mongoose.model("dev_tabel",DevTabelSchema)

export default DevTabel