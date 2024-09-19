const module = (function() {
    const qs = require("querystring");

    function _request(url, method, params, data, config) {
        return fetch(_build_url(url, params, config), Object.assign({ 
            method: method,
            headers: config.headers || {}
        }, [ "POST", "PUT" ].includes(method) ? {
            body: _build_body(data, config)
        } : {}), config.options || {})
            .then((response) => {
                if (response.ok) {
                    return _handle_response(response);
                } else {
                    const { error_handler } = config;

                    if (error_handler) {
                        return _handle_error(response)
                            .catch((error) => {
                                return error_handler(error, function() {
                                    return _request(url, method, params, data, config);
                                }); 
                            });
                    } else {
                        return _handle_error(response);
                    }
                }
            });
    }

    function _build_url(url, params, config) {
        const { base_url } = config;

        if (base_url) {
            url = base_url + url;
        }

        if (params) {
            url = url + "?" + qs.stringify(params);
        }

        return url;
    }

    function _build_body(data, config) {
        const { headers } = config;

        if (headers["Content-Type"] === "application/json") {
            return data ? JSON.stringify(data) : "";
        }

        if (headers["Content-Type"] === "application/x-www-form-urlencodede") {
            return data ? qs.stringify(data) : "";
        }

        return data || "";
    }

    function _handle_response(response) {
        return Promise.resolve()
            .then(() => {
                return response.json()
                    .catch(() => {
                        return response.text();
                    });
            });
    }

    function _handle_error(response) {
        return Promise.resolve()
            .then(() => {
                return response.json()
                    .catch(() => {
                        return Promise.reject({ "status": response.status });
                    });
            })
            .then((data) => {
                return Promise.reject({ "status": response.status, "error": data });
            });
    }

    return {
        create: function(config) {
            const _config = Object.assign({}, config || {});

            function _build_config(config) {
                return Object.assign({}, _config, config || {});
            }

            return {
                get: function(url, params, config) {
                    return _request(url, "GET", params, null, _build_config(config));
                },

                post: function(url, data, config) {
                    return _request(url, "POST", null, data, _build_config(config));
                },

                put: function(url, data, config) {
                    return _request(url, "PUT", null, data, _build_config(config));
                },

                delete: function(url, params, config) {
                    return _request(url, "DELETE", params, null, _build_config(config));
                }
            }
        },

        get: function(url, params, config) {
            return this.create(config).get(url, params);
        },

        post: function(url, data, config) {
            return this.create(config).post(url, data);
        },

        put: function(url, data, config) {
            return this.create(config).put(url, data);
        },

        delete: function(url, params, config) {
            return this.create(config).delete(url, params);
        }
    }
})();

__MODULE__ = module;
