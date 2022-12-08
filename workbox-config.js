module.exports = {
    globDirectory: 'src/',
    globPatterns: [
        '**/*.{png,xml,ico,js,html,css,json}'
    ],
    swDest: 'src/sw.js',
    ignoreURLParametersMatching: [
        /^utm_/,
        /^fbclid$/
    ]
};