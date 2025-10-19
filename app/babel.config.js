const path = require('path');

function normalizePlugins(plugins, warned = new Set()) {
  const normalized = [];

  plugins.forEach((plugin) => {
    if (Array.isArray(plugin)) {
      const [identifier, options, ...rest] = plugin;
      let nestedPlugins = [];
      let sanitizedOptions = options;

      if (
        options &&
        typeof options === 'object' &&
        !Array.isArray(options) &&
        Object.prototype.hasOwnProperty.call(options, 'plugins')
      ) {
        const { plugins: innerPlugins, ...otherOptions } = options;
        sanitizedOptions = Object.keys(otherOptions).length > 0 ? otherOptions : undefined;
        if (Array.isArray(innerPlugins)) {
          nestedPlugins = normalizePlugins(innerPlugins, warned);
        }
        if (!warned.has(identifier)) {
          const pluginName = typeof identifier === 'string' ? identifier : path.basename(String(identifier));
          console.warn(
            `[babel.config.js] A chave \"plugins\" foi removida das opções do plugin \"${pluginName}\". ` +
              'Declare plugins adicionais no nível raiz para evitar este aviso.'
          );
          warned.add(identifier);
        }
      }

      if (rest.length > 0) {
        normalized.push([identifier, sanitizedOptions ?? {}, ...rest]);
      } else if (sanitizedOptions !== undefined) {
        normalized.push([identifier, sanitizedOptions]);
      } else {
        normalized.push(identifier);
      }

      normalized.push(...nestedPlugins);
    } else {
      normalized.push(plugin);
    }
  });

  return normalized;
}

module.exports = function (api) {
  api.cache(true);
  const plugins = normalizePlugins([
    'nativewind/babel',
    'react-native-reanimated/plugin',
  ]);

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
