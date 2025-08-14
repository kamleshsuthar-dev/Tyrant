"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedia = deleteMedia;
exports.deleteManyMedia = deleteManyMedia;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
function deleteMedia(publicId_1) {
    return __awaiter(this, arguments, void 0, function* (publicId, type = "image") {
        yield cloudinary_1.default.uploader.destroy(publicId, { resource_type: type });
    });
}
function deleteManyMedia(publicIds_1) {
    return __awaiter(this, arguments, void 0, function* (publicIds, type = "image") {
        yield cloudinary_1.default.api.delete_resources(publicIds, { resource_type: type });
    });
}
