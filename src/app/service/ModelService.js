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
}
