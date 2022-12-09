module.exports = {
    globDirectory: './src',
    globPatterns: [
        '**/*.{png,xml,ico,js,html,css,json,wav,mp3}'
    ],
    swDest: './src/sw.js',
    ignoreURLParametersMatching: [
        /^utm_/,
        /^fbclid$/
    ]
};