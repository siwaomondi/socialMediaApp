const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required",
    },
    email: {
        type: String,
        trim: true,
        unique: "Email already exists",
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: "Email is required",
    },
    created: { type: Date, default: Date.now },
    updated: Date,
    hashed_password: {
        type: String,
        required: "Password is required",
    },
    salt: String,
});

UserSchema.virtual("password")
    .set((password) => {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(() => {
        return this._password;
    });

UserSchema.methods = {
    authenticate: (plainText) => {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: (password) => {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
    makeSalt: () => {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },
};

UserSchema.path("hashed_password").validate((v) => {
    if (this._password && this.password.length < 6) {
        this.invalidate("password", "Password must be at least 6 characters");
    }
    if (this.isNew && !this._password) {
        this.invalidate("password", "password is required");
    }
}, null);

export default mongoose.model("User", UserSchema);
