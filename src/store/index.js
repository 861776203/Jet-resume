const store = []

const require_module = require.context('./modules', false, /.js$/)
require_module.keys().forEach(file_name => {
    store.push({name: require_module(file_name).default.name, module: require_module(file_name).default})
})

export default store