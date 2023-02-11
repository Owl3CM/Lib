const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const dts = require("rollup-plugin-dts").default;
const babel = require("@rollup/plugin-babel").default;
const pkg = require("./package.json");

module.exports = [
    {
        input: "src/index.ts",
        output: [
            {
                file: pkg.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            babel({
                presets: ["@babel/preset-react"],
            }),
            resolve({
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            }),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss({ extract: true }),
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.css$/],
    },
];
