import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        url: { type: String, required: true }, // Scraping target URL
        interval: { type: Number, default: 15 }, // Interval in minutes
        lastRun: { type: Date, default: null }, // Last time the task ran
        notifiedJobUids: [String], // Array of job UUIDs already notified for this task
    },
    {
        timestamps: true,
    }
);

const UserSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        given_name: String,
        nickname: String,
        picture: String,
        locale: String,
        updated_at: Date,
        email: String,
        email_verified: Boolean,
        sub: String,
        sid: String,
        subscriptionType: {
            type: String,
            enum: ["free", "pro"],
            default: "free",
        },
        subscriptionLimits: {
            maxTasks: { type: Number, default: 1 }, // Default max tasks for free users
            minInterval: { type: Number, default: 30 }, // Default interval in minutes
        },
        tasks: {
            type: [TaskSchema], // Embedded array of tasks
            default: [], // Initialize as an empty array
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to set default subscription limits for new users
UserSchema.pre("save", function (next) {
    if (this.isNew && this.subscriptionType === "free") {
        this.subscriptionLimits = {
            maxTasks: 1,
            minInterval: 30,
        };
    } else if (this.isNew && this.subscriptionType === "pro") {
        this.subscriptionLimits = {
            maxTasks: 5,
            minInterval: 15,
        };
    }
    next();
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
