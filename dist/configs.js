"use strict";
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
        if (config.dockerAptMirrors) {
            var apt = this.cloudConfig.apt;
            if (!apt) {
                apt = {};
                this.cloudConfig.apt = apt;
            }
            if (!apt.sources) {
                apt.sources = {};
            }
            apt.sources["docker-aliyun"] = {
                source: "deb [signed-by=$KEY_FILE] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $RELEASE stable",
                key: (_a = config.fetchGpg) === null || _a === void 0 ? void 0 : _a.call(config, 'https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg'),
            };
        }
        if (config.dockerRegistryMirrors) {
            var writeFiles = this.cloudConfig.writeFiles;
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
        var packages = this.cloudConfig.packages;
        if (!packages) {
            packages = [];
            this.cloudConfig.packages = packages;
        }
        packages.push("apt-transport-https", "ca-certificates", "docker-ce", "docker-ce-cli", "containerd.io", "docker-buildx-plugin", "docker-compose-plugin");
        return this;
    };
    CloudConfigs.prototype.toJsonObject = function () {
        return JSON.parse(cloud_init_1.Convert.cloudConfigToJson(this.cloudConfig));
    };
    return CloudConfigs;
}());
exports.CloudConfigs = CloudConfigs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFrRDtBQUdsRDtJQUNJLHNCQUNxQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUM3QyxDQUFDO0lBRU0saUJBQUksR0FBWCxVQUFZLFdBQXlCO1FBQ2pDLE9BQU8sSUFBSSxZQUFZLENBQUMsV0FBVyxhQUFYLFdBQVcsY0FBWCxXQUFXLEdBQUksRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELDBDQUFtQixHQUFuQjtRQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNULEdBQUcsRUFBRSxvQ0FBb0M7WUFDekMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDZCxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMzQjtRQUNELFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDVixHQUFHLEVBQUUsb0NBQW9DO1lBQ3pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUN0QixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLE1BSWhCOztRQUNHLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1lBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDOUI7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZCxHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzthQUNwQjtZQUNBLEdBQUcsQ0FBQyxPQUFlLENBQUMsZUFBZSxDQUFDLEdBQUc7Z0JBQ3BDLE1BQU0sRUFBRSw2RkFBNkY7Z0JBQ3JHLEdBQUcsRUFBRSxNQUFBLE1BQU0sQ0FBQyxRQUFRLHVEQUFHLHVEQUF1RCxDQUFDO2FBQ2xGLENBQUM7U0FDTDtRQUVELElBQUksTUFBTSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2IsVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2FBQzVDO1lBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDWixJQUFJLEVBQUUseUJBQXlCO2dCQUMvQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDaEMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07d0JBQ3ZELFFBQVEsTUFBTSxFQUFFOzRCQUNaLEtBQUssVUFBVTtnQ0FDWCxPQUFPLDhCQUE4QixDQUFDOzRCQUMxQztnQ0FDSSxPQUFPLE1BQU0sQ0FBQzt5QkFDckI7b0JBQ0wsQ0FBQyxDQUFDO2lCQUNMLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDekIsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUN4QztRQUNELFFBQVEsQ0FBQyxJQUFJLENBQ1QscUJBQXFCLEVBQUUsaUJBQWlCLEVBQ3hDLFdBQVcsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixDQUNqRyxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBOUZELElBOEZDO0FBOUZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDbG91ZENvbmZpZywgQ29udmVydH0gZnJvbSBcIi4vY2xvdWQtaW5pdFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBDbG91ZENvbmZpZ3Mge1xuICAgIHByaXZhdGUgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2xvdWRDb25maWc6IENsb3VkQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20oY2xvdWRDb25maWc/OiBDbG91ZENvbmZpZyk6IENsb3VkQ29uZmlncyB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xvdWRDb25maWdzKGNsb3VkQ29uZmlnID8/IHt9KTtcbiAgICB9XG5cbiAgICBhZGRBcHRBbGl5dW5NaXJyb3JzKCk6IENsb3VkQ29uZmlncyB7XG4gICAgICAgIGxldCBhcHQgPSB0aGlzLmNsb3VkQ29uZmlnLmFwdDtcbiAgICAgICAgaWYgKCFhcHQpIHtcbiAgICAgICAgICAgIGFwdCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5jbG91ZENvbmZpZy5hcHQgPSBhcHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByaW1hcnkgPSBhcHQucHJpbWFyeTtcbiAgICAgICAgaWYgKCFwcmltYXJ5KSB7XG4gICAgICAgICAgICBwcmltYXJ5ID0gW107XG4gICAgICAgICAgICBhcHQucHJpbWFyeSA9IHByaW1hcnk7XG4gICAgICAgIH1cbiAgICAgICAgcHJpbWFyeS5wdXNoKHtcbiAgICAgICAgICAgIHVyaTogXCJodHRwczovL21pcnJvcnMuYWxpeXVuLmNvbS91YnVudHUvXCIsXG4gICAgICAgICAgICBhcmNoZXM6IFtcImRlZmF1bHRcIl0sXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc2VjdXJpdHkgPSBhcHQuc2VjdXJpdHk7XG4gICAgICAgIGlmICghc2VjdXJpdHkpIHtcbiAgICAgICAgICAgIHNlY3VyaXR5ID0gW107XG4gICAgICAgICAgICBhcHQuc2VjdXJpdHkgPSBzZWN1cml0eTtcbiAgICAgICAgfVxuICAgICAgICBzZWN1cml0eS5wdXNoKHtcbiAgICAgICAgICAgIHVyaTogXCJodHRwczovL21pcnJvcnMuYWxpeXVuLmNvbS91YnVudHUvXCIsXG4gICAgICAgICAgICBhcmNoZXM6IFtcImRlZmF1bHRcIl0sXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhcHRJbnN0YWxsRG9ja2VyKGNvbmZpZzoge1xuICAgICAgICBkb2NrZXJBcHRNaXJyb3JzPzogXCJhbGl5dW5cIixcbiAgICAgICAgZG9ja2VyUmVnaXN0cnlNaXJyb3JzPzogKHN0cmluZyB8IFwiZGFvY2xvdWRcIilbXSxcbiAgICAgICAgZmV0Y2hHcGc/OiAodXJsOiBzdHJpbmcpID0+IHN0cmluZyxcbiAgICB9KTogQ2xvdWRDb25maWdzIHtcbiAgICAgICAgaWYgKGNvbmZpZy5kb2NrZXJBcHRNaXJyb3JzKSB7XG4gICAgICAgICAgICBsZXQgYXB0ID0gdGhpcy5jbG91ZENvbmZpZy5hcHQ7XG4gICAgICAgICAgICBpZiAoIWFwdCkge1xuICAgICAgICAgICAgICAgIGFwdCA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvdWRDb25maWcuYXB0ID0gYXB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhcHQuc291cmNlcykge1xuICAgICAgICAgICAgICAgIGFwdC5zb3VyY2VzID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoYXB0LnNvdXJjZXMgYXMgYW55KVtcImRvY2tlci1hbGl5dW5cIl0gPSB7XG4gICAgICAgICAgICAgICAgc291cmNlOiBcImRlYiBbc2lnbmVkLWJ5PSRLRVlfRklMRV0gaHR0cHM6Ly9taXJyb3JzLmFsaXl1bi5jb20vZG9ja2VyLWNlL2xpbnV4L3VidW50dSAkUkVMRUFTRSBzdGFibGVcIixcbiAgICAgICAgICAgICAgICBrZXk6IGNvbmZpZy5mZXRjaEdwZz8uKCdodHRwczovL21pcnJvcnMuYWxpeXVuLmNvbS9kb2NrZXItY2UvbGludXgvdWJ1bnR1L2dwZycpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuZG9ja2VyUmVnaXN0cnlNaXJyb3JzKSB7XG4gICAgICAgICAgICBsZXQgd3JpdGVGaWxlcyA9IHRoaXMuY2xvdWRDb25maWcud3JpdGVGaWxlcztcbiAgICAgICAgICAgIGlmICghd3JpdGVGaWxlcykge1xuICAgICAgICAgICAgICAgIHdyaXRlRmlsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3VkQ29uZmlnLndyaXRlRmlsZXMgPSB3cml0ZUZpbGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3JpdGVGaWxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnL2V0Yy9kb2NrZXIvZGFlbW9uLmpzb24nLFxuICAgICAgICAgICAgICAgIGVuY29kaW5nOiAnYmFzZTY0JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBCdWZmZXIuZnJvbShKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIFwicmVnaXN0cnktbWlycm9yc1wiOiBjb25maWcuZG9ja2VyUmVnaXN0cnlNaXJyb3JzLm1hcChtaXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChtaXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGFvY2xvdWRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiaHR0cHM6Ly9kb2NrZXIubS5kYW9jbG91ZC5pb1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtaXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIH0pKS50b1N0cmluZyhcImJhc2U2NFwiKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhY2thZ2VzID0gdGhpcy5jbG91ZENvbmZpZy5wYWNrYWdlcztcbiAgICAgICAgaWYgKCFwYWNrYWdlcykge1xuICAgICAgICAgICAgcGFja2FnZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY2xvdWRDb25maWcucGFja2FnZXMgPSBwYWNrYWdlcztcbiAgICAgICAgfVxuICAgICAgICBwYWNrYWdlcy5wdXNoKFxuICAgICAgICAgICAgXCJhcHQtdHJhbnNwb3J0LWh0dHBzXCIsIFwiY2EtY2VydGlmaWNhdGVzXCIsXG4gICAgICAgICAgICBcImRvY2tlci1jZVwiLCBcImRvY2tlci1jZS1jbGlcIiwgXCJjb250YWluZXJkLmlvXCIsIFwiZG9ja2VyLWJ1aWxkeC1wbHVnaW5cIiwgXCJkb2NrZXItY29tcG9zZS1wbHVnaW5cIixcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b0pzb25PYmplY3QoKTogb2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoQ29udmVydC5jbG91ZENvbmZpZ1RvSnNvbih0aGlzLmNsb3VkQ29uZmlnKSk7XG4gICAgfVxufVxuIl19