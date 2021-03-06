import {url} from "../helper";
import {ajax} from "jquery";

export class ModelService {


    getModelData(modelCode) {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("models/" + modelCode + ".json"),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

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
        const data = {
            code: modelCode,
            params: params,
        };
        return new Promise((resolve, reject) => {
            ajax({
                method: "POST",
                url: CONFIG["SERVER_URL_ROOT"] + "/generate-model",
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            })
                .done(resolve)
                .fail(reject);
        });
    }

    getModelList() {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("model_list.json"),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }
}
