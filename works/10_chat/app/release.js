const packager = require('electron-packager');
const config = require('./package.json');

packager({
    dir: './',
    out: '../dist',
    name: config.name,
    platform: 'win32',
    arch: 'x64',
    version: '1.2.6', // Electronのバージョン
    icon: './icon.ico', // アイコン
    'app-version': config.version,
    'app-bundle-id': 'kmc.sample.com', // ドメイン
    'helper-bundle-id': 'kmc.sample.com', // ドメイン
    overwrite: true,
    asar: true,
    prune: true,
    ignore: "node_modules/(electron-packager|electron-prebuilt|\.bin)|release\.js",
    'version-string': {
        CompanyName: 'KMC',
        FileDescription: 'せつめい',
        OriginalFilename: config.name,
        FileVersion: config.version,
        ProductVersion: config.version,
        ProductName: config.name,
        InternalName: config.name
    }
},
(err, appPath) => {
    if (err) {
        throw new Error(err);
    }
    console.log('Done!!');
});
