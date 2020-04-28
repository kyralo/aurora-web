const { 
	override, 
	fixBabelImports, 
	disableEsLint,
	addWebpackAlias, 
	addDecoratorsLegacy
} = require('customize-cra');


/* 基本配置 */
const path = require('path')

/* antd */
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    disableEsLint(),

    addWebpackAlias({
	    "@": path.resolve(__dirname, 'src'),
	    "@views": path.resolve(__dirname, 'src/views'),
	    "@comp": path.resolve(__dirname, 'src/components'),
	    "@router": path.resolve(__dirname, 'src/router'),
	    "@utils": path.resolve(__dirname, 'src/utils'),
	    "@redux": path.resolve(__dirname, 'src/redux'),
	    "@store": path.resolve(__dirname, 'src/redux/modules')
	}),
);