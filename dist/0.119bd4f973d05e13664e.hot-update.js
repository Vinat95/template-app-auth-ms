"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 8:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const axios_1 = __webpack_require__(9);
const common_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(10);
const qs = __webpack_require__(11);
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getToken() {
        const url = 'https://dev-lwot5qle50opfs87.eu.auth0.com/oauth/token';
        const data = {
            grant_type: 'client_credentials',
            client_id: 'Q7643334vDbxyqXJH1QFsiYEqNOQpncK',
            client_secret: 't93MnEbbtVW4ZaS0FS8ERu6-sRSttQO8l8F0OaZCn622Xwvq50Q5HNO1BRDEr5pE',
            audience: 'https://dev-lwot5qle50opfs87.eu.auth0.com/api/v2/',
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, qs.stringify(data), { headers }));
        return response.data.access_token;
    }
    async getUserRole(id) {
        const token = await this.getToken();
        const url = `https://dev-lwot5qle50opfs87.eu.auth0.com/api/v2/users/${id}/roles`;
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { headers }));
        return response.data;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], AppService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8214ac5e72ec2011a3fb")
/******/ })();
/******/ 
/******/ }
;