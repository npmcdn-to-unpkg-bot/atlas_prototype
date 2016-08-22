module.exports = {
    index: {
        src: ['index.html'],
        dest: 'build/index.html'
    },
    assets: {
        files: [
            {
                cwd: 'modules/shared/assets/',
                src: '**/*',
                dest: 'build/assets/',
                expand: true,
                flatten: false
            }
        ]
    },
    bbga_fonts: {
        files: [
            {
                cwd: 'bower_components/bbga_visualisatie_d3/',
                src: [
                    '**/*.eot',
                    '**/*.svg',
                    '**/*.ttf',
                    '**/*.woff',
                    '**/*.woff2'
                ],
                dest: 'build/',
                expand: true,
                flatten: true
            }
        ]
    },
    leaflet_measure_images: {
        files: [
            {
                cwd: 'bower_components/leaflet-measure/dist/',
                src: [
                    '**/*.png'
                ],
                dest: 'build/',
                expand: true,
                flatten: false
            }
        ]
    }
};