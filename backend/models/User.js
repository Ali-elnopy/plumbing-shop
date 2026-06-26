const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'الاسم مطلوب'],
        trim:true,
    },
    username: {
        unique: true,
        lowercase: true,
    },
    role:{
        type: String,
        enum:['admin','cashier'],
        default:'cashier',
    },
    password:{
        type: String,
        requiered:[true,'كلمة السر مطلوبة'],
        minlength:6,
    },
    isActive:{
        type: Boolean,
        default:true,
    }
},
{ timestamps: true }
);

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('user',userSchema);