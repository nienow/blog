"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = require("preact");
const App_1 = __importDefault(require("App"));
// render(<div>Blog</div>, document.body);
if (!window.customElements.get('my-blog')) {
    class ExternalApp extends HTMLElement {
        connectedCallback() {
            (0, preact_1.render)((0, preact_1.h)(App_1.default, null), this);
        }
    }
    window.customElements.define('my-blog', ExternalApp);
}
