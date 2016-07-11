module.exports = {
    js: {
        mainFiles: {
            'angular-i18n': ['angular-locale_nl-nl.js']
        },
        dest: {
            js: 'build/temp/bower_components.js'
        },
        dependencies: {
            'angular-sanitize': 'angular',
            'bbga_visualisatie_d3': 'd3'
        }
    },
    css: {
        dest: {
            css: 'build/temp/bower_components.css'
        }
    }
};