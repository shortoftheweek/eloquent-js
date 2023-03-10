"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Builder {
    constructor(activeRecord) {
        this.id = '';
        this.includes = [];
        this.queryParams = {};
        this.activeRecord = activeRecord;
    }
    getBaseUrl() {
        return this.activeRecord.baseUrl;
    }
    getEndpoint() {
        return this.activeRecord.isUsingModifiedEndpoint()
            ? this.activeRecord.getModifiedEndpoint()
            : this.activeRecord.endpoint;
    }
    getQueryParamsAsString() {
        let str = '';
        for (let key in this.queryParams) {
            let value = this.queryParams[key];
            if (value != null && value != '') {
                str +=
                    '&' +
                        encodeURIComponent(key) +
                        '=' +
                        encodeURIComponent(value);
            }
        }
        if (this.includes.length) {
            str += '&include=' + this.includes.join(',');
        }
        return str;
    }
    getUrl() {
        const baseUrl = this.getBaseUrl();
        const endpoint = this.getEndpoint();
        const queryParamStr = this.getQueryParamsAsString();
        const isModified = this.activeRecord.isUsingModifiedEndpoint();
        const modifiedBefore = isModified && this.activeRecord.modifiedEndpointPosition == 'before';
        const modifiedAfter = isModified && this.activeRecord.modifiedEndpointPosition == 'after';
        let urlBuilder = '';
        urlBuilder += baseUrl;
        urlBuilder += endpoint[0] === '/' ? endpoint : '/' + endpoint;
        if (isModified
            && modifiedAfter
            && this.activeRecord.getReferencedEndpoint().id != '') {
            urlBuilder += '/' + this.activeRecord.getReferencedEndpoint().id;
        }
        else if (this.id !== '') {
            urlBuilder += '/' + this.id;
        }
        else if (!modifiedAfter && this.activeRecord.id !== '') {
            urlBuilder += '/' + this.activeRecord.id;
        }
        urlBuilder += '?' + queryParamStr;
        urlBuilder = urlBuilder.replace(/([a-zA-Z0-9])\/\//g, '$1/');
        return urlBuilder;
    }
    identifier(id) {
        this.id = id.toString();
        return this;
    }
    include(value) {
        this.includes.push(value);
        return this;
    }
    queryParam(key, value) {
        this.queryParams[key] = value;
        return this;
    }
    qp(key, value) {
        return this.queryParam(key, value);
    }
}
exports.default = Builder;
//# sourceMappingURL=Builder.js.map