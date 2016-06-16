var modules = [
        {
            name: 'atlas',
            slug: 'atlas'
        },
        {
            name: 'atlasDetail',
            slug: 'detail'
        },
        {
            name: 'atlasHeader',
            slug: 'header'
        },
        {
            name: 'atlasLayerSelection',
            slug: 'layer-selection'
        },
        {
            name: 'dpMap',
            slug: 'map'
        },
        {
            name: 'atlasPage',
            slug: 'page'
        },
        {
            name: 'atlasSearchResults',
            slug: 'search-results'
        },
        {
            name: 'dpShared',
            slug: 'shared'
        },
        {
            name: 'dpStraatbeeld',
            slug: 'straatbeeld'
        }
    ],
    ngTemplatesConfig = {
        options: {
            cwd: '<%= app %>/..',
            htmlmin: {collapseWhitespace: true, collapseBooleanAttributes: true}
        }
    };

modules.forEach(function (module) {
    ngTemplatesConfig[module.name] = {
        src: 'modules/' + module.slug + '/**/*.html',
        dest: module.slug + '-templates.js'
    };
});

module.exports = ngTemplatesConfig;