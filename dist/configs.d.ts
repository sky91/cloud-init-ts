import { CloudConfig } from "./cloud-init";
export declare class CloudConfigs {
    private readonly cloudConfig;
    private constructor();
    static from(cloudConfig: CloudConfig): CloudConfigs;
    addAptAliyunMirrors(): CloudConfigs;
    aptInstallDocker(config: {
        dockerAptMirrors?: "aliyun";
        dockerRegistryMirrors?: (string | "daocloud")[];
        fetchGpg?: (url: string) => string;
    }): CloudConfigs;
    toJsonObject(): object;
}
