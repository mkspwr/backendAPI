module.exports = mongoose => {
    const menuItem = mongoose.model(
        "menuItem",
        mongoose.Schema(
            {
                m_id: String,
                short_name: String,
                name: String,
                description: String,
                price_small: String,
                price_large: String,
                small_portion_name: String,
                large_portion_name: String
            },
            { timestamps: true }
        )
    );
    return menuItem;
};