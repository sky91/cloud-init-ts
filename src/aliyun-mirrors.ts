import {Apt} from "./cloud-init";

export function addAptAliyunMirrors(apt: Apt): Apt {
    apt.primary.push({
        uri: "https://mirrors.aliyun.com/ubuntu/",
        arches: ["default"],
    });
    apt.security.push({
        uri: "https://mirrors.aliyun.com/ubuntu/",
        arches: ["default"],
    });
    return apt;
}

export function setDockerAptAliyunMirrors(apt: Apt, gpgFetcher: (url: string) => string): Apt {
    apt.sources["docker-aliyun"] = {
        source: "deb [signed-by=$KEY_FILE] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $RELEASE stable",
        key: gpgFetcher('https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg'),
    };
    return apt;
}
