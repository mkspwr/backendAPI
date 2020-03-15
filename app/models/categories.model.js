module.exports = mongoose => {
    const Category = mongoose.model(
        "categories",
        mongoose.Schema(
            {
                c_id: String,
                short_name: String,
                name: String,
                special_instruction: String,
                url: String
            },
            { timestamps: true }
        )
    );
    return Category;
};