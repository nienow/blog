"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preact_1 = require("preact");
const styled_components_1 = __importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
  color: blue;
`;
const App = () => {
    return ((0, preact_1.h)(Container, null,
        (0, preact_1.h)("div", null, "Yo this is my blog"),
        (0, preact_1.h)("div", null, "Again")));
};
exports.default = App;
