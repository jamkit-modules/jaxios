const module = (function() {
    function _request(url, method, data, config) {
        return fetch(_build_url(url, config), Object.assign({ 
            method: method,
            headers: config.headers || {}
        }, [ "POST", "PUT" ].includes(method) ? {
            body: _build_body(data, config)
        } : {}), config.options || {})
            .then((response) => {
                if (response.ok) {
                    return _handle_response(response);
                } else {
                    return _handle_error(response);
                }
            });
    }

    function _build_url(url, config) {
        const { baseURL } = config;

        if (baseURL) {
            return baseURL + url;
        }

        return url;
    }

    function _build_body(data, config) {
        const { headers } = config;

        if (data) {
            return JSON.stringify(data); // FIXME
        }

        return "";
    }

    function _handle_response(response) {
        return Promise.resolve()
            .then(() => {
                return response.json() // FIXME
                    .catch(() => {
                        return response.text();
                    });
            });
    }

    function _handle_error(response) {
        return Promise.resolve()
            .then(() => {
                return response.json() // FIXME
                    .catch(() => {
                        return Promise.reject({ "status": response.status });
                    });
            })
            .then((data) => {
                console.log(data)
                return Promise.reject({ "status": response.status, "error": data }); // FIXME
            });
    }

    return {
        create: function(config) {
            const _config = Object.assign({}, config || {});

            function _build_config(config) {
                return Object.assign({}, _config, config || {});
            }

            return {
                get: function(url, config) {
                    return _request(url, "GET", null, _build_config(config));
                },

                post: function(url, data, config) {
                    return _request(url, "POST", data, _build_config(config));
                },

                put: function(url, data, config) {
                    return _request(url, "PUT", data, _build_config(config));
                },

                delete: function(url, config) {
                    return _request(url, "DELETE", null, _build_config(config));
                }
            }
        },

        get: function(url, config) {
            return this.create(config).get(url);
        },

        post: function(url, data, config) {
            return this.create(config).post(url, data);
        },

        put: function(url, data, config) {
            return this.create(config).put(url, data);
        },

        delete: function(url, config) {
            return this.create(config).delete(url);
        }
    }
})();

__MODULE__ = module;
