const module = (function() {
    function _request_get(url, params, options={}) {
        if (params) {
            url = url + "?" + _build_query(params)
        }

        return fetch(url, { 
            method: "GET"
        }, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({ "status": response.status });
                }
            });
    }

    function _request_post(url, params, options={}) {
        return fetch(url, { 
            method: "POST", 
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        }, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({ "status": response.status });
                }
            });
    }

    function _request_put(url, params, options={}) {
        return fetch(url, { 
            method: "PUT", 
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        }, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({ "status": response.status });
                }
            });
    }

    function _request_delete(url, params, options={}) {
        if (params) {
            url = url + "?" + _build_query(params)
        }

        return fetch(url, { 
            method: "DELETE"
        }, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({ "status": response.status });
                }
            });
    }

    function _build_query(params) {
        var query = "";

        for (const key in params) {
            query += (query.length > 0) ? "&" : "";
            query += key + "=" + encodeURIComponent(params[key]);
        }
    
        return query;
    }

    return {
        create: function(baseurl) {
            return {
                get: function(path, params, options) {
                    return _request_get(baseurl + path, params, options);
                },

                post: function(path, params, options) {
                    return _request_post(baseurl + path, params, options);
                },

                put: function(path, params, options) {
                    return _request_put(baseurl + path, params, options);
                },

                delete: function(path, params, options) {
                    return _request_delete(baseurl + path, params, options);
                }
            }
        },

        get: function(url, params, options) {
            return _request_get(url, params, options);
        },

        post: function(url, params, options) {
            return _request_post(url, params, options);
        },

        put: function(url, params, options) {
            return _request_put(url, params, options);
        },

        delete: function(url, params, options) {
            return _request_delete(url, params, options);
        }
    }
})();

__MODULE__ = module;
