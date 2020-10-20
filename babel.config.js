module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                },
                useBuiltIns: "usage",
                corejs: 3
            }
        ]
    ],
    plugins: ["@babel/plugin-proposal-class-properties"]
};
