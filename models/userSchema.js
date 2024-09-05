const mongoose = require('mongoose');
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema(
    {username: {type: String, required: true },
    password:{type:String, requried: true},
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }],
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todo'
    }]
}

)

//Hash password before saving

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

//Compare password for login
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User',userSchema)