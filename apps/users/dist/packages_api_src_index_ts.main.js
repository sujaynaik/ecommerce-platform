"use strict";
(self["webpackChunk_commerce_users"] = self["webpackChunk_commerce_users"] || []).push([["packages_api_src_index_ts"],{

/***/ "../../packages/api/src/auth/auth.api.ts"
/*!***********************************************!*\
  !*** ../../packages/api/src/auth/auth.api.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authApi: () => (/* binding */ authApi)
/* harmony export */ });
/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/api */ "../../packages/api/src/client/api.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../packages/api/src/auth/types.ts");


class AuthApi {
  async login(request) {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.post("/auth/login", request);
    return data;
  }
  async me() {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.get("/auth/me");
    return data;
  }
  async refresh(refreshToken) {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.post("/auth/refresh", {
      refreshToken
    });
    return data;
  }
}
const authApi = new AuthApi();

/***/ },

/***/ "../../packages/api/src/auth/index.ts"
/*!********************************************!*\
  !*** ../../packages/api/src/auth/index.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authApi: () => (/* reexport safe */ _auth_api__WEBPACK_IMPORTED_MODULE_0__.authApi),
/* harmony export */   tokenService: () => (/* reexport safe */ _token_service__WEBPACK_IMPORTED_MODULE_2__.tokenService)
/* harmony export */ });
/* harmony import */ var _auth_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.api */ "../../packages/api/src/auth/auth.api.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../packages/api/src/auth/types.ts");
/* harmony import */ var _token_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./token.service */ "../../packages/api/src/auth/token.service.ts");




/***/ },

/***/ "../../packages/api/src/auth/refresh.ts"
/*!**********************************************!*\
  !*** ../../packages/api/src/auth/refresh.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   refreshAccessToken: () => (/* binding */ refreshAccessToken)
/* harmony export */ });
/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/api */ "../../packages/api/src/client/api.ts");
/* harmony import */ var _token_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./token.service */ "../../packages/api/src/auth/token.service.ts");


async function refreshAccessToken() {
  const refreshToken = _token_service__WEBPACK_IMPORTED_MODULE_1__.tokenService.getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");
  const response = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.post("/auth/refresh", {
    refreshToken
  });
  const accessToken = response.data.accessToken;
  _token_service__WEBPACK_IMPORTED_MODULE_1__.tokenService.setAccessToken(accessToken);
  return accessToken;
}

/***/ },

/***/ "../../packages/api/src/auth/token.service.ts"
/*!****************************************************!*\
  !*** ../../packages/api/src/auth/token.service.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tokenService: () => (/* binding */ tokenService)
/* harmony export */ });
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
class TokenService {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  setRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
const tokenService = new TokenService();

/***/ },

/***/ "../../packages/api/src/auth/types.ts"
/*!********************************************!*\
  !*** ../../packages/api/src/auth/types.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ "../../packages/api/src/client/api.ts"
/*!********************************************!*\
  !*** ../../packages/api/src/client/api.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   api: () => (/* binding */ api),
/* harmony export */   configureApi: () => (/* binding */ configureApi)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../../node_modules/.pnpm/axios@1.18.1_debug@4.4.3_supports-color@8.1.1__supports-color@8.1.1/node_modules/axios/lib/axios.js");

let apiBaseUrl = "";
function configureApi(baseURL) {
  apiBaseUrl = baseURL;
  api.defaults.baseURL = baseURL;
}
const api = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create();

// export const apiClient = axios.create({
//   baseURL: API_CONFIG.BASE_URL,
//   timeout: API_CONFIG.TIMEOUT,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/***/ },

/***/ "../../packages/api/src/events/auth.events.ts"
/*!****************************************************!*\
  !*** ../../packages/api/src/events/auth.events.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   emit: () => (/* binding */ emit),
/* harmony export */   on: () => (/* binding */ on)
/* harmony export */ });
const listeners = new Map();
function on(event, listener) {
  if (!listeners.has(event)) {
    listeners.set(event, new Set());
  }
  listeners.get(event).add(listener);
  return () => {
    // Unsubscribe
    listeners.get(event)?.delete(listener);
  };
}
function emit(event) {
  listeners.get(event)?.forEach(listener => listener());
}

