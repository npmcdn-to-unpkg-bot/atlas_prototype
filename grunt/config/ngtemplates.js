// werkt nog niet, geen prio later naar kijken, taak faalt om onduidelijke reden
module.exports = {
    app: {
        cwd: '<%= app %>',
        src: '**/*.html',
        dest: 'build/templates.js',
        options: {
            module: 'atlas'
        }
    }
};