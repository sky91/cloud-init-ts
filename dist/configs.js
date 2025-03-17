"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudConfigs = void 0;
var cloud_init_1 = require("./cloud-init");
var CloudConfigs = (function () {
    function CloudConfigs(cloudConfig) {
        this.cloudConfig = cloudConfig;
    }
    CloudConfigs.from = function (cloudConfig) {
        return new CloudConfigs(cloudConfig);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFrRDtBQUdsRDtJQUNJLHNCQUNxQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUM3QyxDQUFDO0lBRU0saUJBQUksR0FBWCxVQUFZLFdBQXdCO1FBQ2hDLE9BQU8sSUFBSSxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELDBDQUFtQixHQUFuQjtRQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNULEdBQUcsRUFBRSxvQ0FBb0M7WUFDekMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDZCxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMzQjtRQUNELFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDVixHQUFHLEVBQUUsb0NBQW9DO1lBQ3pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUN0QixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLE1BSWhCOztRQUNHLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1lBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDOUI7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZCxHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzthQUNwQjtZQUNBLEdBQUcsQ0FBQyxPQUFlLENBQUMsZUFBZSxDQUFDLEdBQUc7Z0JBQ3BDLE1BQU0sRUFBRSw2RkFBNkY7Z0JBQ3JHLEdBQUcsRUFBRSxNQUFBLE1BQU0sQ0FBQyxRQUFRLHVEQUFHLHVEQUF1RCxDQUFDO2FBQ2xGLENBQUM7U0FDTDtRQUVELElBQUksTUFBTSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2IsVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2FBQzVDO1lBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDWixJQUFJLEVBQUUseUJBQXlCO2dCQUMvQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDaEMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07d0JBQ3ZELFFBQVEsTUFBTSxFQUFFOzRCQUNaLEtBQUssVUFBVTtnQ0FDWCxPQUFPLDhCQUE4QixDQUFDOzRCQUMxQztnQ0FDSSxPQUFPLE1BQU0sQ0FBQzt5QkFDckI7b0JBQ0wsQ0FBQyxDQUFDO2lCQUNMLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDekIsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUN4QztRQUNELFFBQVEsQ0FBQyxJQUFJLENBQ1QscUJBQXFCLEVBQUUsaUJBQWlCLEVBQ3hDLFdBQVcsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixDQUNqRyxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBOUZELElBOEZDO0FBOUZZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDbG91ZENvbmZpZywgQ29udmVydH0gZnJvbSBcIi4vY2xvdWQtaW5pdFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBDbG91ZENvbmZpZ3Mge1xuICAgIHByaXZhdGUgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2xvdWRDb25maWc6IENsb3VkQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb20oY2xvdWRDb25maWc6IENsb3VkQ29uZmlnKTogQ2xvdWRDb25maWdzIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbG91ZENvbmZpZ3MoY2xvdWRDb25maWcpO1xuICAgIH1cblxuICAgIGFkZEFwdEFsaXl1bk1pcnJvcnMoKTogQ2xvdWRDb25maWdzIHtcbiAgICAgICAgbGV0IGFwdCA9IHRoaXMuY2xvdWRDb25maWcuYXB0O1xuICAgICAgICBpZiAoIWFwdCkge1xuICAgICAgICAgICAgYXB0ID0ge307XG4gICAgICAgICAgICB0aGlzLmNsb3VkQ29uZmlnLmFwdCA9IGFwdDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJpbWFyeSA9IGFwdC5wcmltYXJ5O1xuICAgICAgICBpZiAoIXByaW1hcnkpIHtcbiAgICAgICAgICAgIHByaW1hcnkgPSBbXTtcbiAgICAgICAgICAgIGFwdC5wcmltYXJ5ID0gcHJpbWFyeTtcbiAgICAgICAgfVxuICAgICAgICBwcmltYXJ5LnB1c2goe1xuICAgICAgICAgICAgdXJpOiBcImh0dHBzOi8vbWlycm9ycy5hbGl5dW4uY29tL3VidW50dS9cIixcbiAgICAgICAgICAgIGFyY2hlczogW1wiZGVmYXVsdFwiXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBzZWN1cml0eSA9IGFwdC5zZWN1cml0eTtcbiAgICAgICAgaWYgKCFzZWN1cml0eSkge1xuICAgICAgICAgICAgc2VjdXJpdHkgPSBbXTtcbiAgICAgICAgICAgIGFwdC5zZWN1cml0eSA9IHNlY3VyaXR5O1xuICAgICAgICB9XG4gICAgICAgIHNlY3VyaXR5LnB1c2goe1xuICAgICAgICAgICAgdXJpOiBcImh0dHBzOi8vbWlycm9ycy5hbGl5dW4uY29tL3VidW50dS9cIixcbiAgICAgICAgICAgIGFyY2hlczogW1wiZGVmYXVsdFwiXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFwdEluc3RhbGxEb2NrZXIoY29uZmlnOiB7XG4gICAgICAgIGRvY2tlckFwdE1pcnJvcnM/OiBcImFsaXl1blwiLFxuICAgICAgICBkb2NrZXJSZWdpc3RyeU1pcnJvcnM/OiAoc3RyaW5nIHwgXCJkYW9jbG91ZFwiKVtdLFxuICAgICAgICBmZXRjaEdwZz86ICh1cmw6IHN0cmluZykgPT4gc3RyaW5nLFxuICAgIH0pOiBDbG91ZENvbmZpZ3Mge1xuICAgICAgICBpZiAoY29uZmlnLmRvY2tlckFwdE1pcnJvcnMpIHtcbiAgICAgICAgICAgIGxldCBhcHQgPSB0aGlzLmNsb3VkQ29uZmlnLmFwdDtcbiAgICAgICAgICAgIGlmICghYXB0KSB7XG4gICAgICAgICAgICAgICAgYXB0ID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5jbG91ZENvbmZpZy5hcHQgPSBhcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFwdC5zb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgYXB0LnNvdXJjZXMgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIChhcHQuc291cmNlcyBhcyBhbnkpW1wiZG9ja2VyLWFsaXl1blwiXSA9IHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IFwiZGViIFtzaWduZWQtYnk9JEtFWV9GSUxFXSBodHRwczovL21pcnJvcnMuYWxpeXVuLmNvbS9kb2NrZXItY2UvbGludXgvdWJ1bnR1ICRSRUxFQVNFIHN0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGtleTogY29uZmlnLmZldGNoR3BnPy4oJ2h0dHBzOi8vbWlycm9ycy5hbGl5dW4uY29tL2RvY2tlci1jZS9saW51eC91YnVudHUvZ3BnJyksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5kb2NrZXJSZWdpc3RyeU1pcnJvcnMpIHtcbiAgICAgICAgICAgIGxldCB3cml0ZUZpbGVzID0gdGhpcy5jbG91ZENvbmZpZy53cml0ZUZpbGVzO1xuICAgICAgICAgICAgaWYgKCF3cml0ZUZpbGVzKSB7XG4gICAgICAgICAgICAgICAgd3JpdGVGaWxlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvdWRDb25maWcud3JpdGVGaWxlcyA9IHdyaXRlRmlsZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3cml0ZUZpbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIHBhdGg6ICcvZXRjL2RvY2tlci9kYWVtb24uanNvbicsXG4gICAgICAgICAgICAgICAgZW5jb2Rpbmc6ICdiYXNlNjQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgXCJyZWdpc3RyeS1taXJyb3JzXCI6IGNvbmZpZy5kb2NrZXJSZWdpc3RyeU1pcnJvcnMubWFwKG1pcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1pcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYW9jbG91ZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJodHRwczovL2RvY2tlci5tLmRhb2Nsb3VkLmlvXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1pcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgfSkpLnRvU3RyaW5nKFwiYmFzZTY0XCIpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFja2FnZXMgPSB0aGlzLmNsb3VkQ29uZmlnLnBhY2thZ2VzO1xuICAgICAgICBpZiAoIXBhY2thZ2VzKSB7XG4gICAgICAgICAgICBwYWNrYWdlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jbG91ZENvbmZpZy5wYWNrYWdlcyA9IHBhY2thZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHBhY2thZ2VzLnB1c2goXG4gICAgICAgICAgICBcImFwdC10cmFuc3BvcnQtaHR0cHNcIiwgXCJjYS1jZXJ0aWZpY2F0ZXNcIixcbiAgICAgICAgICAgIFwiZG9ja2VyLWNlXCIsIFwiZG9ja2VyLWNlLWNsaVwiLCBcImNvbnRhaW5lcmQuaW9cIiwgXCJkb2NrZXItYnVpbGR4LXBsdWdpblwiLCBcImRvY2tlci1jb21wb3NlLXBsdWdpblwiLFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRvSnNvbk9iamVjdCgpOiBvYmplY3Qge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShDb252ZXJ0LmNsb3VkQ29uZmlnVG9Kc29uKHRoaXMuY2xvdWRDb25maWcpKTtcbiAgICB9XG59XG4iXX0=