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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudConfigs = void 0;
var cloud_init_1 = require("./cloud-init");
var CloudConfigs = (function () {
    function CloudConfigs(cloudConfig) {
        this.cloudConfig = cloudConfig;
    }
    CloudConfigs.from = function (cloudConfig) {
        return new CloudConfigs(cloudConfig !== null && cloudConfig !== void 0 ? cloudConfig : {});
    };
    CloudConfigs.prototype.addAptAliyunMirrors = function () {
        var apt = this.cloudConfig.apt;
        if (!apt) {
            apt = {};
            this.cloudConfig.apt = apt;
        }
        var primary = apt.primary;
        if (!primary) {
            primary = [];
            apt.primary = primary;
        }
        primary.push({
            uri: "https://mirrors.aliyun.com/ubuntu/",
            arches: ["default"],
        });
        var security = apt.security;
        if (!security) {
            security = [];
            apt.security = security;
        }
        security.push({
            uri: "https://mirrors.aliyun.com/ubuntu/",
            arches: ["default"],
        });
        return this;
    };
    CloudConfigs.prototype.aptInstallDocker = function (config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apt, _b, _c, writeFiles, packages;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!config.dockerAptMirrors) return [3, 2];
                        apt = this.cloudConfig.apt;
                        if (!apt) {
                            apt = {};
                            this.cloudConfig.apt = apt;
                        }
                        if (!apt.sources) {
                            apt.sources = {};
                        }
                        _b = apt.sources;
                        _c = "docker-aliyun";
                        _d = {
                            source: "deb [signed-by=$KEY_FILE] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $RELEASE stable"
                        };
                        return [4, ((_a = config.fetchGpg) === null || _a === void 0 ? void 0 : _a.call(config, 'https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg'))];
                    case 1:
                        _b[_c] = (_d.key = _e.sent(),
                            _d);
                        _e.label = 2;
                    case 2:
                        if (config.dockerRegistryMirrors) {
                            writeFiles = this.cloudConfig.writeFiles;
                            if (!writeFiles) {
                                writeFiles = [];
                                this.cloudConfig.writeFiles = writeFiles;
                            }
                            writeFiles.push({
                                path: '/etc/docker/daemon.json',
                                encoding: 'base64',
                                content: Buffer.from(JSON.stringify({
                                    "registry-mirrors": config.dockerRegistryMirrors.map(function (mirror) {
                                        switch (mirror) {
                                            case "daocloud":
                                                return "https://docker.m.daocloud.io";
                                            default:
                                                return mirror;
                                        }
                                    }),
                                })).toString("base64"),
                            });
                        }
                        packages = this.cloudConfig.packages;
                        if (!packages) {
                            packages = [];
                            this.cloudConfig.packages = packages;
                        }
                        packages.push("apt-transport-https", "ca-certificates", "docker-ce", "docker-ce-cli", "containerd.io", "docker-buildx-plugin", "docker-compose-plugin");
                        return [2, this];
                }
            });
        });
    };
    CloudConfigs.prototype.toJsonObject = function () {
        return JSON.parse(cloud_init_1.Convert.cloudConfigToJson(this.cloudConfig));
    };
    return CloudConfigs;
}());
exports.CloudConfigs = CloudConfigs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFrRDtBQUdsRDtJQUNJLHNCQUNxQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUM3QyxDQUFDO0lBRU0saUJBQUksR0FBWCxVQUFZLFdBQXlCO1FBQ2pDLE9BQU8sSUFBSSxZQUFZLENBQUMsV0FBVyxhQUFYLFdBQVcsY0FBWCxXQUFXLEdBQUksRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELDBDQUFtQixHQUFuQjtRQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNULEdBQUcsRUFBRSxvQ0FBb0M7WUFDekMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDZCxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMzQjtRQUNELFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDVixHQUFHLEVBQUUsb0NBQW9DO1lBQ3pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUN0QixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUssdUNBQWdCLEdBQXRCLFVBQXVCLE1BSXRCOzs7Ozs7Ozs2QkFDTyxNQUFNLENBQUMsZ0JBQWdCLEVBQXZCLGNBQXVCO3dCQUNuQixHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7d0JBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQ04sR0FBRyxHQUFHLEVBQUUsQ0FBQzs0QkFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7eUJBQzlCO3dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFOzRCQUNkLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO3lCQUNwQjt3QkFDRCxLQUFDLEdBQUcsQ0FBQyxPQUFlLENBQUE7d0JBQUMsS0FBQSxlQUFlLENBQUE7OzRCQUNoQyxNQUFNLEVBQUUsNkZBQTZGOzt3QkFDaEcsV0FBTSxDQUFBLE1BQUEsTUFBTSxDQUFDLFFBQVEsdURBQUcsdURBQXVELENBQUMsQ0FBQSxFQUFBOzt3QkFGekYsTUFBcUMsSUFFakMsTUFBRyxHQUFFLFNBQWdGOytCQUN4RixDQUFDOzs7d0JBR04sSUFBSSxNQUFNLENBQUMscUJBQXFCLEVBQUU7NEJBQzFCLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQzs0QkFDN0MsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQ0FDYixVQUFVLEdBQUcsRUFBRSxDQUFDO2dDQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7NkJBQzVDOzRCQUNELFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0NBQ1osSUFBSSxFQUFFLHlCQUF5QjtnQ0FDL0IsUUFBUSxFQUFFLFFBQVE7Z0NBQ2xCLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7b0NBQ2hDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNO3dDQUN2RCxRQUFRLE1BQU0sRUFBRTs0Q0FDWixLQUFLLFVBQVU7Z0RBQ1gsT0FBTyw4QkFBOEIsQ0FBQzs0Q0FDMUM7Z0RBQ0ksT0FBTyxNQUFNLENBQUM7eUNBQ3JCO29DQUNMLENBQUMsQ0FBQztpQ0FDTCxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDOzZCQUN6QixDQUFDLENBQUM7eUJBQ047d0JBRUcsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO3dCQUN6QyxJQUFJLENBQUMsUUFBUSxFQUFFOzRCQUNYLFFBQVEsR0FBRyxFQUFFLENBQUM7NEJBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3lCQUN4Qzt3QkFDRCxRQUFRLENBQUMsSUFBSSxDQUNULHFCQUFxQixFQUFFLGlCQUFpQixFQUN4QyxXQUFXLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxzQkFBc0IsRUFBRSx1QkFBdUIsQ0FDakcsQ0FBQzt3QkFFRixXQUFPLElBQUksRUFBQzs7OztLQUNmO0lBRUQsbUNBQVksR0FBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUE5RkQsSUE4RkM7QUE5Rlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Nsb3VkQ29uZmlnLCBDb252ZXJ0fSBmcm9tIFwiLi9jbG91ZC1pbml0XCI7XG5cblxuZXhwb3J0IGNsYXNzIENsb3VkQ29uZmlncyB7XG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjbG91ZENvbmZpZzogQ2xvdWRDb25maWcpIHtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbShjbG91ZENvbmZpZz86IENsb3VkQ29uZmlnKTogQ2xvdWRDb25maWdzIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbG91ZENvbmZpZ3MoY2xvdWRDb25maWcgPz8ge30pO1xuICAgIH1cblxuICAgIGFkZEFwdEFsaXl1bk1pcnJvcnMoKTogQ2xvdWRDb25maWdzIHtcbiAgICAgICAgbGV0IGFwdCA9IHRoaXMuY2xvdWRDb25maWcuYXB0O1xuICAgICAgICBpZiAoIWFwdCkge1xuICAgICAgICAgICAgYXB0ID0ge307XG4gICAgICAgICAgICB0aGlzLmNsb3VkQ29uZmlnLmFwdCA9IGFwdDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJpbWFyeSA9IGFwdC5wcmltYXJ5O1xuICAgICAgICBpZiAoIXByaW1hcnkpIHtcbiAgICAgICAgICAgIHByaW1hcnkgPSBbXTtcbiAgICAgICAgICAgIGFwdC5wcmltYXJ5ID0gcHJpbWFyeTtcbiAgICAgICAgfVxuICAgICAgICBwcmltYXJ5LnB1c2goe1xuICAgICAgICAgICAgdXJpOiBcImh0dHBzOi8vbWlycm9ycy5hbGl5dW4uY29tL3VidW50dS9cIixcbiAgICAgICAgICAgIGFyY2hlczogW1wiZGVmYXVsdFwiXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBzZWN1cml0eSA9IGFwdC5zZWN1cml0eTtcbiAgICAgICAgaWYgKCFzZWN1cml0eSkge1xuICAgICAgICAgICAgc2VjdXJpdHkgPSBbXTtcbiAgICAgICAgICAgIGFwdC5zZWN1cml0eSA9IHNlY3VyaXR5O1xuICAgICAgICB9XG4gICAgICAgIHNlY3VyaXR5LnB1c2goe1xuICAgICAgICAgICAgdXJpOiBcImh0dHBzOi8vbWlycm9ycy5hbGl5dW4uY29tL3VidW50dS9cIixcbiAgICAgICAgICAgIGFyY2hlczogW1wiZGVmYXVsdFwiXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFzeW5jIGFwdEluc3RhbGxEb2NrZXIoY29uZmlnOiB7XG4gICAgICAgIGRvY2tlckFwdE1pcnJvcnM/OiBcImFsaXl1blwiLFxuICAgICAgICBkb2NrZXJSZWdpc3RyeU1pcnJvcnM/OiAoc3RyaW5nIHwgXCJkYW9jbG91ZFwiKVtdLFxuICAgICAgICBmZXRjaEdwZz86ICh1cmw6IHN0cmluZykgPT4gUHJvbWlzZTxzdHJpbmc+LFxuICAgIH0pOiBQcm9taXNlPENsb3VkQ29uZmlncz4ge1xuICAgICAgICBpZiAoY29uZmlnLmRvY2tlckFwdE1pcnJvcnMpIHtcbiAgICAgICAgICAgIGxldCBhcHQgPSB0aGlzLmNsb3VkQ29uZmlnLmFwdDtcbiAgICAgICAgICAgIGlmICghYXB0KSB7XG4gICAgICAgICAgICAgICAgYXB0ID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5jbG91ZENvbmZpZy5hcHQgPSBhcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFwdC5zb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgYXB0LnNvdXJjZXMgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIChhcHQuc291cmNlcyBhcyBhbnkpW1wiZG9ja2VyLWFsaXl1blwiXSA9IHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IFwiZGViIFtzaWduZWQtYnk9JEtFWV9GSUxFXSBodHRwczovL21pcnJvcnMuYWxpeXVuLmNvbS9kb2NrZXItY2UvbGludXgvdWJ1bnR1ICRSRUxFQVNFIHN0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGtleTogYXdhaXQgY29uZmlnLmZldGNoR3BnPy4oJ2h0dHBzOi8vbWlycm9ycy5hbGl5dW4uY29tL2RvY2tlci1jZS9saW51eC91YnVudHUvZ3BnJyksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5kb2NrZXJSZWdpc3RyeU1pcnJvcnMpIHtcbiAgICAgICAgICAgIGxldCB3cml0ZUZpbGVzID0gdGhpcy5jbG91ZENvbmZpZy53cml0ZUZpbGVzO1xuICAgICAgICAgICAgaWYgKCF3cml0ZUZpbGVzKSB7XG4gICAgICAgICAgICAgICAgd3JpdGVGaWxlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvdWRDb25maWcud3JpdGVGaWxlcyA9IHdyaXRlRmlsZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3cml0ZUZpbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIHBhdGg6ICcvZXRjL2RvY2tlci9kYWVtb24uanNvbicsXG4gICAgICAgICAgICAgICAgZW5jb2Rpbmc6ICdiYXNlNjQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgXCJyZWdpc3RyeS1taXJyb3JzXCI6IGNvbmZpZy5kb2NrZXJSZWdpc3RyeU1pcnJvcnMubWFwKG1pcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1pcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYW9jbG91ZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJodHRwczovL2RvY2tlci5tLmRhb2Nsb3VkLmlvXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1pcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSkpLnRvU3RyaW5nKFwiYmFzZTY0XCIpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFja2FnZXMgPSB0aGlzLmNsb3VkQ29uZmlnLnBhY2thZ2VzO1xuICAgICAgICBpZiAoIXBhY2thZ2VzKSB7XG4gICAgICAgICAgICBwYWNrYWdlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jbG91ZENvbmZpZy5wYWNrYWdlcyA9IHBhY2thZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHBhY2thZ2VzLnB1c2goXG4gICAgICAgICAgICBcImFwdC10cmFuc3BvcnQtaHR0cHNcIiwgXCJjYS1jZXJ0aWZpY2F0ZXNcIixcbiAgICAgICAgICAgIFwiZG9ja2VyLWNlXCIsIFwiZG9ja2VyLWNlLWNsaVwiLCBcImNvbnRhaW5lcmQuaW9cIiwgXCJkb2NrZXItYnVpbGR4LXBsdWdpblwiLCBcImRvY2tlci1jb21wb3NlLXBsdWdpblwiLFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRvSnNvbk9iamVjdCgpOiBvYmplY3Qge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShDb252ZXJ0LmNsb3VkQ29uZmlnVG9Kc29uKHRoaXMuY2xvdWRDb25maWcpKTtcbiAgICB9XG59XG4iXX0=