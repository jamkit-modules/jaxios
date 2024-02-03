# jaxios
A simple HTTP client module for Jamkit, similar to axios

## Examples

### Simple Request

```js
const jaxios = require("jaxios");

jaxios.post("https://yourapi.com/api/v1/login", {
    "username": "your name",
    "password": "your password"
}, {
    "headers": {
        "Content-Type": "application/json"
    }
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject({ status: response.status });
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

### Request with a Jaxios instance

```js
const jaxios = require("jaxios").create({
    "baseURL": "https://yourapi.com/api/v1"
});

jaxios.post("/login", {
    "username": "your name",
    "password": "your password"
}, {
    "headers": {
        "Content-Type": "application/json"
    }
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject({ status: response.status });
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

## Prerequisite

- [querystring](https://github.com/jamkit-modules/querystring)


## API References

#### `get(url, params, config)`

GET 메소드로 요청한다.

- **Parameters**:
  - `url` (string) - 요청 URL
  - `params` (object) - 쿼리 스트링으로 전달될 파라미터
  - `config` (JaxiosConfig) - 요청에 사용될 추가 설정

- **Returns**: `Promise<FetchResponse>` - `FetchResonse`를 전달하는 `Promise`


#### `post(url, data, config)`

POST 메소드로 요청한다.

- **Parameters**:
  - `url` (string) - 요청 URL
  - `data` (object | string) - 요청 바디 데이터
  - `config` (JaxiosConfig) - 요청에 사용될 추가 설정

- **Returns**: `Promise<FetchResponse>` - `FetchResonse`를 전달하는 `Promise`


#### `put(url, data, config)`

PUT 메소드로 요청한다.

- **Parameters**:
  - `url` (string) - 요청 URL
  - `data` (object | string) - 요청 바디 데이터
  - `config` (JaxiosConfig) - 요청에 사용될 추가 설정

- **Returns**: `Promise<FetchResponse>` - `FetchResonse`를 전달하는 `Promise`


#### `delete(url, params, config)`

DELETE 메소드로 요청한다.

- **Parameters**:
  - `url` (string) - 요청 URL
  - `params` (object) - 쿼리 스트링으로 전달될 파라미터
  - `config` (JaxiosConfig) - 요청에 사용될 추가 설정

- **Returns**: `Promise<FetchResponse>` - `FetchResonse`를 전달하는 `Promise`


#### `create(config)`

Jaxios 인스턴스를 생성한다.

- **Parameters**:
  - `config` (JaxiosConfig) - 생성된 인스턴스를 통한 모든 요청에 추가되는 설정

- **Returns**: `Promise<Jaxio>` - `Jaxio` 인스턴스를 전달하는 `Promise`

## JaxiosConfig

#### Properties

  - `baseURL` (string) - 요청에 사용될 기본 URL
  - `headers` (object) - 요청에 사용될 추가 헤더

## FetchResponse

#### Properties

  - `ok` (boolean) - 응답 상태값이 2XX 인 경우 true
  - `status` (number) - 응답 상태값
  - `statusText` (string, optional) - 응답 상태 메시지
  - `url` (string) - 요청 URL
  - `headers` (object) - 응답 헤더

#### `json()`

응답 텍스트를 JSON 객체로 변환한다.

- **Returns**: `Promise<object>` - 변환된 JSON 객체를 전달하는 `Promise`

#### `text()`

응답 텍스트를 반환한다.

- **Returns**: `Promise<string>` - 텍스트를 전달하는 `Promise`

#### `xml()`

응답 텍스트를 XML 객체로 변환한다.

- **Returns**: `Promise<object>` - 변환된 XML 객체를 전달하는 `Promise`
