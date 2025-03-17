import {CloudConfig, Convert} from "./cloud-init";


export class CloudConfigs {
    private constructor(
        private readonly cloudConfig: CloudConfig) {
    }

    static from(cloudConfig?: CloudConfig): CloudConfigs {
        return new CloudConfigs(cloudConfig ?? {});
    }

    addAptAliyunMirrors(): CloudConfigs {
        let apt = this.cloudConfig.apt;
        if (!apt) {
            apt = {};
            this.cloudConfig.apt = apt;
        }
        let primary = apt.primary;
        if (!primary) {
            primary = [];
            apt.primary = primary;
        }
        primary.push({
            uri: "https://mirrors.aliyun.com/ubuntu/",
            arches: ["default"],
        });
        let security = apt.security;
        if (!security) {
            security = [];
            apt.security = security;
        }
        security.push({
            uri: "https://mirrors.aliyun.com/ubuntu/",
            arches: ["default"],
        });
        return this;
    }

    aptInstallDocker(config: {
        dockerAptMirrors?: "aliyun",
        dockerRegistryMirrors?: (string | "daocloud")[],
        fetchGpg?: (url: string) => string,
    }): CloudConfigs {
        if (config.dockerAptMirrors) {
            let apt = this.cloudConfig.apt;
            if (!apt) {
                apt = {};
                this.cloudConfig.apt = apt;
            }
            if (!apt.sources) {
                apt.sources = {};
            }
            (apt.sources as any)["docker-aliyun"] = {
                source: "deb [signed-by=$KEY_FILE] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $RELEASE stable",
                key: config.fetchGpg?.('https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg'),
            };
        }

        if (config.dockerRegistryMirrors) {
            let writeFiles = this.cloudConfig.writeFiles;
            if (!writeFiles) {
                writeFiles = [];
                this.cloudConfig.writeFiles = writeFiles;
            }
            writeFiles.push({
                path: '/etc/docker/daemon.json',
                encoding: 'base64',
                content: Buffer.from(JSON.stringify({
                    "registry-mirrors": config.dockerRegistryMirrors.map(mirror => {
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

        let packages = this.cloudConfig.packages;
        if (!packages) {
            packages = [];
            this.cloudConfig.packages = packages;
        }
        packages.push(
            "apt-transport-https", "ca-certificates",
            "docker-ce", "docker-ce-cli", "containerd.io", "docker-buildx-plugin", "docker-compose-plugin",
        );

        return this;
    }

    toJsonObject(): object {
        return JSON.parse(Convert.cloudConfigToJson(this.cloudConfig));
    }
}
