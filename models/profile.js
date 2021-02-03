const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        username: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true,
        },
        dob: {
            type: Date,
            max: function () {
                return new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                ).toDateString();
            },
            required: true,
        },
        bio: {
            type: String,
            maxlength: 300,
        },
        status: {
            type: String,
            maxlength: 100,
        },
        avatar: {
            type: String,
            required: true,
            default: "ibump-default-profile-avatar.svg",
        },
        contacts: [
            // {
                {
                    type: Schema.Types.ObjectId,
                    ref: "Profile",
                },
                // isApproved: {
                //   type: Boolean,
                //   required: true,
                //   default: false
                // }
            // },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Profile", profileSchema);
