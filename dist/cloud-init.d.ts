export interface CloudConfig {
    version?: "v1";
    allowPublicSSHKeys?: boolean;
    ansible?: Ansible;
    apkRepos?: ApkRepos;
    apt?: Apt;
    aptPipelining?: boolean | AnsibleConfig | number;
    aptRebootIfRequired?: boolean;
    aptUpdate?: boolean;
    aptUpgrade?: boolean;
    authkeyHash?: string;
    autoinstall?: Autoinstall;
    bootcmd?: Array<string[] | string>;
    byobuByDefault?: ByobuByDefault;
    caCerts?: CACerts;
    cloudConfigCACerts?: CACerts;
    chef?: Chef;
    chpasswd?: Chpasswd;
    cloudConfigModules?: Array<any[] | CloudConfigModuleEnum>;
    cloudFinalModules?: Array<any[] | CloudConfigModuleEnum>;
    cloudInitModules?: Array<any[] | CloudConfigModuleEnum>;
    createHostnameFile?: boolean;
    deviceAliases?: DeviceAliases;
    disableEc2Metadata?: boolean;
    disableRoot?: boolean;
    disableRootOpts?: string;
    diskSetup?: DiskSetup;
    drivers?: Drivers;
    fan?: Fan;
    finalMessage?: string;
    fqdn?: string;
    fsSetup?: FSSetup[];
    groups?: any[] | GroupsClass | string;
    growpart?: Growpart;
    grubDpkg?: {
        [key: string]: any;
    };
    cloudConfigGrubDpkg?: GrubDpkg;
    hostname?: string;
    keyboard?: Keyboard;
    landscape?: Landscape;
    launchIndex?: number;
    locale?: boolean | string;
    localeConfigfile?: string;
    lxd?: Lxd;
    manageEtcHosts?: boolean | ManageEtcHostsEnum;
    manageResolvConf?: boolean;
    mcollective?: Mcollective;
    mergeHow?: MergeHowElement[] | string;
    mergeType?: MergeHowElement[] | string;
    migrate?: any;
    mountDefaultFields?: Array<null | string>;
    mounts?: Array<string[]>;
    noSSHFingerprints?: boolean;
    ntp?: NTP | null;
    output?: Output;
    packageRebootIfRequired?: boolean;
    packageUpdate?: boolean;
    packageUpgrade?: boolean;
    packages?: Array<string[] | PackageClass | string>;
    password?: string;
    phoneHome?: PhoneHome;
    powerState?: PowerState;
    preferFQDNOverHostname?: boolean;
    preserveHostname?: boolean;
    puppet?: Puppet;
    randomSeed?: RandomSeed;
    reporting?: Reporting;
    resizeRootfs?: boolean | "noblock";
    resolvConf?: ResolvConf;
    rhSubscription?: RhSubscription;
    rsyslog?: Rsyslog;
    runcmd?: Array<string[] | null | string>;
    saltMinion?: SaltMinion;
    snap?: Snap;
    spacewalk?: Spacewalk;
    ssh?: SSH;
    sshAuthorizedKeys?: string[];
    sshDeletekeys?: boolean;
    sshFPConsoleBlacklist?: string[];
    sshGenkeytypes?: SSHGenkeytype[];
    sshImportID?: string[];
    sshKeyConsoleBlacklist?: string[];
    sshKeys?: SSHKeys;
    sshPublishHostkeys?: SSHPublishHostkeys;
    sshPwauth?: boolean | string;
    sshQuietKeygen?: boolean;
    swap?: Swap;
    systemInfo?: {
        [key: string]: any;
    };
    timezone?: string;
    ubuntuAdvantage?: UbuntuAdvantage;
    ubuntuPro?: UbuntuAdvantage;
    updates?: Updates;
    user?: PurpleSchemaCloudConfigV1 | string;
    users?: Array<string[] | FluffySchemaCloudConfigV1 | string> | {
        [key: string]: any;
    } | string;
    vendorData?: VendorData;
    wireguard?: Wireguard | null;
    writeFiles?: WriteFile[];
    yumRepoDir?: string;
    yumRepos?: YumRepos;
    zypper?: Zypper;
}
export interface Ansible {
    ansibleConfig?: string;
    galaxy?: Galaxy;
    installMethod?: InstallMethod;
    packageName?: string;
    pull?: Pull;
    runUser?: string;
    setupController?: SetupController;
}
export interface Galaxy {
    actions: Array<string[]>;
}
export type InstallMethod = "distro" | "pip";
export interface Pull {
    acceptHostKey?: boolean;
    checkout?: string;
    clean?: boolean;
    connection?: string;
    diff?: boolean;
    full?: boolean;
    inventory?: string;
    moduleName?: string;
    modulePath?: string;
    playbookName: string;
    privateKey?: string;
    scpExtraArgs?: string;
    sftpExtraArgs?: string;
    skipTags?: string;
    sleep?: string;
    sshCommonArgs?: string;
    tags?: string;
    timeout?: string;
    url: string;
    vaultID?: string;
    vaultPasswordFile?: string;
    verifyCommit?: boolean;
}
export interface SetupController {
    repositories?: Repository[];
    runAnsible?: RunAnsible[];
}
export interface Repository {
    path: string;
    source: string;
}
export interface RunAnsible {
    args?: string;
    background?: number;
    becomePasswordFile?: string;
    check?: boolean;
    connection?: string;
    connectionPasswordFile?: string;
    diff?: boolean;
    extraVars?: string;
    forks?: number;
    inventory?: string;
    listHosts?: boolean;
    moduleName?: string;
    modulePath?: string;
    playbookDir?: string;
    playbookName?: string;
    poll?: number;
    privateKey?: string;
    scpExtraArgs?: string;
    sftpExtraArgs?: string;
    skipTags?: string;
    sleep?: string;
    syntaxCheck?: boolean;
    tags?: string;
    timeout?: number;
    vaultID?: string;
    vaultPasswordFile?: string;
    [property: string]: any;
}
export interface ApkRepos {
    alpineRepo?: AlpineRepo | null;
    localRepoBaseURL?: string;
    preserveRepositories?: boolean;
}
export interface AlpineRepo {
    baseURL?: string;
    communityEnabled?: boolean;
    testingEnabled?: boolean;
    version: string;
}
export interface Apt {
    addAptRepoMatch?: string;
    conf?: string;
    debconfSelections?: DebconfSelections;
    disableSuites?: string[];
    ftpProxy?: string;
    httpProxy?: string;
    httpsProxy?: string;
    preserveSourcesList?: boolean;
    primary?: PrimaryElement[];
    proxy?: string;
    security?: PrimaryElement[];
    sources?: Sources;
    sourcesList?: string;
}
export interface DebconfSelections {
}
export interface PrimaryElement {
    arches: string[];
    key?: string;
    keyid?: string;
    keyserver?: string;
    search?: string[];
    searchDNS?: boolean;
    uri?: string;
}
export interface Sources {
}
export type AnsibleConfig = "os" | "none" | "unchanged";
export interface Autoinstall {
    version: number;
    [property: string]: any;
}
export type ByobuByDefault = "enable-system" | "enable-user" | "disable-system" | "disable-user" | "enable" | "disable" | "user" | "system";
export interface CACerts {
    removeDefaults?: boolean;
    caCertsRemoveDefaults?: boolean;
    trusted?: string[];
}
export interface Chef {
    chefLicense?: ChefLicense;
    clientKey?: string;
    configPath?: string;
    directories?: string[];
    encryptedDataBagSecret?: string;
    environment?: string;
    exec?: boolean;
    fileBackupPath?: string;
    fileCachePath?: string;
    firstbootPath?: string;
    forceInstall?: boolean;
    initialAttributes?: {
        [key: string]: any;
    };
    installType?: ChefInstallType;
    jsonAttribs?: string;
    logLevel?: string;
    logLocation?: string;
    nodeName?: string;
    omnibusURL?: string;
    omnibusURLRetries?: number;
    omnibusVersion?: string;
    pidFile?: string;
    runList?: string[];
    serverURL?: string;
    showTime?: boolean;
    sslVerifyMode?: string;
    validationCERT?: string;
    validationKey?: string;
    validationName?: string;
}
export type ChefLicense = "accept" | "accept-silent" | "accept-no-persist";
export type ChefInstallType = "packages" | "gems" | "omnibus";
export interface Chpasswd {
    expire?: boolean;
    list?: string[] | string;
    users?: UserClass[];
}
export interface UserClass {
    name: string;
    type?: Type;
    password?: string;
}
export type Type = "RANDOM" | "hash" | "text";
export interface GrubDpkg {
    enabled?: boolean;
    grubEFIInstallDevices?: string;
    grubPCInstallDevices?: string;
    grubPCInstallDevicesEmpty?: boolean | string;
}
export type CloudConfigModuleEnum = "ansible" | "apk-configure" | "apk_configure" | "apt-configure" | "apt_configure" | "apt-pipelining" | "apt_pipelining" | "bootcmd" | "byobu" | "ca-certs" | "ca_certs" | "chef" | "disable-ec2-metadata" | "disable_ec2_metadata" | "disk-setup" | "disk_setup" | "fan" | "final-message" | "final_message" | "growpart" | "grub-dpkg" | "grub_dpkg" | "install-hotplug" | "install_hotplug" | "keyboard" | "keys-to-console" | "keys_to_console" | "landscape" | "locale" | "lxd" | "mcollective" | "mounts" | "ntp" | "package-update-upgrade-install" | "package_update_upgrade_install" | "phone-home" | "phone_home" | "power-state-change" | "power_state_change" | "puppet" | "reset-rmc" | "reset_rmc" | "resizefs" | "resolv-conf" | "resolv_conf" | "rh-subscription" | "rh_subscription" | "rsyslog" | "runcmd" | "salt-minion" | "salt_minion" | "scripts-per-boot" | "scripts_per_boot" | "scripts-per-instance" | "scripts_per_instance" | "scripts-per-once" | "scripts_per_once" | "scripts-user" | "scripts_user" | "scripts-vendor" | "scripts_vendor" | "seed-random" | "seed_random" | "set-hostname" | "set_hostname" | "set-passwords" | "set_passwords" | "snap" | "spacewalk" | "ssh" | "ssh-authkey-fingerprints" | "ssh_authkey_fingerprints" | "ssh-import-id" | "ssh_import_id" | "timezone" | "ubuntu-advantage" | "ubuntu_advantage" | "ubuntu-autoinstall" | "ubuntu_autoinstall" | "ubuntu-drivers" | "ubuntu_drivers" | "ubuntu_pro" | "update-etc-hosts" | "update_etc_hosts" | "update-hostname" | "update_hostname" | "users-groups" | "users_groups" | "wireguard" | "write-files" | "write_files" | "write-files-deferred" | "write_files_deferred" | "yum-add-repo" | "yum_add_repo" | "zypper-add-repo" | "zypper_add_repo";
export interface DeviceAliases {
}
export interface DiskSetup {
}
export interface Drivers {
    nvidia?: Nvidia;
}
export interface Nvidia {
    licenseAccepted: boolean;
    version?: string;
}
export interface Fan {
    config: string;
    configPath?: string;
}
export interface FSSetup {
    cmd?: string[] | string;
    device?: string;
    extraOpts?: string[] | string;
    filesystem?: string;
    label?: string;
    overwrite?: boolean;
    partition?: PartitionEnum;
    replaceFS?: string;
}
export type PartitionEnum = "auto" | "any" | "none";
export interface GroupsClass {
}
export interface Growpart {
    devices?: string[];
    ignoreGrowrootDisabled?: boolean;
    mode?: boolean | ModeMode;
}
export type ModeMode = "auto" | "growpart" | "gpart" | "off";
export interface Keyboard {
    layout: string;
    model?: string;
    options?: string;
    variant?: string;
}
export interface Landscape {
    client: Client;
}
export interface Client {
    accountName: string;
    computerTitle: string;
    dataPath?: string;
    httpProxy?: string;
    httpsProxy?: string;
    logLevel?: LogLevel;
    pingURL?: string;
    registrationKey?: string;
    tags?: string;
    url?: string;
    [property: string]: any;
}
export type LogLevel = "debug" | "info" | "warning" | "error" | "critical";
export interface Lxd {
    bridge?: Bridge;
    init?: Init;
    preseed?: string;
}
export interface Bridge {
    domain?: string;
    ipv4Address?: string;
    ipv4DHCPFirst?: string;
    ipv4DHCPLast?: string;
    ipv4DHCPLeases?: number;
    ipv4Nat?: boolean;
    ipv4Netmask?: number;
    ipv6Address?: string;
    ipv6Nat?: boolean;
    ipv6Netmask?: number;
    mode: BridgeMode;
    mtu?: number;
    name?: string;
}
export type BridgeMode = "none" | "existing" | "new";
export interface Init {
    networkAddress?: string;
    networkPort?: number;
    storageBackend?: StorageBackend;
    storageCreateDevice?: string;
    storageCreateLoop?: number;
    storagePool?: string;
    trustPassword?: string;
}
export type StorageBackend = "zfs" | "dir" | "lvm" | "btrfs";
export type ManageEtcHostsEnum = "localhost" | "template";
export interface Mcollective {
    conf?: McollectiveConf;
}
export interface McollectiveConf {
    privateCERT?: string;
    publicCERT?: string;
}
export interface MergeHowElement {
    name: Name;
    settings: Setting[];
}
export type Name = "list" | "dict" | "str";
export type Setting = "allow_delete" | "no_replace" | "replace" | "append" | "prepend" | "recurse_dict" | "recurse_list" | "recurse_array" | "recurse_str";
export interface NTP {
    allow?: string[];
    config?: NTPConfig;
    enabled?: boolean;
    ntpClient?: string;
    peers?: string[];
    pools?: string[];
    servers?: string[];
}
export interface NTPConfig {
    checkExe?: string;
    confpath?: string;
    packages?: string[];
    serviceName?: string;
    template?: string;
}
export interface Output {
    all?: string[] | AllClass | string;
    config?: string[] | AllClass | string;
    final?: string[] | AllClass | string;
    init?: string[] | AllClass | string;
}
export interface AllClass {
    error?: string;
    output?: string;
}
export interface PackageClass {
    apt?: Array<string[] | string>;
    snap?: Array<string[] | string>;
}
export interface PhoneHome {
    post?: PostElement[] | "all";
    tries?: number;
    url: string;
}
export type PostElement = "pub_key_rsa" | "pub_key_ecdsa" | "pub_key_ed25519" | "instance_id" | "hostname" | "fqdn";
export interface PowerState {
    condition?: any[] | boolean | string;
    delay?: number | string;
    message?: string;
    mode: PowerStateMode;
    timeout?: number;
}
export type PowerStateMode = "poweroff" | "reboot" | "halt";
export interface Puppet {
    aioInstallURL?: string;
    cleanup?: boolean;
    collection?: string;
    conf?: PuppetConf;
    confFile?: string;
    csrAttributes?: CsrAttributes;
    csrAttributesPath?: string;
    exec?: boolean;
    execArgs?: string[];
    install?: boolean;
    installType?: PuppetInstallType;
    packageName?: string;
    sslDir?: string;
    startService?: boolean;
    version?: string;
}
export interface PuppetConf {
    agent?: {
        [key: string]: any;
    };
    caCERT?: string;
    main?: {
        [key: string]: any;
    };
    server?: {
        [key: string]: any;
    };
    user?: {
        [key: string]: any;
    };
}
export interface CsrAttributes {
    customAttributes?: {
        [key: string]: any;
    };
    extensionRequests?: {
        [key: string]: any;
    };
}
export type PuppetInstallType = "packages" | "aio";
export interface RandomSeed {
    command?: string[];
    commandRequired?: boolean;
    data?: string;
    encoding?: RandomSeedEncoding;
    file?: string;
}
export type RandomSeedEncoding = "raw" | "base64" | "b64" | "gzip" | "gz";
export interface Reporting {
}
export interface ResolvConf {
    domain?: string;
    nameservers?: any[];
    options?: {
        [key: string]: any;
    };
    searchdomains?: any[];
    sortlist?: any[];
}
export interface RhSubscription {
    activationKey?: string;
    addPool?: string[];
    autoAttach?: boolean;
    disableRepo?: string[];
    enableRepo?: string[];
    org?: number | string;
    password?: string;
    rhsmBaseurl?: string;
    serverHostname?: string;
    serviceLevel?: string;
    username?: string;
}
export interface Rsyslog {
    checkExe?: string;
    configDir?: string;
    configFilename?: string;
    configs?: Array<ConfigConfig | string>;
    installRsyslog?: boolean;
    packages?: string[];
    remotes?: {
        [key: string]: any;
    };
    serviceReloadCommand?: string[] | "auto";
}
export interface ConfigConfig {
    content: string;
    filename?: string;
}
export interface SaltMinion {
    conf?: {
        [key: string]: any;
    };
    configDir?: string;
    grains?: {
        [key: string]: any;
    };
    pkgName?: string;
    pkiDir?: string;
    privateKey?: string;
    publicKey?: string;
    serviceName?: string;
}
export interface Snap {
    assertions?: string[] | {
        [key: string]: string;
    };
    commands?: Array<string[] | string> | {
        [key: string]: string[] | string;
    };
}
export interface Spacewalk {
    activationKey?: string;
    proxy?: string;
    server?: string;
}
export interface SSH {
    emitKeysToConsole: boolean;
}
export type SSHGenkeytype = "ecdsa" | "ed25519" | "rsa";
export interface SSHKeys {
}
export interface SSHPublishHostkeys {
    blacklist?: string[];
    enabled?: boolean;
}
export interface Swap {
    filename?: string;
    maxsize?: number | string;
    size?: number | string;
}
export interface UbuntuAdvantage {
    config?: ConfigObject;
    enable?: string[];
    enableBeta?: string[];
    features?: Features;
    token?: string;
}
export interface ConfigObject {
    globalAptHTTPProxy?: null | string;
    globalAptHTTPSProxy?: null | string;
    httpProxy?: null | string;
    httpsProxy?: null | string;
    uaAptHTTPProxy?: null | string;
    uaAptHTTPSProxy?: null | string;
    [property: string]: any;
}
export interface Features {
    disableAutoAttach?: boolean;
}
export interface Updates {
    network?: Network;
}
export interface Network {
    when: When[];
}
export type When = "boot-new-instance" | "boot-legacy" | "boot" | "hotplug";
export interface PurpleSchemaCloudConfigV1 {
    createGroups?: boolean;
    schemaCloudConfigV1CreateGroups?: boolean;
    doas?: string[];
    expiredate?: Date;
    gecos?: string;
    groups?: string[] | {
        [key: string]: any;
    } | string;
    hashedPasswd?: string;
    schemaCloudConfigV1HashedPasswd?: string;
    homedir?: string;
    inactive?: string;
    lockPasswd?: boolean;
    schemaCloudConfigV1LockPasswd?: boolean;
    name?: string;
    noCreateHome?: boolean;
    noLogInit?: boolean;
    noUserGroup?: boolean;
    schemaCloudConfigV1NoCreateHome?: boolean;
    schemaCloudConfigV1NoLogInit?: boolean;
    schemaCloudConfigV1NoUserGroup?: boolean;
    passwd?: string;
    plainTextPasswd?: string;
    schemaCloudConfigV1PlainTextPasswd?: string;
    primaryGroup?: string;
    schemaCloudConfigV1PrimaryGroup?: string;
    selinuxUser?: string;
    schemaCloudConfigV1SelinuxUser?: string;
    shell?: string;
    snapuser?: string;
    sshAuthorizedKeys?: string[];
    sshImportID?: string[];
    sshRedirectUser?: boolean;
    schemaCloudConfigV1SSHAuthorizedKeys?: string[];
    schemaCloudConfigV1SSHImportID?: string[];
    schemaCloudConfigV1SSHRedirectUser?: boolean;
    sudo?: Array<null | string> | boolean | null | string;
    system?: boolean;
    uid?: number | string;
}
export interface FluffySchemaCloudConfigV1 {
    createGroups?: boolean;
    schemaCloudConfigV1CreateGroups?: boolean;
    doas?: string[];
    expiredate?: Date;
    gecos?: string;
    groups?: string[] | {
        [key: string]: any;
    } | string;
    hashedPasswd?: string;
    schemaCloudConfigV1HashedPasswd?: string;
    homedir?: string;
    inactive?: string;
    lockPasswd?: boolean;
    schemaCloudConfigV1LockPasswd?: boolean;
    name?: string;
    noCreateHome?: boolean;
    noLogInit?: boolean;
    noUserGroup?: boolean;
    schemaCloudConfigV1NoCreateHome?: boolean;
    schemaCloudConfigV1NoLogInit?: boolean;
    schemaCloudConfigV1NoUserGroup?: boolean;
    passwd?: string;
    plainTextPasswd?: string;
    schemaCloudConfigV1PlainTextPasswd?: string;
    primaryGroup?: string;
    schemaCloudConfigV1PrimaryGroup?: string;
    selinuxUser?: string;
    schemaCloudConfigV1SelinuxUser?: string;
    shell?: string;
    snapuser?: string;
    sshAuthorizedKeys?: string[];
    sshImportID?: string[];
    sshRedirectUser?: boolean;
    schemaCloudConfigV1SSHAuthorizedKeys?: string[];
    schemaCloudConfigV1SSHImportID?: string[];
    schemaCloudConfigV1SSHRedirectUser?: boolean;
    sudo?: Array<null | string> | boolean | null | string;
    system?: boolean;
    uid?: number | string;
}
export interface VendorData {
    enabled?: boolean | string;
    prefix?: Array<number | string> | string;
}
export interface Wireguard {
    interfaces: Interface[];
    readinessprobe?: string[];
}
export interface Interface {
    configPath?: string;
    content?: string;
    name?: string;
}
export interface WriteFile {
    append?: boolean;
    content?: string;
    defer?: boolean;
    encoding?: WriteFileEncoding;
    owner?: string;
    path: string;
    permissions?: string;
    source?: Source;
}
export type WriteFileEncoding = "gz" | "gzip" | "gz+base64" | "gzip+base64" | "gz+b64" | "gzip+b64" | "b64" | "base64" | "text/plain";
export interface Source {
    headers?: {
        [key: string]: string;
    };
    uri: string;
}
export interface YumRepos {
}
export interface Zypper {
    config?: {
        [key: string]: any;
    };
    repos?: Repo[];
    [property: string]: any;
}
export interface Repo {
    baseurl: string;
    id: string;
    [property: string]: any;
}
export declare class Convert {
    static toCloudConfig(json: string): CloudConfig;
    static cloudConfigToJson(value: CloudConfig): string;
}
