module.exports = {
    globDirectory: 'dist/',
    globPatterns: [
        '**/*.{js,png,xml,mp3,wav,html,css,json,wav,mp3}'
    ],
    swDest: 'sw.js',
    ignoreURLParametersMatching: [
        /^utm_/,
        /^fbclid$/
    ]
};