/***/ },

/***/ "../../packages/api/src/index.ts"
/*!***************************************!*\
  !*** ../../packages/api/src/index.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   api: () => (/* reexport safe */ _client_api__WEBPACK_IMPORTED_MODULE_0__.api),
/* harmony export */   authApi: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_4__.authApi),
/* harmony export */   configureApi: () => (/* reexport safe */ _client_api__WEBPACK_IMPORTED_MODULE_0__.configureApi),
/* harmony export */   emit: () => (/* reexport safe */ _events_auth_events__WEBPACK_IMPORTED_MODULE_3__.emit),
/* harmony export */   on: () => (/* reexport safe */ _events_auth_events__WEBPACK_IMPORTED_MODULE_3__.on),
/* harmony export */   ordersApi: () => (/* reexport safe */ _orders__WEBPACK_IMPORTED_MODULE_6__.ordersApi),
/* harmony export */   productsApi: () => (/* reexport safe */ _products__WEBPACK_IMPORTED_MODULE_5__.productsApi),
/* harmony export */   registerRequestInterceptor: () => (/* reexport safe */ _interceptors_request_interceptor__WEBPACK_IMPORTED_MODULE_1__.registerRequestInterceptor),
/* harmony export */   registerResponseInterceptor: () => (/* reexport safe */ _interceptors_response_interceptor__WEBPACK_IMPORTED_MODULE_2__.registerResponseInterceptor),
/* harmony export */   tokenService: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_4__.tokenService),
/* harmony export */   usersApi: () => (/* reexport safe */ _users__WEBPACK_IMPORTED_MODULE_7__.usersApi)
/* harmony export */ });
/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client/api */ "../../packages/api/src/client/api.ts");
/* harmony import */ var _interceptors_request_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interceptors/request.interceptor */ "../../packages/api/src/interceptors/request.interceptor.ts");
/* harmony import */ var _interceptors_response_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interceptors/response.interceptor */ "../../packages/api/src/interceptors/response.interceptor.ts");
/* harmony import */ var _events_auth_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events/auth.events */ "../../packages/api/src/events/auth.events.ts");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth */ "../../packages/api/src/auth/index.ts");
/* harmony import */ var _products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./products */ "../../packages/api/src/products/index.ts");
/* harmony import */ var _orders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./orders */ "../../packages/api/src/orders/index.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./users */ "../../packages/api/src/users/index.ts");









/***/ },

/***/ "../../packages/api/src/interceptors/request.interceptor.ts"
/*!******************************************************************!*\
  !*** ../../packages/api/src/interceptors/request.interceptor.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerRequestInterceptor: () => (/* binding */ registerRequestInterceptor)
/* harmony export */ });
/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/api */ "../../packages/api/src/client/api.ts");
/* harmony import */ var _auth_token_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/token.service */ "../../packages/api/src/auth/token.service.ts");


function registerRequestInterceptor() {
  _client_api__WEBPACK_IMPORTED_MODULE_0__.api.interceptors.request.use(config => {
    const token = _auth_token_service__WEBPACK_IMPORTED_MODULE_1__.tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

/***/ },

/***/ "../../packages/api/src/interceptors/response.interceptor.ts"
/*!*******************************************************************!*\
  !*** ../../packages/api/src/interceptors/response.interceptor.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerResponseInterceptor: () => (/* binding */ registerResponseInterceptor)
/* harmony export */ });
/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/api */ "../../packages/api/src/client/api.ts");
/* harmony import */ var _auth_refresh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/refresh */ "../../packages/api/src/auth/refresh.ts");
/* harmony import */ var _auth_token_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/token.service */ "../../packages/api/src/auth/token.service.ts");
/* harmony import */ var _events_auth_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events/auth.events */ "../../packages/api/src/events/auth.events.ts");





