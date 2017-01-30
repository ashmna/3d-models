import {url} from "../helper";
import {ajax} from "jquery";

export class ModelService {

    getModel() {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("model.json"),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    generateModel(modelCode, params) {
        var data = {
            code: modelCode,
            params: params,
        };
        return new Promise((resolve, reject) => {
            ajax({
                method: "POST",
                url: "http://localhost:3003/generate-model",
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            })
                .done(resolve)
                .fail(reject);
        });
    }
}
