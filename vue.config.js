
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.externals = ['vue',
                                'django-airavata-api',
                                'django-airavata-workspace-plugin-api',
                                'bootstrap',
                                'bootstrap-vue']
        }
    }
}