let isRefreshing = false;
let refreshPromise = null;
function registerResponseInterceptor() {
  _client_api__WEBPACK_IMPORTED_MODULE_0__.api.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    // Skip Refresh Endpoint
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // every request to be retried only once
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // refresh token logic to fetch access token using refresh token
    originalRequest._retry = true;
    // refresh queue
    let accessToken;
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = (0,_auth_refresh__WEBPACK_IMPORTED_MODULE_1__.refreshAccessToken)().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }
    try {
      accessToken = await refreshPromise;
    } catch (error) {
      _auth_token_service__WEBPACK_IMPORTED_MODULE_2__.tokenService.clear();
      (0,_events_auth_events__WEBPACK_IMPORTED_MODULE_3__.emit)("unauthorized");
      return Promise.reject(error);
    }

    // Before retrying, update the failed request
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

    //replay the original request that failed with 401
    return (0,_client_api__WEBPACK_IMPORTED_MODULE_0__.api)(originalRequest);
  });
}

/***/ },

/***/ "../../packages/api/src/orders/index.ts"
/*!**********************************************!*\
  !*** ../../packages/api/src/orders/index.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ordersApi: () => (/* reexport safe */ _orders_api__WEBPACK_IMPORTED_MODULE_1__.ordersApi)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../packages/api/src/orders/types.ts");
/* harmony import */ var _orders_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orders.api */ "../../packages/api/src/orders/orders.api.ts");



/***/ },

/***/ "../../packages/api/src/orders/orders.api.ts"
/*!***************************************************!*\
  !*** ../../packages/api/src/orders/orders.api.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ordersApi: () => (/* binding */ ordersApi)
/* harmony export */ });
/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/api */ "../../packages/api/src/client/api.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../packages/api/src/orders/types.ts");


const ordersApi = {
  async getAll() {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.get("/orders");
    return data;
  },
  async create(request) {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.post("/orders", request);
    return data;
  },
  async updateStatus(id, status) {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.patch(`/orders/${id}/status`, {
      status
    });
    return data;
  }
};

/***/ },

/***/ "../../packages/api/src/orders/types.ts"
/*!**********************************************!*\
  !*** ../../packages/api/src/orders/types.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ "../../packages/api/src/products/index.ts"
/*!************************************************!*\
  !*** ../../packages/api/src/products/index.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   productsApi: () => (/* reexport safe */ _products_api__WEBPACK_IMPORTED_MODULE_0__.productsApi)
/* harmony export */ });
/* harmony import */ var _products_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./products.api */ "../../packages/api/src/products/products.api.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../packages/api/src/products/types.ts");



/***/ },

/***/ "../../packages/api/src/products/products.api.ts"
/*!*******************************************************!*\
  !*** ../../packages/api/src/products/products.api.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   productsApi: () => (/* binding */ productsApi)
/* harmony export */ });
/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/api */ "../../packages/api/src/client/api.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../packages/api/src/products/types.ts");


class ProductsApi {
  async getAll() {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.get("/products");
    return data;
  }
  async getById(id) {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.get(`/products/${id}`);
    return data;
  }
  async create(request) {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.post("/products", request);
    return data;
  }
  async update(id, request) {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.put(`/products/${id}`, request);
    return data;
  }
  async delete(id) {
    await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.delete(`/products/${id}`);
  }
}
const productsApi = new ProductsApi();

/***/ },

/***/ "../../packages/api/src/products/types.ts"
/*!************************************************!*\
  !*** ../../packages/api/src/products/types.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ "../../packages/api/src/users/index.ts"
/*!*********************************************!*\
  !*** ../../packages/api/src/users/index.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usersApi: () => (/* reexport safe */ _users_api__WEBPACK_IMPORTED_MODULE_1__.usersApi)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../packages/api/src/users/types.ts");
/* harmony import */ var _users_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users.api */ "../../packages/api/src/users/users.api.ts");



/***/ },

/***/ "../../packages/api/src/users/types.ts"
/*!*********************************************!*\
  !*** ../../packages/api/src/users/types.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ "../../packages/api/src/users/users.api.ts"
/*!*************************************************!*\
  !*** ../../packages/api/src/users/users.api.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usersApi: () => (/* binding */ usersApi)
/* harmony export */ });
/* harmony import */ var _client_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/api */ "../../packages/api/src/client/api.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../packages/api/src/users/types.ts");


const usersApi = {
  async getAll() {
    const {
      data
    } = await _client_api__WEBPACK_IMPORTED_MODULE_0__.api.get("/users");
    return data;
  }
};

/***/ }

}]);
//# sourceMappingURL=packages_api_src_index_ts.main.js.map