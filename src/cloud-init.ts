// To parse this data:
//
//   import { Convert, CloudConfig } from "./file";
//
//   const cloudConfig = Convert.toCloudConfig(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CloudConfig {
    version?: "v1";
    /**
     * If ``true``, will import the public SSH keys from the datasource's metadata to the user's
     * ``.ssh/authorized_keys`` file. Default: ``true``.
     */
    allowPublicSSHKeys?:  boolean;
    ansible?:             Ansible;
    apkRepos?:            ApkRepos;
    apt?:                 Apt;
    aptPipelining?:       boolean | AnsibleConfig | number;
    aptRebootIfRequired?: boolean;
    aptUpdate?:           boolean;
    aptUpgrade?:          boolean;
    /**
     * The hash type to use when generating SSH fingerprints. Default: ``sha256``.
     */
    authkeyHash?: string;
    /**
     * Cloud-init ignores this key and its values. It is used by Subiquity, the Ubuntu
     * Autoinstaller. See: https://ubuntu.com/server/docs/install/autoinstall-reference.
     */
    autoinstall?:        Autoinstall;
    bootcmd?:            Array<string[] | string>;
    byobuByDefault?:     ByobuByDefault;
    caCerts?:            CACerts;
    cloudConfigCACerts?: CACerts;
    chef?:               Chef;
    chpasswd?:           Chpasswd;
    cloudConfigModules?: Array<any[] | CloudConfigModuleEnum>;
    cloudFinalModules?:  Array<any[] | CloudConfigModuleEnum>;
    cloudInitModules?:   Array<any[] | CloudConfigModuleEnum>;
    /**
     * If ``false``, the hostname file (e.g. /etc/hostname) will not be created if it does not
     * exist. On systems that use systemd, setting create_hostname_file to ``false`` will set
     * the hostname transiently. If ``true``, the hostname file will always be created and the
     * hostname will be set statically on systemd systems. Default: ``true``.
     */
    createHostnameFile?: boolean;
    deviceAliases?:      DeviceAliases;
    /**
     * Set true to disable IPv4 routes to EC2 metadata. Default: ``false``.
     */
    disableEc2Metadata?: boolean;
    /**
     * Disable root login. Default: ``true``.
     */
    disableRoot?: boolean;
    /**
     * Disable root login options.  If **disable_root_opts** is specified and contains the
     * string ``$USER``, it will be replaced with the username of the default user. Default:
     * ``no-port-forwarding,no-agent-forwarding,no-X11-forwarding,command="echo 'Please login as
     * the user \"$USER\" rather than the user \"$DISABLE_USER\".';echo;sleep 10;exit 142"``.
     */
    disableRootOpts?: string;
    diskSetup?:       DiskSetup;
    drivers?:         Drivers;
    fan?:             Fan;
    /**
     * The message to display at the end of the run.
     */
    finalMessage?: string;
    /**
     * The fully qualified domain name to set.
     *
     * Optional fully qualified domain name to use when updating ``/etc/hosts``. Preferred over
     * **hostname** if both are provided. In absence of **hostname** and **fqdn** in
     * cloud-config, the ``local-hostname`` value will be used from datasource metadata.
     */
    fqdn?:                string;
    fsSetup?:             FSSetup[];
    groups?:              any[] | GroupsClass | string;
    growpart?:            Growpart;
    grubDpkg?:            { [key: string]: any };
    cloudConfigGrubDpkg?: GrubDpkg;
    /**
     * The hostname to set.
     *
     * Hostname to set when rendering ``/etc/hosts``. If **fqdn** is set, the hostname extracted
     * from **fqdn** overrides **hostname**.
     */
    hostname?:  string;
    keyboard?:  Keyboard;
    landscape?: Landscape;
    /**
     * The launch index for the specified cloud-config.
     */
    launchIndex?: number;
    /**
     * The locale to set as the system's locale (e.g. ar_PS).
     */
    locale?: boolean | string;
    /**
     * The file in which to write the locale configuration (defaults to the distro's default
     * location).
     */
    localeConfigfile?: string;
    lxd?:              Lxd;
    /**
     * Whether to manage ``/etc/hosts`` on the system. If ``true``, render the hosts file using
     * ``/etc/cloud/templates/hosts.tmpl`` replacing ``$hostname`` and ``$fdqn``. If
     * ``localhost``, append a ``127.0.1.1`` entry that resolves from FQDN and hostname every
     * boot. Default: ``false``.
     */
    manageEtcHosts?: boolean | ManageEtcHostsEnum;
    /**
     * Whether to manage the resolv.conf file. **resolv_conf** block will be ignored unless this
     * is set to ``true``. Default: ``false``.
     */
    manageResolvConf?: boolean;
    mcollective?:      Mcollective;
    mergeHow?:         MergeHowElement[] | string;
    mergeType?:        MergeHowElement[] | string;
    migrate?:          any;
    /**
     * Default mount configuration for any mount entry with less than 6 options provided. When
     * specified, 6 items are required and represent ``/etc/fstab`` entries. Default:
     * ``defaults,nofail,x-systemd.after=cloud-init-network.service,_netdev``.
     */
    mountDefaultFields?: Array<null | string>;
    /**
     * List of lists. Each inner list entry is a list of ``/etc/fstab`` mount declarations of
     * the format: [ fs_spec, fs_file, fs_vfstype, fs_mntops, fs-freq, fs_passno ]. A mount
     * declaration with less than 6 items will get remaining values from
     * **mount_default_fields**. A mount declaration with only `fs_spec` and no `fs_file`
     * mountpoint will be skipped.
     */
    mounts?: Array<string[]>;
    /**
     * If true, SSH fingerprints will not be written. Default: ``false``.
     */
    noSSHFingerprints?: boolean;
    ntp?:               NTP | null;
    output?:            Output;
    /**
     * Set ``true`` to reboot the system if required by presence of `/var/run/reboot-required`.
     * Default: ``false``.
     */
    packageRebootIfRequired?: boolean;
    /**
     * Set ``true`` to update packages. Happens before upgrade or install. Default: ``false``.
     */
    packageUpdate?: boolean;
    /**
     * Set ``true`` to upgrade packages. Happens before install. Default: ``false``.
     */
    packageUpgrade?: boolean;
    /**
     * An array containing either a package specification, or an object consisting of a package
     * manager key having a package specification value . A package specification can be either
     * a package name or a list with two entries, the first being the package name and the
     * second being the specific package version to install.
     */
    packages?: Array<string[] | PackageClass | string>;
    /**
     * Set the default user's password. Ignored if **chpasswd** ``list`` is used.
     */
    password?:   string;
    phoneHome?:  PhoneHome;
    powerState?: PowerState;
    /**
     * If true, the fqdn will be used if it is set. If false, the hostname will be used. If
     * unset, the result is distro-dependent.
     *
     * By default, it is distro-dependent whether cloud-init uses the short hostname or fully
     * qualified domain name when both ``local-hostname` and ``fqdn`` are both present in
     * instance metadata. When set ``true``, use fully qualified domain name if present as
     * hostname instead of short hostname. When set ``false``, use **hostname** config value if
     * present, otherwise fallback to **fqdn**.
     */
    preferFQDNOverHostname?: boolean;
    /**
     * If true, the hostname will not be changed. Default: ``false``.
     *
     * Do not update system hostname when ``true``. Default: ``false``.
     */
    preserveHostname?: boolean;
    puppet?:           Puppet;
    randomSeed?:       RandomSeed;
    reporting?:        Reporting;
    /**
     * Whether to resize the root partition. ``noblock`` will resize in the background. Default:
     * ``true``.
     */
    resizeRootfs?:   boolean | "noblock";
    resolvConf?:     ResolvConf;
    rhSubscription?: RhSubscription;
    rsyslog?:        Rsyslog;
    runcmd?:         Array<string[] | null | string>;
    saltMinion?:     SaltMinion;
    snap?:           Snap;
    spacewalk?:      Spacewalk;
    ssh?:            SSH;
    /**
     * The SSH public keys to add ``.ssh/authorized_keys`` in the default user's home directory.
     */
    sshAuthorizedKeys?: string[];
    /**
     * Remove host SSH keys. This prevents re-use of a private host key from an image with
     * default host SSH keys. Default: ``true``.
     */
    sshDeletekeys?: boolean;
    /**
     * Avoid printing matching SSH fingerprints to the system console.
     */
    sshFPConsoleBlacklist?: string[];
    /**
     * The SSH key types to generate. Default: ``[rsa, ecdsa, ed25519]``.
     */
    sshGenkeytypes?: SSHGenkeytype[];
    sshImportID?:    string[];
    /**
     * Avoid printing matching SSH key types to the system console.
     */
    sshKeyConsoleBlacklist?: string[];
    /**
     * A dictionary entries for the public and private host keys of each desired key type.
     * Entries in the **ssh_keys** config dict should have keys in the format ``<key
     * type>_private``, ``<key type>_public``, and, optionally, ``<key type>_certificate``, e.g.
     * ``rsa_private: <key>``, ``rsa_public: <key>``, and ``rsa_certificate: <key>``. Not all
     * key types have to be specified, ones left unspecified will not be used. If this config
     * option is used, then separate keys will not be automatically generated. In order to
     * specify multi-line private host keys and certificates, use YAML multi-line syntax.
     * **Note:** Your ssh keys might possibly be visible to unprivileged users on your system,
     * depending on your cloud's security model.
     */
    sshKeys?:            SSHKeys;
    sshPublishHostkeys?: SSHPublishHostkeys;
    /**
     * Sets whether or not to accept password authentication. ``true`` will enable password
     * auth. ``false`` will disable. Default: leave the value unchanged. In order for this
     * config to be applied, SSH may need to be restarted. On systemd systems, this restart will
     * only happen if the SSH service has already been started. On non-systemd systems, a
     * restart will be attempted regardless of the service state.
     */
    sshPwauth?: boolean | string;
    /**
     * If ``true``, will suppress the output of key generation to the console. Default:
     * ``false``.
     */
    sshQuietKeygen?: boolean;
    swap?:           Swap;
    systemInfo?:     { [key: string]: any };
    /**
     * The timezone to use as represented in /usr/share/zoneinfo.
     */
    timezone?:        string;
    ubuntuAdvantage?: UbuntuAdvantage;
    ubuntuPro?:       UbuntuAdvantage;
    updates?:         Updates;
    /**
     * The **user** dictionary values override the **default_user** configuration from
     * ``/etc/cloud/cloud.cfg``. The **user** dictionary keys supported for the default_user are
     * the same as the **users** schema.
     */
    user?:       PurpleSchemaCloudConfigV1 | string;
    users?:      Array<string[] | FluffySchemaCloudConfigV1 | string> | { [key: string]: any } | string;
    vendorData?: VendorData;
    wireguard?:  Wireguard | null;
    writeFiles?: WriteFile[];
    /**
     * The repo parts directory where individual yum repo config files will be written. Default:
     * ``/etc/yum.repos.d``.
     */
    yumRepoDir?: string;
    yumRepos?:   YumRepos;
    zypper?:     Zypper;
}

export interface Ansible {
    /**
     * Sets the ANSIBLE_CONFIG environment variable. If set, overrides default config.
     */
    ansibleConfig?: string;
    galaxy?:        Galaxy;
    /**
     * The type of installation for ansible. It can be one of the following values:
     * -  ``distro``
     * -  ``pip``.
     */
    installMethod?: InstallMethod;
    packageName?:   string;
    pull?:          Pull;
    /**
     * User to run module commands as. If install_method: pip, the pip install runs as this user
     * as well.
     */
    runUser?:         string;
    setupController?: SetupController;
}

export interface Galaxy {
    actions: Array<string[]>;
}

/**
 * The type of installation for ansible. It can be one of the following values:
 * -  ``distro``
 * -  ``pip``.
 */
export type InstallMethod = "distro" | "pip";

export interface Pull {
    acceptHostKey?:     boolean;
    checkout?:          string;
    clean?:             boolean;
    connection?:        string;
    diff?:              boolean;
    full?:              boolean;
    inventory?:         string;
    moduleName?:        string;
    modulePath?:        string;
    playbookName:       string;
    privateKey?:        string;
    scpExtraArgs?:      string;
    sftpExtraArgs?:     string;
    skipTags?:          string;
    sleep?:             string;
    sshCommonArgs?:     string;
    tags?:              string;
    timeout?:           string;
    url:                string;
    vaultID?:           string;
    vaultPasswordFile?: string;
    verifyCommit?:      boolean;
}

export interface SetupController {
    repositories?: Repository[];
    runAnsible?:   RunAnsible[];
}

export interface Repository {
    path:   string;
    source: string;
}

export interface RunAnsible {
    args?:                   string;
    background?:             number;
    becomePasswordFile?:     string;
    check?:                  boolean;
    connection?:             string;
    connectionPasswordFile?: string;
    diff?:                   boolean;
    extraVars?:              string;
    forks?:                  number;
    inventory?:              string;
    listHosts?:              boolean;
    moduleName?:             string;
    modulePath?:             string;
    playbookDir?:            string;
    playbookName?:           string;
    poll?:                   number;
    privateKey?:             string;
    scpExtraArgs?:           string;
    sftpExtraArgs?:          string;
    skipTags?:               string;
    sleep?:                  string;
    syntaxCheck?:            boolean;
    tags?:                   string;
    timeout?:                number;
    vaultID?:                string;
    vaultPasswordFile?:      string;
    [property: string]: any;
}

export interface ApkRepos {
    alpineRepo?: AlpineRepo | null;
    /**
     * The base URL of an Alpine repository containing unofficial packages.
     */
    localRepoBaseURL?: string;
    /**
     * By default, cloud-init will generate a new repositories file ``/etc/apk/repositories``
     * based on any valid configuration settings specified within a apk_repos section of cloud
     * config. To disable this behavior and preserve the repositories file from the pristine
     * image, set **preserve_repositories** to ``true``.
     * The **preserve_repositories** option overrides all other config keys that would alter
     * ``/etc/apk/repositories``.
     */
    preserveRepositories?: boolean;
}

export interface AlpineRepo {
    /**
     * The base URL of an Alpine repository, or mirror, to download official packages from. If
     * not specified then it defaults to ``https://alpine.global.ssl.fastly.net/alpine``.
     */
    baseURL?: string;
    /**
     * Whether to add the Community repo to the repositories file. By default the Community repo
     * is not included.
     */
    communityEnabled?: boolean;
    /**
     * Whether to add the Testing repo to the repositories file. By default the Testing repo is
     * not included. It is only recommended to use the Testing repo on a machine running the
     * ``Edge`` version of Alpine as packages installed from Testing may have dependencies that
     * conflict with those in non-Edge Main or Community repos.
     */
    testingEnabled?: boolean;
    /**
     * The Alpine version to use (e.g. ``v3.12`` or ``edge``).
     */
    version: string;
}

export interface Apt {
    /**
     * All source entries in ``apt-sources`` that match regex in **add_apt_repo_match** will be
     * added to the system using ``add-apt-repository``. If **add_apt_repo_match** is not
     * specified, it defaults to ``^[\w-]+:\w``.
     */
    addAptRepoMatch?: string;
    /**
     * Specify configuration for apt, such as proxy configuration. This configuration is
     * specified as a string. For multi-line APT configuration, make sure to follow YAML syntax.
     */
    conf?: string;
    /**
     * Debconf additional configurations can be specified as a dictionary under the
     * **debconf_selections** config key, with each key in the dict representing a different set
     * of configurations. The value of each key must be a string containing all the debconf
     * configurations that must be applied. We will bundle all of the values and pass them to
     * **debconf-set-selections**. Therefore, each value line must be a valid entry for
     * ``debconf-set-selections``, meaning that they must possess for distinct fields:
     *
     * ``pkgname question type answer``
     *
     * Where:
     * - ``pkgname`` is the name of the package.
     * - ``question`` the name of the questions.
     * - ``type`` is the type of question.
     * - ``answer`` is the value used to answer the question.
     *
     * For example: ``ippackage ippackage/ip string 127.0.01``.
     */
    debconfSelections?: DebconfSelections;
    /**
     * Entries in the sources list can be disabled using **disable_suites**, which takes a list
     * of suites to be disabled. If the string ``$RELEASE`` is present in a suite in the
     * **disable_suites** list, it will be replaced with the release name. If a suite specified
     * in **disable_suites** is not present in ``sources.list`` it will be ignored. For
     * convenience, several aliases are provided for **disable_suites**:
     * - ``updates`` => ``$RELEASE-updates``
     * - ``backports`` => ``$RELEASE-backports``
     * - ``security`` => ``$RELEASE-security``
     * - ``proposed`` => ``$RELEASE-proposed``
     * - ``release`` => ``$RELEASE``.
     *
     * When a suite is disabled using **disable_suites**, its entry in ``sources.list`` is not
     * deleted; it is just commented out.
     */
    disableSuites?: string[];
    /**
     * More convenient way to specify ftp APT proxy. ftp proxy url is specified in the format
     * ``ftp://[[user][:pass]@]host[:port]/``.
     */
    ftpProxy?: string;
    /**
     * More convenient way to specify http APT proxy. http proxy url is specified in the format
     * ``http://[[user][:pass]@]host[:port]/``.
     */
    httpProxy?: string;
    /**
     * More convenient way to specify https APT proxy. https proxy url is specified in the
     * format ``https://[[user][:pass]@]host[:port]/``.
     */
    httpsProxy?: string;
    /**
     * By default, cloud-init will generate a new sources list in ``/etc/apt/sources.list.d``
     * based on any changes specified in cloud config. To disable this behavior and preserve the
     * sources list from the pristine image, set **preserve_sources_list** to ``true``.
     *
     * The **preserve_sources_list** option overrides all other config keys that would alter
     * ``sources.list`` or ``sources.list.d``, **except** for additional sources to be added to
     * ``sources.list.d``.
     */
    preserveSourcesList?: boolean;
    /**
     * The primary and security archive mirrors can be specified using the **primary** and
     * **security** keys, respectively. Both the **primary** and **security** keys take a list
     * of configs, allowing mirrors to be specified on a per-architecture basis. Each config is
     * a dictionary which must have an entry for **arches**, specifying which architectures that
     * config entry is for. The keyword ``default`` applies to any architecture not explicitly
     * listed. The mirror url can be specified with the **uri** key, or a list of mirrors to
     * check can be provided in order, with the first mirror that can be resolved being
     * selected. This allows the same configuration to be used in different environment, with
     * different hosts used for a local APT mirror. If no mirror is provided by **uri** or
     * **search**, **search_dns** may be used to search for dns names in the format
     * ``<distro>-mirror`` in each of the following:
     * - fqdn of this host per cloud metadata,
     * - localdomain,
     * - domains listed in ``/etc/resolv.conf``.
     *
     * If there is a dns entry for ``<distro>-mirror``, then it is assumed that there is a
     * distro mirror at ``http://<distro>-mirror.<domain>/<distro>``. If the **primary** key is
     * defined, but not the **security** key, then then configuration for **primary** is also
     * used for **security**. If **search_dns** is used for the **security** key, the search
     * pattern will be ``<distro>-security-mirror``.
     *
     * Each mirror may also specify a key to import via any of the following optional keys:
     * - **keyid**: a key to import via shortid or fingerprint.
     * - **key**: a raw PGP key.
     * - **keyserver**: alternate keyserver to pull **keyid** key from.
     *
     * If no mirrors are specified, or all lookups fail, then default mirrors defined in the
     * datasource are used. If none are present in the datasource either the following defaults
     * are used:
     * - **primary** => ``http://archive.ubuntu.com/ubuntu``.
     * - **security** => ``http://security.ubuntu.com/ubuntu``.
     */
    primary?: PrimaryElement[];
    /**
     * Alias for defining a http APT proxy.
     */
    proxy?: string;
    /**
     * Please refer to the primary config documentation.
     */
    security?: PrimaryElement[];
    /**
     * Source list entries can be specified as a dictionary under the **sources** config key,
     * with each key in the dict representing a different source file. The key of each source
     * entry will be used as an id that can be referenced in other config entries, as well as
     * the filename for the source's configuration under ``/etc/apt/sources.list.d``. If the
     * name does not end with ``.list``, it will be appended. If there is no configuration for a
     * key in **sources**, no file will be written, but the key may still be referred to as an
     * id in other **sources** entries.
     *
     * Each entry under **sources** is a dictionary which may contain any of the following
     * optional keys:
     * - **source**: a sources.list entry (some variable replacements apply).
     * - **keyid**: a key to import via shortid or fingerprint.
     * - **key**: a raw PGP key.
     * - **keyserver**: alternate keyserver to pull **keyid** key from.
     * - **filename**: specify the name of the list file.
     * - **append**: If ``true``, append to sources file, otherwise overwrite it. Default:
     * ``true``.
     *
     * The **source** key supports variable replacements for the following strings:
     * - ``$MIRROR``
     * - ``$PRIMARY``
     * - ``$SECURITY``
     * - ``$RELEASE``
     * - ``$KEY_FILE``
     */
    sources?: Sources;
    /**
     * Specifies a custom template for rendering ``sources.list`` . If no **sources_list**
     * template is given, cloud-init will use sane default. Within this template, the following
     * strings will be replaced with the appropriate values:
     * - ``$MIRROR``
     * - ``$RELEASE``
     * - ``$PRIMARY``
     * - ``$SECURITY``
     * - ``$KEY_FILE``
     */
    sourcesList?: string;
}

/**
 * Debconf additional configurations can be specified as a dictionary under the
 * **debconf_selections** config key, with each key in the dict representing a different set
 * of configurations. The value of each key must be a string containing all the debconf
 * configurations that must be applied. We will bundle all of the values and pass them to
 * **debconf-set-selections**. Therefore, each value line must be a valid entry for
 * ``debconf-set-selections``, meaning that they must possess for distinct fields:
 *
 * ``pkgname question type answer``
 *
 * Where:
 * - ``pkgname`` is the name of the package.
 * - ``question`` the name of the questions.
 * - ``type`` is the type of question.
 * - ``answer`` is the value used to answer the question.
 *
 * For example: ``ippackage ippackage/ip string 127.0.01``.
 */
export interface DebconfSelections {
}

/**
 * The primary and security archive mirrors can be specified using the **primary** and
 * **security** keys, respectively. Both the **primary** and **security** keys take a list
 * of configs, allowing mirrors to be specified on a per-architecture basis. Each config is
 * a dictionary which must have an entry for **arches**, specifying which architectures that
 * config entry is for. The keyword ``default`` applies to any architecture not explicitly
 * listed. The mirror url can be specified with the **uri** key, or a list of mirrors to
 * check can be provided in order, with the first mirror that can be resolved being
 * selected. This allows the same configuration to be used in different environment, with
 * different hosts used for a local APT mirror. If no mirror is provided by **uri** or
 * **search**, **search_dns** may be used to search for dns names in the format
 * ``<distro>-mirror`` in each of the following:
 * - fqdn of this host per cloud metadata,
 * - localdomain,
 * - domains listed in ``/etc/resolv.conf``.
 *
 * If there is a dns entry for ``<distro>-mirror``, then it is assumed that there is a
 * distro mirror at ``http://<distro>-mirror.<domain>/<distro>``. If the **primary** key is
 * defined, but not the **security** key, then then configuration for **primary** is also
 * used for **security**. If **search_dns** is used for the **security** key, the search
 * pattern will be ``<distro>-security-mirror``.
 *
 * Each mirror may also specify a key to import via any of the following optional keys:
 * - **keyid**: a key to import via shortid or fingerprint.
 * - **key**: a raw PGP key.
 * - **keyserver**: alternate keyserver to pull **keyid** key from.
 *
 * If no mirrors are specified, or all lookups fail, then default mirrors defined in the
 * datasource are used. If none are present in the datasource either the following defaults
 * are used:
 * - **primary** => ``http://archive.ubuntu.com/ubuntu``.
 * - **security** => ``http://security.ubuntu.com/ubuntu``.
 */
export interface PrimaryElement {
    arches:     string[];
    key?:       string;
    keyid?:     string;
    keyserver?: string;
    search?:    string[];
    searchDNS?: boolean;
    uri?:       string;
}

/**
 * Source list entries can be specified as a dictionary under the **sources** config key,
 * with each key in the dict representing a different source file. The key of each source
 * entry will be used as an id that can be referenced in other config entries, as well as
 * the filename for the source's configuration under ``/etc/apt/sources.list.d``. If the
 * name does not end with ``.list``, it will be appended. If there is no configuration for a
 * key in **sources**, no file will be written, but the key may still be referred to as an
 * id in other **sources** entries.
 *
 * Each entry under **sources** is a dictionary which may contain any of the following
 * optional keys:
 * - **source**: a sources.list entry (some variable replacements apply).
 * - **keyid**: a key to import via shortid or fingerprint.
 * - **key**: a raw PGP key.
 * - **keyserver**: alternate keyserver to pull **keyid** key from.
 * - **filename**: specify the name of the list file.
 * - **append**: If ``true``, append to sources file, otherwise overwrite it. Default:
 * ``true``.
 *
 * The **source** key supports variable replacements for the following strings:
 * - ``$MIRROR``
 * - ``$PRIMARY``
 * - ``$SECURITY``
 * - ``$RELEASE``
 * - ``$KEY_FILE``
 */
export interface Sources {
}

/**
 * Optional command to run to create the filesystem. Can include string substitutions of the
 * other **fs_setup** config keys. This is only necessary if you need to override the
 * default command.
 *
 * Optional options to pass to the filesystem creation command. Ignored if you using **cmd**
 * directly.
 *
 * Properly-signed snap assertions which will run before and snap **commands**.
 *
 * The SSH public key to import.
 *
 * A filepath operation configuration. This is a string containing a filepath and an
 * optional leading operator: '>', '>>' or '|'. Operators '>' and '>>' indicate whether to
 * overwrite or append to the file. The operator '|' redirects content to the command
 * arguments specified.
 *
 * A list specifying filepath operation configuration for stdout and stderror.
 */
export type AnsibleConfig = "os" | "none" | "unchanged";

/**
 * Cloud-init ignores this key and its values. It is used by Subiquity, the Ubuntu
 * Autoinstaller. See: https://ubuntu.com/server/docs/install/autoinstall-reference.
 */
export interface Autoinstall {
    version: number;
    [property: string]: any;
}

export type ByobuByDefault = "enable-system" | "enable-user" | "disable-system" | "disable-user" | "enable" | "disable" | "user" | "system";

export interface CACerts {
    removeDefaults?: boolean;
    /**
     * Remove default CA certificates if true. Default: ``false``.
     */
    caCertsRemoveDefaults?: boolean;
    /**
     * List of trusted CA certificates to add.
     */
    trusted?: string[];
}

export interface Chef {
    /**
     * string that indicates if user accepts or not license related to some of chef products.
     * See https://docs.chef.io/licensing/accept/.
     */
    chefLicense?: ChefLicense;
    /**
     * Optional path for client_cert. Default: ``/etc/chef/client.pem``.
     */
    clientKey?: string;
    /**
     * Optional path for Chef configuration file. Default: ``/etc/chef/client.rb``
     */
    configPath?: string;
    /**
     * Create the necessary directories for chef to run. By default, it creates the following
     * directories:
     * - ``/etc/chef``
     * - ``/var/log/chef``
     * - ``/var/lib/chef``
     * - ``/var/chef/cache``
     * - ``/var/backups/chef``
     * - ``/var/run/chef``
     */
    directories?: string[];
    /**
     * Specifies the location of the secret key used by chef to encrypt data items. By default,
     * this path is set to null, meaning that chef will have to look at the path
     * ``/etc/chef/encrypted_data_bag_secret`` for it.
     */
    encryptedDataBagSecret?: string;
    /**
     * Specifies which environment chef will use. By default, it will use the ``_default``
     * configuration.
     */
    environment?: string;
    /**
     * Set true if we should run or not run chef (defaults to false, unless a gem installed is
     * requested where this will then default to true).
     */
    exec?: boolean;
    /**
     * Specifies the location in which backup files are stored. By default, it uses the
     * ``/var/backups/chef`` location.
     */
    fileBackupPath?: string;
    /**
     * Specifies the location in which chef cache files will be saved. By default, it uses the
     * ``/var/chef/cache`` location.
     */
    fileCachePath?: string;
    /**
     * Path to write run_list and initial_attributes keys that should also be present in this
     * configuration. Default: ``/etc/chef/firstboot.json``.
     */
    firstbootPath?: string;
    /**
     * If set to ``true``, forces chef installation, even if it is already installed.
     */
    forceInstall?: boolean;
    /**
     * Specify a list of initial attributes used by the cookbooks.
     */
    initialAttributes?: { [key: string]: any };
    /**
     * The type of installation for chef. It can be one of the following values:
     * - ``packages``
     * - ``gems``
     * - ``omnibus``
     */
    installType?: ChefInstallType;
    /**
     * Specifies the location in which some chef json data is stored. By default, it uses the
     * ``/etc/chef/firstboot.json`` location.
     */
    jsonAttribs?: string;
    /**
     * Defines the level of logging to be stored in the log file. By default this value is set
     * to ``:info``.
     */
    logLevel?: string;
    /**
     * Specifies the location of the chef log file. By default, the location is specified at
     * ``/var/log/chef/client.log``.
     */
    logLocation?: string;
    /**
     * The name of the node to run. By default, we will use th instance id as the node name.
     */
    nodeName?: string;
    /**
     * Omnibus URL if chef should be installed through Omnibus. By default, it uses the
     * ``https://www.chef.io/chef/install.sh``.
     */
    omnibusURL?: string;
    /**
     * The number of retries that will be attempted to reach the Omnibus URL. Default: ``5``.
     */
    omnibusURLRetries?: number;
    /**
     * Optional version string to require for omnibus install.
     */
    omnibusVersion?: string;
    /**
     * The location in which a process identification number (pid) is saved. By default, it
     * saves in the ``/var/run/chef/client.pid`` location.
     */
    pidFile?: string;
    /**
     * A run list for a first boot json.
     */
    runList?: string[];
    /**
     * The URL for the chef server.
     */
    serverURL?: string;
    /**
     * Show time in chef logs.
     */
    showTime?: boolean;
    /**
     * Set the verify mode for HTTPS requests. We can have two possible values for this
     * parameter:
     * - ``:verify_none``: No validation of SSL certificates.
     * - ``:verify_peer``: Validate all SSL certificates.
     *
     * By default, the parameter is set as ``:verify_none``.
     */
    sslVerifyMode?: string;
    /**
     * Optional string to be written to file validation_key. Special value ``system`` means set
     * use existing file.
     */
    validationCERT?: string;
    /**
     * Optional path for validation_cert. Default: ``/etc/chef/validation.pem``.
     */
    validationKey?: string;
    /**
     * The name of the chef-validator key that Chef Infra Client uses to access the Chef Infra
     * Server during the initial Chef Infra Client run.
     */
    validationName?: string;
}

/**
 * string that indicates if user accepts or not license related to some of chef products.
 * See https://docs.chef.io/licensing/accept/.
 */
export type ChefLicense = "accept" | "accept-silent" | "accept-no-persist";

/**
 * The type of installation for chef. It can be one of the following values:
 * - ``packages``
 * - ``gems``
 * - ``omnibus``
 */
export type ChefInstallType = "packages" | "gems" | "omnibus";

export interface Chpasswd {
    /**
     * Whether to expire all user passwords such that a password will need to be reset on the
     * user's next login. Default: ``true``.
     */
    expire?: boolean;
    list?:   string[] | string;
    /**
     * This key represents a list of existing users to set passwords for. Each item under users
     * contains the following required keys: **name** and **password** or in the case of a
     * randomly generated password, **name** and **type**. The **type** key has a default value
     * of ``hash``, and may alternatively be set to ``text`` or ``RANDOM``. Randomly generated
     * passwords may be insecure, use at your own risk.
     */
    users?: UserClass[];
}

export interface UserClass {
    name:      string;
    type?:     Type;
    password?: string;
}

export type Type = "RANDOM" | "hash" | "text";

export interface GrubDpkg {
    /**
     * Whether to configure which device is used as the target for grub installation. Default:
     * ``false``.
     */
    enabled?: boolean;
    /**
     * Partition to use as target for grub installation. If unspecified, ``grub-probe`` of
     * ``/boot/efi`` will be used to find the partition.
     */
    grubEFIInstallDevices?: string;
    /**
     * Device to use as target for grub installation. If unspecified, ``grub-probe`` of
     * ``/boot`` will be used to find the device.
     */
    grubPCInstallDevices?: string;
    /**
     * Sets values for **grub-pc/install_devices_empty**. If unspecified, will be set to
     * ``true`` if **grub-pc/install_devices** is empty, otherwise ``false``.
     */
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
    /**
     * Do you accept the NVIDIA driver license?
     */
    licenseAccepted: boolean;
    /**
     * The version of the driver to install (e.g. "390", "410"). Default: latest version.
     */
    version?: string;
}

export interface Fan {
    /**
     * The fan configuration to use as a single multi-line string.
     */
    config: string;
    /**
     * The path to write the fan configuration to. Default: ``/etc/network/fan``.
     */
    configPath?: string;
}

export interface FSSetup {
    /**
     * Optional command to run to create the filesystem. Can include string substitutions of the
     * other **fs_setup** config keys. This is only necessary if you need to override the
     * default command.
     */
    cmd?: string[] | string;
    /**
     * Specified either as a path or as an alias in the format ``<alias name>.<y>`` where
     * ``<y>`` denotes the partition number on the device. If specifying device using the
     * ``<alias name>.<partition number>`` format, the value of **partition** will be
     * overwritten.
     */
    device?: string;
    /**
     * Optional options to pass to the filesystem creation command. Ignored if you using **cmd**
     * directly.
     */
    extraOpts?: string[] | string;
    /**
     * Filesystem type to create. E.g., ``ext4`` or ``btrfs``.
     */
    filesystem?: string;
    /**
     * Label for the filesystem.
     */
    label?: string;
    /**
     * If ``true``, overwrite any existing filesystem. Using ``overwrite: true`` for filesystems
     * is **dangerous** and can lead to data loss, so double check the entry in **fs_setup**.
     * Default: ``false``.
     */
    overwrite?: boolean;
    /**
     * The partition can be specified by setting **partition** to the desired partition number.
     * The **partition** option may also be set to ``auto``, in which this module will search
     * for the existence of a filesystem matching the **label**, **filesystem** and **device**
     * of the **fs_setup** entry and will skip creating the filesystem if one is found. The
     * **partition** option may also be set to ``any``, in which case any filesystem that
     * matches **filesystem** and **device** will cause this module to skip filesystem creation
     * for the **fs_setup** entry, regardless of **label** matching or not. To write a
     * filesystem directly to a device, use ``partition: none``. ``partition: none`` will
     * **always** write the filesystem, even when the **label** and **filesystem** are matched,
     * and ``overwrite`` is ``false``.
     */
    partition?: PartitionEnum;
    /**
     * Ignored unless **partition** is ``auto`` or ``any``. Default ``false``.
     */
    replaceFS?: string;
}

/**
 * The partition can be specified by setting **partition** to the desired partition number.
 * The **partition** option may also be set to ``auto``, in which this module will search
 * for the existence of a filesystem matching the **label**, **filesystem** and **device**
 * of the **fs_setup** entry and will skip creating the filesystem if one is found. The
 * **partition** option may also be set to ``any``, in which case any filesystem that
 * matches **filesystem** and **device** will cause this module to skip filesystem creation
 * for the **fs_setup** entry, regardless of **label** matching or not. To write a
 * filesystem directly to a device, use ``partition: none``. ``partition: none`` will
 * **always** write the filesystem, even when the **label** and **filesystem** are matched,
 * and ``overwrite`` is ``false``.
 *
 * Optional command to run to create the filesystem. Can include string substitutions of the
 * other **fs_setup** config keys. This is only necessary if you need to override the
 * default command.
 *
 * Optional options to pass to the filesystem creation command. Ignored if you using **cmd**
 * directly.
 *
 * Properly-signed snap assertions which will run before and snap **commands**.
 *
 * The SSH public key to import.
 *
 * A filepath operation configuration. This is a string containing a filepath and an
 * optional leading operator: '>', '>>' or '|'. Operators '>' and '>>' indicate whether to
 * overwrite or append to the file. The operator '|' redirects content to the command
 * arguments specified.
 *
 * A list specifying filepath operation configuration for stdout and stderror.
 */
export type PartitionEnum = "auto" | "any" | "none";

export interface GroupsClass {
}

export interface Growpart {
    /**
     * The devices to resize. Each entry can either be the path to the device's mountpoint in
     * the filesystem or a path to the block device in '/dev'. Default: ``[/]``.
     */
    devices?: string[];
    /**
     * If ``true``, ignore the presence of ``/etc/growroot-disabled``. If ``false`` and the file
     * exists, then don't resize. Default: ``false``.
     */
    ignoreGrowrootDisabled?: boolean;
    /**
     * The utility to use for resizing. Default: ``auto``
     *
     * Possible options:
     *
     * * ``auto`` - Use any available utility
     *
     * * ``growpart`` - Use growpart utility
     *
     * * ``gpart`` - Use BSD gpart utility
     *
     * * ``'off'`` - Take no action.
     */
    mode?: boolean | ModeMode;
}

export type ModeMode = "auto" | "growpart" | "gpart" | "off";

export interface Keyboard {
    /**
     * Required. Keyboard layout. Corresponds to XKBLAYOUT.
     */
    layout: string;
    /**
     * Optional. Keyboard model. Corresponds to XKBMODEL. Default: ``pc105``.
     */
    model?: string;
    /**
     * Optional. Keyboard options. Corresponds to XKBOPTIONS.
     */
    options?: string;
    /**
     * Required for Alpine Linux, optional otherwise. Keyboard variant. Corresponds to
     * XKBVARIANT.
     */
    variant?: string;
}

export interface Landscape {
    client: Client;
}

export interface Client {
    /**
     * The account this computer belongs to.
     */
    accountName: string;
    /**
     * The title of this computer.
     */
    computerTitle: string;
    /**
     * The directory to store data files in. Default: ``/var/lib/land‐scape/client/``.
     */
    dataPath?: string;
    /**
     * The URL of the HTTP proxy, if one is needed.
     */
    httpProxy?: string;
    /**
     * The URL of the HTTPS proxy, if one is needed.
     */
    httpsProxy?: string;
    /**
     * The log level for the client. Default: ``info``.
     */
    logLevel?: LogLevel;
    /**
     * The URL to perform lightweight exchange initiation with. Default:
     * ``https://landscape.canonical.com/ping``.
     */
    pingURL?: string;
    /**
     * The account-wide key used for registering clients.
     */
    registrationKey?: string;
    /**
     * Comma separated list of tag names to be sent to the server.
     */
    tags?: string;
    /**
     * The Landscape server URL to connect to. Default:
     * ``https://landscape.canonical.com/message-system``.
     */
    url?: string;
    [property: string]: any;
}

/**
 * The log level for the client. Default: ``info``.
 */
export type LogLevel = "debug" | "info" | "warning" | "error" | "critical";

export interface Lxd {
    /**
     * LXD bridge configuration provided to setup the host lxd bridge. Can not be combined with
     * **lxd.preseed**.
     */
    bridge?: Bridge;
    /**
     * LXD init configuration values to provide to `lxd init --auto` command. Can not be
     * combined with **lxd.preseed**.
     */
    init?: Init;
    /**
     * Opaque LXD preseed YAML config passed via stdin to the command: lxd init --preseed. See:
     * https://documentation.ubuntu.com/lxd/en/latest/howto/initialize/#non-interactive-configuration
     * or lxd init --dump for viable config. Can not be combined with either **lxd.init** or
     * **lxd.bridge**.
     */
    preseed?: string;
}

/**
 * LXD bridge configuration provided to setup the host lxd bridge. Can not be combined with
 * **lxd.preseed**.
 */
export interface Bridge {
    /**
     * Domain to advertise to DHCP clients and use for DNS resolution.
     */
    domain?: string;
    /**
     * IPv4 address for the bridge. If set, **ipv4_netmask** key required.
     */
    ipv4Address?: string;
    /**
     * First IPv4 address of the DHCP range for the network created. This value will combined
     * with **ipv4_dhcp_last** key to set LXC **ipv4.dhcp.ranges**.
     */
    ipv4DHCPFirst?: string;
    /**
     * Last IPv4 address of the DHCP range for the network created. This value will combined
     * with **ipv4_dhcp_first** key to set LXC **ipv4.dhcp.ranges**.
     */
    ipv4DHCPLast?: string;
    /**
     * Number of DHCP leases to allocate within the range. Automatically calculated based on
     * `ipv4_dhcp_first` and `ipv4_dhcp_last` when unset.
     */
    ipv4DHCPLeases?: number;
    /**
     * Set ``true`` to NAT the IPv4 traffic allowing for a routed IPv4 network. Default:
     * ``false``.
     */
    ipv4Nat?: boolean;
    /**
     * Prefix length for the **ipv4_address** key. Required when **ipv4_address** is set.
     */
    ipv4Netmask?: number;
    /**
     * IPv6 address for the bridge (CIDR notation). When set, **ipv6_netmask** key is required.
     * When absent, no IPv6 will be configured.
     */
    ipv6Address?: string;
    /**
     * Whether to NAT. Default: ``false``.
     */
    ipv6Nat?: boolean;
    /**
     * Prefix length for **ipv6_address** provided. Required when **ipv6_address** is set.
     */
    ipv6Netmask?: number;
    /**
     * Whether to setup LXD bridge, use an existing bridge by **name** or create a new bridge.
     * `none` will avoid bridge setup, `existing` will configure lxd to use the bring matching
     * **name** and `new` will create a new bridge.
     */
    mode: BridgeMode;
    /**
     * Bridge MTU, defaults to LXD's default value.
     */
    mtu?: number;
    /**
     * Name of the LXD network bridge to attach or create. Default: ``lxdbr0``.
     */
    name?: string;
}

/**
 * Whether to setup LXD bridge, use an existing bridge by **name** or create a new bridge.
 * `none` will avoid bridge setup, `existing` will configure lxd to use the bring matching
 * **name** and `new` will create a new bridge.
 */
export type BridgeMode = "none" | "existing" | "new";

/**
 * LXD init configuration values to provide to `lxd init --auto` command. Can not be
 * combined with **lxd.preseed**.
 */
export interface Init {
    /**
     * IP address for LXD to listen on.
     */
    networkAddress?: string;
    /**
     * Network port to bind LXD to.
     */
    networkPort?: number;
    /**
     * Storage backend to use. Default: ``dir``.
     */
    storageBackend?: StorageBackend;
    /**
     * Setup device based storage using DEVICE.
     */
    storageCreateDevice?: string;
    /**
     * Setup loop based storage with SIZE in GB.
     */
    storageCreateLoop?: number;
    /**
     * Name of storage pool to use or create.
     */
    storagePool?: string;
    /**
     * The password required to add new clients.
     */
    trustPassword?: string;
}

/**
 * Storage backend to use. Default: ``dir``.
 */
export type StorageBackend = "zfs" | "dir" | "lvm" | "btrfs";

export type ManageEtcHostsEnum = "localhost" | "template";

export interface Mcollective {
    conf?: McollectiveConf;
}

export interface McollectiveConf {
    /**
     * Optional value of server private certificate which will be written to
     * ``/etc/mcollective/ssl/server-private.pem``.
     */
    privateCERT?: string;
    /**
     * Optional value of server public certificate which will be written to
     * ``/etc/mcollective/ssl/server-public.pem``.
     */
    publicCERT?: string;
}

export interface MergeHowElement {
    name:     Name;
    settings: Setting[];
}

export type Name = "list" | "dict" | "str";

export type Setting = "allow_delete" | "no_replace" | "replace" | "append" | "prepend" | "recurse_dict" | "recurse_list" | "recurse_array" | "recurse_str";

export interface NTP {
    /**
     * List of CIDRs to allow.
     */
    allow?: string[];
    /**
     * Configuration settings or overrides for the **ntp_client** specified.
     */
    config?: NTPConfig;
    /**
     * Attempt to enable ntp clients if set to True.  If set to ``false``, ntp client will not
     * be configured or installed.
     */
    enabled?: boolean;
    /**
     * Name of an NTP client to use to configure system NTP. When unprovided or 'auto' the
     * default client preferred by the distribution will be used. The following built-in client
     * names can be used to override existing configuration defaults: chrony, ntp, openntpd,
     * ntpdate, systemd-timesyncd.
     */
    ntpClient?: string;
    /**
     * List of ntp peers.
     */
    peers?: string[];
    /**
     * List of ntp pools. If both pools and servers are empty, 4 default pool servers will be
     * provided of the format ``{0-3}.{distro}.pool.ntp.org``. NOTE: for Alpine Linux when using
     * the Busybox NTP client this setting will be ignored due to the limited functionality of
     * Busybox's ntpd.
     */
    pools?: string[];
    /**
     * List of ntp servers. If both pools and servers are empty, 4 default pool servers will be
     * provided with the format ``{0-3}.{distro}.pool.ntp.org``.
     */
    servers?: string[];
}

/**
 * Configuration settings or overrides for the **ntp_client** specified.
 */
export interface NTPConfig {
    /**
     * The executable name for the **ntp_client**. For example, ntp service **check_exe** is
     * 'ntpd' because it runs the ntpd binary.
     */
    checkExe?: string;
    /**
     * The path to where the **ntp_client** configuration is written.
     */
    confpath?: string;
    /**
     * List of packages needed to be installed for the selected **ntp_client**.
     */
    packages?: string[];
    /**
     * The systemd or sysvinit service name used to start and stop the **ntp_client** service.
     */
    serviceName?: string;
    /**
     * Inline template allowing users to customize their **ntp_client** configuration with the
     * use of the Jinja templating engine. The template content should start with ``##
     * template:jinja``. Within the template, you can utilize any of the following ntp module
     * config keys: **servers**, **pools**, **allow**, and **peers**. Each cc_ntp schema config
     * key and expected value type is defined above.
     */
    template?: string;
}

export interface Output {
    all?:    string[] | AllClass | string;
    config?: string[] | AllClass | string;
    final?:  string[] | AllClass | string;
    init?:   string[] | AllClass | string;
}

export interface AllClass {
    /**
     * A filepath operation configuration. A string containing a filepath and an optional
     * leading operator: '>', '>>' or '|'. Operators '>' and '>>' indicate whether to overwrite
     * or append to the file. The operator '|' redirects content to the command arguments
     * specified.
     */
    error?: string;
    /**
     * A filepath operation configuration. This is a string containing a filepath and an
     * optional leading operator: '>', '>>' or '|'. Operators '>' and '>>' indicate whether to
     * overwrite or append to the file. The operator '|' redirects content to the command
     * arguments specified.
     */
    output?: string;
}

export interface PackageClass {
    apt?:  Array<string[] | string>;
    snap?: Array<string[] | string>;
}

export interface PhoneHome {
    /**
     * A list of keys to post or ``all``. Default: ``all``.
     */
    post?: PostElement[] | "all";
    /**
     * The number of times to try sending the phone home data. Default: ``10``.
     */
    tries?: number;
    /**
     * The URL to send the phone home data to.
     */
    url: string;
}

export type PostElement = "pub_key_rsa" | "pub_key_ecdsa" | "pub_key_ed25519" | "instance_id" | "hostname" | "fqdn";

export interface PowerState {
    /**
     * Apply state change only if condition is met. May be boolean true (always met), false
     * (never met), or a command string or list to be executed. For command formatting, see the
     * documentation for ``cc_runcmd``. If exit code is 0, condition is met, otherwise not.
     * Default: ``true``.
     */
    condition?: any[] | boolean | string;
    /**
     * Time in minutes to delay after cloud-init has finished. Can be ``now`` or an integer
     * specifying the number of minutes to delay. Default: ``now``.
     */
    delay?: number | string;
    /**
     * Optional message to display to the user when the system is powering off or rebooting.
     */
    message?: string;
    /**
     * Must be one of ``poweroff``, ``halt``, or ``reboot``.
     */
    mode: PowerStateMode;
    /**
     * Time in seconds to wait for the cloud-init process to finish before executing shutdown.
     * Default: ``30``.
     */
    timeout?: number;
}

/**
 * Must be one of ``poweroff``, ``halt``, or ``reboot``.
 */
export type PowerStateMode = "poweroff" | "reboot" | "halt";

export interface Puppet {
    /**
     * If **install_type** is ``aio``, change the url of the install script.
     */
    aioInstallURL?: string;
    /**
     * Whether to remove the puppetlabs repo after installation if **install_type** is ``aio``
     * Default: ``true``.
     */
    cleanup?: boolean;
    /**
     * Puppet collection to install if **install_type** is ``aio``. This can be set to one of
     * ``puppet`` (rolling release), ``puppet6``, ``puppet7`` (or their nightly counterparts) in
     * order to install specific release streams.
     */
    collection?: string;
    /**
     * Every key present in the conf object will be added to puppet.conf. As such, section names
     * should be one of: ``main``, ``server``, ``agent`` or ``user`` and keys should be valid
     * puppet configuration options. The configuration is specified as a dictionary containing
     * high-level ``<section>`` keys and lists of ``<key>=<value>`` pairs within each section.
     * The ``certname`` key supports string substitutions for ``%i`` and ``%f``, corresponding
     * to the instance id and fqdn of the machine respectively.
     *
     * ``ca_cert`` is a special case. It won't be added to puppet.conf. It holds the
     * puppetserver certificate in pem format. It should be a multi-line string (using the |
     * YAML notation for multi-line strings).
     */
    conf?: PuppetConf;
    /**
     * The path to the puppet config file. Default depends on **install_type**.
     */
    confFile?: string;
    /**
     * create a ``csr_attributes.yaml`` file for CSR attributes and certificate extension
     * requests. See https://puppet.com/docs/puppet/latest/config_file_csr_attributes.html.
     */
    csrAttributes?: CsrAttributes;
    /**
     * The path to the puppet csr attributes file. Default depends on **install_type**.
     */
    csrAttributesPath?: string;
    /**
     * Whether or not to run puppet after configuration finishes. A single manual run can be
     * triggered by setting **exec** to ``true``, and additional arguments can be passed to
     * ``puppet agent`` via the **exec_args** key (by default the agent will execute with the
     * ``--test`` flag). Default: ``false``.
     */
    exec?: boolean;
    /**
     * A list of arguments to pass to 'puppet agent' if 'exec' is true Default: ``['--test']``.
     */
    execArgs?: string[];
    /**
     * Whether or not to install puppet. Setting to ``false`` will result in an error if puppet
     * is not already present on the system. Default: ``true``.
     */
    install?: boolean;
    /**
     * Valid values are ``packages`` and ``aio``. Agent packages from the puppetlabs
     * repositories can be installed by setting ``aio``. Based on this setting, the default
     * config/SSL/CSR paths will be adjusted accordingly. Default: ``packages``.
     */
    installType?: PuppetInstallType;
    /**
     * Name of the package to install if **install_type** is ``packages``. Default: ``puppet``.
     */
    packageName?: string;
    /**
     * The path to the puppet SSL directory. Default depends on **install_type**.
     */
    sslDir?: string;
    /**
     * By default, the puppet service will be automatically enabled after installation and set
     * to automatically start on boot. To override this in favor of manual puppet execution set
     * **start_service** to ``false``.
     */
    startService?: boolean;
    /**
     * Optional version to pass to the installer script or package manager. If unset, the latest
     * version from the repos will be installed.
     */
    version?: string;
}

/**
 * Every key present in the conf object will be added to puppet.conf. As such, section names
 * should be one of: ``main``, ``server``, ``agent`` or ``user`` and keys should be valid
 * puppet configuration options. The configuration is specified as a dictionary containing
 * high-level ``<section>`` keys and lists of ``<key>=<value>`` pairs within each section.
 * The ``certname`` key supports string substitutions for ``%i`` and ``%f``, corresponding
 * to the instance id and fqdn of the machine respectively.
 *
 * ``ca_cert`` is a special case. It won't be added to puppet.conf. It holds the
 * puppetserver certificate in pem format. It should be a multi-line string (using the |
 * YAML notation for multi-line strings).
 */
export interface PuppetConf {
    agent?:  { [key: string]: any };
    caCERT?: string;
    main?:   { [key: string]: any };
    server?: { [key: string]: any };
    user?:   { [key: string]: any };
}

/**
 * create a ``csr_attributes.yaml`` file for CSR attributes and certificate extension
 * requests. See https://puppet.com/docs/puppet/latest/config_file_csr_attributes.html.
 */
export interface CsrAttributes {
    customAttributes?:  { [key: string]: any };
    extensionRequests?: { [key: string]: any };
}

/**
 * Valid values are ``packages`` and ``aio``. Agent packages from the puppetlabs
 * repositories can be installed by setting ``aio``. Based on this setting, the default
 * config/SSL/CSR paths will be adjusted accordingly. Default: ``packages``.
 */
export type PuppetInstallType = "packages" | "aio";

export interface RandomSeed {
    /**
     * Execute this command to seed random. The command will have RANDOM_SEED_FILE in its
     * environment set to the value of **file** above.
     */
    command?: string[];
    /**
     * If true, and **command** is not available to be run then an exception is raised and
     * cloud-init will record failure. Otherwise, only debug error is mentioned. Default:
     * ``false``.
     */
    commandRequired?: boolean;
    /**
     * This data will be written to **file** before data from the datasource. When using a
     * multi-line value or specifying binary data, be sure to follow YAML syntax and use the
     * ``|`` and ``!binary`` YAML format specifiers when appropriate.
     */
    data?: string;
    /**
     * Used to decode **data** provided. Allowed values are ``raw``, ``base64``, ``b64``,
     * ``gzip``, or ``gz``.  Default: ``raw``.
     */
    encoding?: RandomSeedEncoding;
    /**
     * File to write random data to. Default: ``/dev/urandom``.
     */
    file?: string;
}

/**
 * Used to decode **data** provided. Allowed values are ``raw``, ``base64``, ``b64``,
 * ``gzip``, or ``gz``.  Default: ``raw``.
 */
export type RandomSeedEncoding = "raw" | "base64" | "b64" | "gzip" | "gz";

export interface Reporting {
}

export interface ResolvConf {
    /**
     * The domain to be added as ``domain`` line.
     */
    domain?: string;
    /**
     * A list of nameservers to use to be added as ``nameserver`` lines.
     */
    nameservers?: any[];
    /**
     * Key/value pairs of options to go under ``options`` heading. A unary option should be
     * specified as ``true``.
     */
    options?: { [key: string]: any };
    /**
     * A list of domains to be added ``search`` line.
     */
    searchdomains?: any[];
    /**
     * A list of IP addresses to be added to ``sortlist`` line.
     */
    sortlist?: any[];
}

export interface RhSubscription {
    /**
     * The activation key to use. Must be used with **org**. Should not be used with
     * **username** or **password**.
     */
    activationKey?: string;
    /**
     * A list of pools ids add to the subscription.
     */
    addPool?: string[];
    /**
     * Whether to attach subscriptions automatically.
     */
    autoAttach?: boolean;
    /**
     * A list of repositories to disable.
     */
    disableRepo?: string[];
    /**
     * A list of repositories to enable.
     */
    enableRepo?: string[];
    /**
     * The organization to use. Must be used with **activation-key**. Should not be used with
     * **username** or **password**.
     */
    org?: number | string;
    /**
     * The password to use. Must be used with username. Should not be used with
     * **activation-key** or **org**.
     */
    password?: string;
    /**
     * Sets the baseurl in ``/etc/rhsm/rhsm.conf``.
     */
    rhsmBaseurl?: string;
    /**
     * Sets the serverurl in ``/etc/rhsm/rhsm.conf``.
     */
    serverHostname?: string;
    /**
     * The service level to use when subscribing to RH repositories. ``auto-attach`` must be
     * true for this to be used.
     */
    serviceLevel?: string;
    /**
     * The username to use. Must be used with password. Should not be used with
     * **activation-key** or **org**.
     */
    username?: string;
}

export interface Rsyslog {
    /**
     * The executable name for the rsyslog daemon.
     * For example, ``rsyslogd``, or ``/opt/sbin/rsyslogd`` if the rsyslog binary is in an
     * unusual path. This is only used if ``install_rsyslog`` is ``true``. Default: ``rsyslogd``.
     */
    checkExe?: string;
    /**
     * The directory where rsyslog configuration files will be written. Default:
     * ``/etc/rsyslog.d``.
     */
    configDir?: string;
    /**
     * The name of the rsyslog configuration file. Default: ``20-cloud-config.conf``.
     */
    configFilename?: string;
    /**
     * Each entry in **configs** is either a string or an object. Each config entry contains a
     * configuration string and a file to write it to. For config entries that are an object,
     * **filename** sets the target filename and **content** specifies the config string to
     * write. For config entries that are only a string, the string is used as the config string
     * to write. If the filename to write the config to is not specified, the value of the
     * **config_filename** key is used. A file with the selected filename will be written inside
     * the directory specified by **config_dir**.
     */
    configs?: Array<ConfigConfig | string>;
    /**
     * Install rsyslog. Default: ``false``.
     */
    installRsyslog?: boolean;
    /**
     * List of packages needed to be installed for rsyslog. This is only used if
     * **install_rsyslog** is ``true``. Default: ``[rsyslog]``.
     */
    packages?: string[];
    /**
     * Each key is the name for an rsyslog remote entry. Each value holds the contents of the
     * remote config for rsyslog. The config consists of the following parts:
     *
     * - filter for log messages (defaults to ``*.*``)
     *
     * - optional leading ``@`` or ``@@``, indicating udp and tcp respectively (defaults to
     * ``@``, for udp)
     *
     * - ipv4 or ipv6 hostname or address. ipv6 addresses must be in ``[::1]`` format, (e.g.
     * ``@[fd00::1]:514``)
     *
     * - optional port number (defaults to ``514``)
     *
     * This module will provide sane defaults for any part of the remote entry that is not
     * specified, so in most cases remote hosts can be specified just using ``<name>:
     * <address>``.
     */
    remotes?: { [key: string]: any };
    /**
     * The command to use to reload the rsyslog service after the config has been updated. If
     * this is set to ``auto``, then an appropriate command for the distro will be used. This is
     * the default behavior. To manually set the command, use a list of command args (e.g.
     * ``[systemctl, restart, rsyslog]``).
     */
    serviceReloadCommand?: string[] | "auto";
}

export interface ConfigConfig {
    content:   string;
    filename?: string;
}

export interface SaltMinion {
    /**
     * Configuration to be written to `config_dir`/minion.
     */
    conf?: { [key: string]: any };
    /**
     * Directory to write config files to. Default: ``/etc/salt``.
     */
    configDir?: string;
    /**
     * Configuration to be written to `config_dir`/grains.
     */
    grains?: { [key: string]: any };
    /**
     * Package name to install. Default: ``salt-minion``.
     */
    pkgName?: string;
    /**
     * Directory to write key files. Default: `config_dir`/pki/minion.
     */
    pkiDir?: string;
    /**
     * Private key to be used by salt minion.
     */
    privateKey?: string;
    /**
     * Public key to be used by the salt minion.
     */
    publicKey?: string;
    /**
     * Service name to enable. Default: ``salt-minion``.
     */
    serviceName?: string;
}

export interface Snap {
    /**
     * Properly-signed snap assertions which will run before and snap **commands**.
     */
    assertions?: string[] | { [key: string]: string };
    /**
     * Snap commands to run on the target system.
     */
    commands?: Array<string[] | string> | { [key: string]: string[] | string };
}

export interface Spacewalk {
    /**
     * The activation key to use when registering with Spacewalk.
     */
    activationKey?: string;
    /**
     * The proxy to use when connecting to Spacewalk.
     */
    proxy?: string;
    /**
     * The Spacewalk server to use.
     */
    server?: string;
}

export interface SSH {
    /**
     * Set false to avoid printing SSH keys to system console. Default: ``true``.
     */
    emitKeysToConsole: boolean;
}

export type SSHGenkeytype = "ecdsa" | "ed25519" | "rsa";

/**
 * A dictionary entries for the public and private host keys of each desired key type.
 * Entries in the **ssh_keys** config dict should have keys in the format ``<key
 * type>_private``, ``<key type>_public``, and, optionally, ``<key type>_certificate``, e.g.
 * ``rsa_private: <key>``, ``rsa_public: <key>``, and ``rsa_certificate: <key>``. Not all
 * key types have to be specified, ones left unspecified will not be used. If this config
 * option is used, then separate keys will not be automatically generated. In order to
 * specify multi-line private host keys and certificates, use YAML multi-line syntax.
 * **Note:** Your ssh keys might possibly be visible to unprivileged users on your system,
 * depending on your cloud's security model.
 */
export interface SSHKeys {
}

export interface SSHPublishHostkeys {
    /**
     * The SSH key types to ignore when publishing. Default: ``[]`` to publish all SSH key types.
     */
    blacklist?: string[];
    /**
     * If true, will read host keys from ``/etc/ssh/*.pub`` and publish them to the datasource
     * (if supported). Default: ``true``.
     */
    enabled?: boolean;
}

export interface Swap {
    /**
     * Path to the swap file to create.
     */
    filename?: string;
    /**
     * The maxsize in bytes of the swap file.
     */
    maxsize?: number | string;
    /**
     * The size in bytes of the swap file, 'auto' or a human-readable size abbreviation of the
     * format <float_size><units> where units are one of B, K, M, G or T. **WARNING: Attempts to
     * use IEC prefixes in your configuration prior to cloud-init version 23.1 will result in
     * unexpected behavior. SI prefixes names (KB, MB) are required on pre-23.1 cloud-init,
     * however IEC values are used. In summary, assume 1KB == 1024B, not 1000B**.
     */
    size?: number | string;
}

export interface UbuntuAdvantage {
    /**
     * Configuration settings or override Ubuntu Pro config.
     */
    config?: ConfigObject;
    /**
     * Optional list of Ubuntu Pro services to enable. Any of: cc-eal, cis, esm-infra, fips,
     * fips-updates, livepatch. By default, a given contract token will automatically enable a
     * number of services, use this list to supplement which services should additionally be
     * enabled. Any service unavailable on a given Ubuntu release or unentitled in a given
     * contract will remain disabled. In Ubuntu Pro instances, if this list is given, then only
     * those services will be enabled, ignoring contract defaults. Passing beta services here
     * will cause an error.
     */
    enable?: string[];
    /**
     * Optional list of Ubuntu Pro beta services to enable. By default, a given contract token
     * will automatically enable a number of services, use this list to supplement which
     * services should additionally be enabled. Any service unavailable on a given Ubuntu
     * release or unentitled in a given contract will remain disabled. In Ubuntu Pro instances,
     * if this list is given, then only those services will be enabled, ignoring contract
     * defaults.
     */
    enableBeta?: string[];
    /**
     * Ubuntu Pro features.
     */
    features?: Features;
    /**
     * Contract token obtained from https://ubuntu.com/pro to attach. Required for non-Pro
     * instances.
     */
    token?: string;
}

/**
 * Configuration settings or override Ubuntu Pro config.
 */
export interface ConfigObject {
    /**
     * HTTP Proxy URL used for all APT repositories on a system or null to unset. Stored at
     * ``/etc/apt/apt.conf.d/90ubuntu-advantage-aptproxy``.
     */
    globalAptHTTPProxy?: null | string;
    /**
     * HTTPS Proxy URL used for all APT repositories on a system or null to unset. Stored at
     * ``/etc/apt/apt.conf.d/90ubuntu-advantage-aptproxy``.
     */
    globalAptHTTPSProxy?: null | string;
    /**
     * Ubuntu Pro HTTP Proxy URL or null to unset.
     */
    httpProxy?: null | string;
    /**
     * Ubuntu Pro HTTPS Proxy URL or null to unset.
     */
    httpsProxy?: null | string;
    /**
     * HTTP Proxy URL used only for Ubuntu Pro APT repositories or null to unset. Stored at
     * ``/etc/apt/apt.conf.d/90ubuntu-advantage-aptproxy``.
     */
    uaAptHTTPProxy?: null | string;
    /**
     * HTTPS Proxy URL used only for Ubuntu Pro APT repositories or null to unset. Stored at
     * ``/etc/apt/apt.conf.d/90ubuntu-advantage-aptproxy``.
     */
    uaAptHTTPSProxy?: null | string;
    [property: string]: any;
}

/**
 * Ubuntu Pro features.
 */
export interface Features {
    /**
     * Optional boolean for controlling if ua-auto-attach.service (in Ubuntu Pro instances) will
     * be attempted each boot. Default: ``false``.
     */
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
    /**
     * Boolean set ``false`` to disable creation of specified user ``groups``. Default: ``true``.
     */
    schemaCloudConfigV1CreateGroups?: boolean;
    /**
     * List of doas rules to add for a user. doas or opendoas must be installed for rules to
     * take effect.
     */
    doas?: string[];
    /**
     * Optional. Date on which the user's account will be disabled. Default: ``null``.
     */
    expiredate?: Date;
    /**
     * Optional comment about the user, usually a comma-separated string of real name and
     * contact information.
     */
    gecos?: string;
    /**
     * Optional comma-separated string of groups to add the user to.
     */
    groups?:       string[] | { [key: string]: any } | string;
    hashedPasswd?: string;
    /**
     * Hash of user password to be applied. This will be applied even if the user is
     * preexisting. To generate this hash, run: ``mkpasswd --method=SHA-512 --rounds=500000``.
     * **Note:** Your password might possibly be visible to unprivileged users on your system,
     * depending on your cloud's security model. Check if your cloud's IMDS server is visible
     * from an unprivileged user to evaluate risk.
     */
    schemaCloudConfigV1HashedPasswd?: string;
    /**
     * Optional home dir for user. Default: ``/home/<username>``.
     */
    homedir?: string;
    /**
     * Optional string representing the number of days until the user is disabled.
     */
    inactive?:   string;
    lockPasswd?: boolean;
    /**
     * Disable password login. Default: ``true``.
     */
    schemaCloudConfigV1LockPasswd?: boolean;
    /**
     * The user's login name. Required otherwise user creation will be skipped for this user.
     */
    name?:         string;
    noCreateHome?: boolean;
    noLogInit?:    boolean;
    noUserGroup?:  boolean;
    /**
     * Do not create home directory. Default: ``false``.
     */
    schemaCloudConfigV1NoCreateHome?: boolean;
    /**
     * Do not initialize lastlog and faillog for user. Default: ``false``.
     */
    schemaCloudConfigV1NoLogInit?: boolean;
    /**
     * Do not create group named after user. Default: ``false``.
     */
    schemaCloudConfigV1NoUserGroup?: boolean;
    /**
     * Hash of user password applied when user does not exist. This will NOT be applied if the
     * user already exists. To generate this hash, run: ``mkpasswd --method=SHA-512
     * --rounds=500000`` **Note:** Your password might possibly be visible to unprivileged users
     * on your system, depending on your cloud's security model. Check if your cloud's IMDS
     * server is visible from an unprivileged user to evaluate risk.
     */
    passwd?:          string;
    plainTextPasswd?: string;
    /**
     * Clear text of user password to be applied. This will be applied even if the user is
     * preexisting. **Note:** SSH keys or certificates are a safer choice for logging in to your
     * system. For local escalation, supplying a hashed password is a safer choice than plain
     * text. Your password might possibly be visible to unprivileged users on your system,
     * depending on your cloud's security model. An exposed plain text password is an immediate
     * security concern. Check if your cloud's IMDS server is visible from an unprivileged user
     * to evaluate risk.
     */
    schemaCloudConfigV1PlainTextPasswd?: string;
    primaryGroup?:                       string;
    /**
     * Primary group for user. Default: ``<username>``.
     */
    schemaCloudConfigV1PrimaryGroup?: string;
    selinuxUser?:                     string;
    /**
     * SELinux user for user's login. Default: the default SELinux user.
     */
    schemaCloudConfigV1SelinuxUser?: string;
    /**
     * Path to the user's login shell. Default: the host system's default shell.
     */
    shell?: string;
    /**
     * Specify an email address to create the user as a Snappy user through ``snap
     * create-user``. If an Ubuntu SSO account is associated with the address, username and SSH
     * keys will be requested from there.
     */
    snapuser?:          string;
    sshAuthorizedKeys?: string[];
    sshImportID?:       string[];
    sshRedirectUser?:   boolean;
    /**
     * List of SSH keys to add to user's authkeys file. Can not be combined with
     * **ssh_redirect_user**.
     */
    schemaCloudConfigV1SSHAuthorizedKeys?: string[];
    /**
     * List of ssh ids to import for user. Can not be combined with **ssh_redirect_user**. See
     * the man page[1] for more details. [1]
     * https://manpages.ubuntu.com/manpages/noble/en/man1/ssh-import-id.1.html.
     */
    schemaCloudConfigV1SSHImportID?: string[];
    /**
     * Boolean set to true to disable SSH logins for this user. When specified, all
     * cloud-provided public SSH keys will be set up in a disabled state for this username. Any
     * SSH login as this username will timeout and prompt with a message to login instead as the
     * **default_username** for this instance. Default: ``false``. This key can not be combined
     * with **ssh_import_id** or **ssh_authorized_keys**.
     */
    schemaCloudConfigV1SSHRedirectUser?: boolean;
    sudo?:                               Array<null | string> | boolean | null | string;
    /**
     * Optional. Create user as system user with no home directory. Default: ``false``.
     */
    system?: boolean;
    /**
     * The user's ID. Default value [system default].
     */
    uid?: number | string;
}

export interface FluffySchemaCloudConfigV1 {
    createGroups?: boolean;
    /**
     * Boolean set ``false`` to disable creation of specified user ``groups``. Default: ``true``.
     */
    schemaCloudConfigV1CreateGroups?: boolean;
    /**
     * List of doas rules to add for a user. doas or opendoas must be installed for rules to
     * take effect.
     */
    doas?: string[];
    /**
     * Optional. Date on which the user's account will be disabled. Default: ``null``.
     */
    expiredate?: Date;
    /**
     * Optional comment about the user, usually a comma-separated string of real name and
     * contact information.
     */
    gecos?: string;
    /**
     * Optional comma-separated string of groups to add the user to.
     */
    groups?:       string[] | { [key: string]: any } | string;
    hashedPasswd?: string;
    /**
     * Hash of user password to be applied. This will be applied even if the user is
     * preexisting. To generate this hash, run: ``mkpasswd --method=SHA-512 --rounds=500000``.
     * **Note:** Your password might possibly be visible to unprivileged users on your system,
     * depending on your cloud's security model. Check if your cloud's IMDS server is visible
     * from an unprivileged user to evaluate risk.
     */
    schemaCloudConfigV1HashedPasswd?: string;
    /**
     * Optional home dir for user. Default: ``/home/<username>``.
     */
    homedir?: string;
    /**
     * Optional string representing the number of days until the user is disabled.
     */
    inactive?:   string;
    lockPasswd?: boolean;
    /**
     * Disable password login. Default: ``true``.
     */
    schemaCloudConfigV1LockPasswd?: boolean;
    /**
     * The user's login name. Required otherwise user creation will be skipped for this user.
     */
    name?:         string;
    noCreateHome?: boolean;
    noLogInit?:    boolean;
    noUserGroup?:  boolean;
    /**
     * Do not create home directory. Default: ``false``.
     */
    schemaCloudConfigV1NoCreateHome?: boolean;
    /**
     * Do not initialize lastlog and faillog for user. Default: ``false``.
     */
    schemaCloudConfigV1NoLogInit?: boolean;
    /**
     * Do not create group named after user. Default: ``false``.
     */
    schemaCloudConfigV1NoUserGroup?: boolean;
    /**
     * Hash of user password applied when user does not exist. This will NOT be applied if the
     * user already exists. To generate this hash, run: ``mkpasswd --method=SHA-512
     * --rounds=500000`` **Note:** Your password might possibly be visible to unprivileged users
     * on your system, depending on your cloud's security model. Check if your cloud's IMDS
     * server is visible from an unprivileged user to evaluate risk.
     */
    passwd?:          string;
    plainTextPasswd?: string;
    /**
     * Clear text of user password to be applied. This will be applied even if the user is
     * preexisting. **Note:** SSH keys or certificates are a safer choice for logging in to your
     * system. For local escalation, supplying a hashed password is a safer choice than plain
     * text. Your password might possibly be visible to unprivileged users on your system,
     * depending on your cloud's security model. An exposed plain text password is an immediate
     * security concern. Check if your cloud's IMDS server is visible from an unprivileged user
     * to evaluate risk.
     */
    schemaCloudConfigV1PlainTextPasswd?: string;
    primaryGroup?:                       string;
    /**
     * Primary group for user. Default: ``<username>``.
     */
    schemaCloudConfigV1PrimaryGroup?: string;
    selinuxUser?:                     string;
    /**
     * SELinux user for user's login. Default: the default SELinux user.
     */
    schemaCloudConfigV1SelinuxUser?: string;
    /**
     * Path to the user's login shell. Default: the host system's default shell.
     */
    shell?: string;
    /**
     * Specify an email address to create the user as a Snappy user through ``snap
     * create-user``. If an Ubuntu SSO account is associated with the address, username and SSH
     * keys will be requested from there.
     */
    snapuser?:          string;
    sshAuthorizedKeys?: string[];
    sshImportID?:       string[];
    sshRedirectUser?:   boolean;
    /**
     * List of SSH keys to add to user's authkeys file. Can not be combined with
     * **ssh_redirect_user**.
     */
    schemaCloudConfigV1SSHAuthorizedKeys?: string[];
    /**
     * List of ssh ids to import for user. Can not be combined with **ssh_redirect_user**. See
     * the man page[1] for more details. [1]
     * https://manpages.ubuntu.com/manpages/noble/en/man1/ssh-import-id.1.html.
     */
    schemaCloudConfigV1SSHImportID?: string[];
    /**
     * Boolean set to true to disable SSH logins for this user. When specified, all
     * cloud-provided public SSH keys will be set up in a disabled state for this username. Any
     * SSH login as this username will timeout and prompt with a message to login instead as the
     * **default_username** for this instance. Default: ``false``. This key can not be combined
     * with **ssh_import_id** or **ssh_authorized_keys**.
     */
    schemaCloudConfigV1SSHRedirectUser?: boolean;
    sudo?:                               Array<null | string> | boolean | null | string;
    /**
     * Optional. Create user as system user with no home directory. Default: ``false``.
     */
    system?: boolean;
    /**
     * The user's ID. Default value [system default].
     */
    uid?: number | string;
}

export interface VendorData {
    /**
     * Whether vendor-data is enabled or not. Default: ``true``.
     */
    enabled?: boolean | string;
    /**
     * The command to run before any vendor scripts. Its primary use case is for profiling a
     * script, not to prevent its run.
     */
    prefix?: Array<number | string> | string;
}

export interface Wireguard {
    interfaces: Interface[];
    /**
     * List of shell commands to be executed as probes.
     */
    readinessprobe?: string[];
}

export interface Interface {
    /**
     * Path to configuration file of Wireguard interface.
     */
    configPath?: string;
    /**
     * Wireguard interface configuration. Contains key, peer, ...
     */
    content?: string;
    /**
     * Name of the interface. Typically wgx (example: wg0).
     */
    name?: string;
}

export interface WriteFile {
    /**
     * Whether to append **content** to existing file if **path** exists. Default: ``false``.
     */
    append?: boolean;
    /**
     * Optional content to write to the provided **path**. When content is present and encoding
     * is not 'text/plain', decode the content prior to writing. Default: ``''``.
     */
    content?: string;
    /**
     * Defer writing the file until 'final' stage, after users were created, and packages were
     * installed. Default: ``false``.
     */
    defer?: boolean;
    /**
     * Optional encoding type of the content. Default: ``text/plain``. No decoding is performed
     * by default. Supported encoding types are: gz, gzip, gz+base64, gzip+base64, gz+b64,
     * gzip+b64, b64, base64.
     */
    encoding?: WriteFileEncoding;
    /**
     * Optional owner:group to chown on the file and new directories. Default: ``root:root``.
     */
    owner?: string;
    /**
     * Path of the file to which **content** is decoded and written.
     */
    path: string;
    /**
     * Optional file permissions to set on **path** represented as an octal string '0###'.
     * Default: ``0o644``.
     */
    permissions?: string;
    /**
     * Optional specification for content loading from an arbitrary URI.
     */
    source?: Source;
}

/**
 * Optional encoding type of the content. Default: ``text/plain``. No decoding is performed
 * by default. Supported encoding types are: gz, gzip, gz+base64, gzip+base64, gz+b64,
 * gzip+b64, b64, base64.
 */
export type WriteFileEncoding = "gz" | "gzip" | "gz+base64" | "gzip+base64" | "gz+b64" | "gzip+b64" | "b64" | "base64" | "text/plain";

/**
 * Optional specification for content loading from an arbitrary URI.
 */
export interface Source {
    /**
     * Optional HTTP headers to accompany load request, if applicable.
     */
    headers?: { [key: string]: string };
    /**
     * URI from which to load file content. If loading fails repeatedly, **content** is used
     * instead.
     */
    uri: string;
}

export interface YumRepos {
}

export interface Zypper {
    /**
     * Any supported zypo.conf key is written to ``/etc/zypp/zypp.conf``.
     */
    config?: { [key: string]: any };
    repos?:  Repo[];
    [property: string]: any;
}

export interface Repo {
    /**
     * The base repositoy URL.
     */
    baseurl: string;
    /**
     * The unique id of the repo, used when writing /etc/zypp/repos.d/<id>.repo.
     */
    id: string;
    [property: string]: any;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toCloudConfig(json: string): CloudConfig {
        return cast(JSON.parse(json), r("CloudConfig"));
    }

    public static cloudConfigToJson(value: CloudConfig): string {
        return JSON.stringify(uncast(value, r("CloudConfig")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = val[key];
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "CloudConfig": o([
        { json: "version", js: "version", typ: u(undefined, r("Version")) },
        { json: "allow_public_ssh_keys", js: "allowPublicSSHKeys", typ: u(undefined, true) },
        { json: "ansible", js: "ansible", typ: u(undefined, r("Ansible")) },
        { json: "apk_repos", js: "apkRepos", typ: u(undefined, r("ApkRepos")) },
        { json: "apt", js: "apt", typ: u(undefined, r("Apt")) },
        { json: "apt_pipelining", js: "aptPipelining", typ: u(undefined, u(true, r("AnsibleConfig"), 0)) },
        { json: "apt_reboot_if_required", js: "aptRebootIfRequired", typ: u(undefined, true) },
        { json: "apt_update", js: "aptUpdate", typ: u(undefined, true) },
        { json: "apt_upgrade", js: "aptUpgrade", typ: u(undefined, true) },
        { json: "authkey_hash", js: "authkeyHash", typ: u(undefined, "") },
        { json: "autoinstall", js: "autoinstall", typ: u(undefined, r("Autoinstall")) },
        { json: "bootcmd", js: "bootcmd", typ: u(undefined, a(u(a(""), ""))) },
        { json: "byobu_by_default", js: "byobuByDefault", typ: u(undefined, r("ByobuByDefault")) },
        { json: "ca-certs", js: "caCerts", typ: u(undefined, r("CACerts")) },
        { json: "ca_certs", js: "cloudConfigCACerts", typ: u(undefined, r("CACerts")) },
        { json: "chef", js: "chef", typ: u(undefined, r("Chef")) },
        { json: "chpasswd", js: "chpasswd", typ: u(undefined, r("Chpasswd")) },
        { json: "cloud_config_modules", js: "cloudConfigModules", typ: u(undefined, a(u(a("any"), r("CloudConfigModuleEnum")))) },
        { json: "cloud_final_modules", js: "cloudFinalModules", typ: u(undefined, a(u(a("any"), r("CloudConfigModuleEnum")))) },
        { json: "cloud_init_modules", js: "cloudInitModules", typ: u(undefined, a(u(a("any"), r("CloudConfigModuleEnum")))) },
        { json: "create_hostname_file", js: "createHostnameFile", typ: u(undefined, true) },
        { json: "device_aliases", js: "deviceAliases", typ: u(undefined, r("DeviceAliases")) },
        { json: "disable_ec2_metadata", js: "disableEc2Metadata", typ: u(undefined, true) },
        { json: "disable_root", js: "disableRoot", typ: u(undefined, true) },
        { json: "disable_root_opts", js: "disableRootOpts", typ: u(undefined, "") },
        { json: "disk_setup", js: "diskSetup", typ: u(undefined, r("DiskSetup")) },
        { json: "drivers", js: "drivers", typ: u(undefined, r("Drivers")) },
        { json: "fan", js: "fan", typ: u(undefined, r("Fan")) },
        { json: "final_message", js: "finalMessage", typ: u(undefined, "") },
        { json: "fqdn", js: "fqdn", typ: u(undefined, "") },
        { json: "fs_setup", js: "fsSetup", typ: u(undefined, a(r("FSSetup"))) },
        { json: "groups", js: "groups", typ: u(undefined, u(a("any"), r("GroupsClass"), "")) },
        { json: "growpart", js: "growpart", typ: u(undefined, r("Growpart")) },
        { json: "grub-dpkg", js: "grubDpkg", typ: u(undefined, m("any")) },
        { json: "grub_dpkg", js: "cloudConfigGrubDpkg", typ: u(undefined, r("GrubDpkg")) },
        { json: "hostname", js: "hostname", typ: u(undefined, "") },
        { json: "keyboard", js: "keyboard", typ: u(undefined, r("Keyboard")) },
        { json: "landscape", js: "landscape", typ: u(undefined, r("Landscape")) },
        { json: "launch-index", js: "launchIndex", typ: u(undefined, 0) },
        { json: "locale", js: "locale", typ: u(undefined, u(true, "")) },
        { json: "locale_configfile", js: "localeConfigfile", typ: u(undefined, "") },
        { json: "lxd", js: "lxd", typ: u(undefined, r("Lxd")) },
        { json: "manage_etc_hosts", js: "manageEtcHosts", typ: u(undefined, u(true, r("ManageEtcHostsEnum"))) },
        { json: "manage_resolv_conf", js: "manageResolvConf", typ: u(undefined, true) },
        { json: "mcollective", js: "mcollective", typ: u(undefined, r("Mcollective")) },
        { json: "merge_how", js: "mergeHow", typ: u(undefined, u(a(r("MergeHowElement")), "")) },
        { json: "merge_type", js: "mergeType", typ: u(undefined, u(a(r("MergeHowElement")), "")) },
        { json: "migrate", js: "migrate", typ: u(undefined, "any") },
        { json: "mount_default_fields", js: "mountDefaultFields", typ: u(undefined, a(u(null, ""))) },
        { json: "mounts", js: "mounts", typ: u(undefined, a(a(""))) },
        { json: "no_ssh_fingerprints", js: "noSSHFingerprints", typ: u(undefined, true) },
        { json: "ntp", js: "ntp", typ: u(undefined, u(r("NTP"), null)) },
        { json: "output", js: "output", typ: u(undefined, r("Output")) },
        { json: "package_reboot_if_required", js: "packageRebootIfRequired", typ: u(undefined, true) },
        { json: "package_update", js: "packageUpdate", typ: u(undefined, true) },
        { json: "package_upgrade", js: "packageUpgrade", typ: u(undefined, true) },
        { json: "packages", js: "packages", typ: u(undefined, a(u(a(""), r("PackageClass"), ""))) },
        { json: "password", js: "password", typ: u(undefined, "") },
        { json: "phone_home", js: "phoneHome", typ: u(undefined, r("PhoneHome")) },
        { json: "power_state", js: "powerState", typ: u(undefined, r("PowerState")) },
        { json: "prefer_fqdn_over_hostname", js: "preferFQDNOverHostname", typ: u(undefined, true) },
        { json: "preserve_hostname", js: "preserveHostname", typ: u(undefined, true) },
        { json: "puppet", js: "puppet", typ: u(undefined, r("Puppet")) },
        { json: "random_seed", js: "randomSeed", typ: u(undefined, r("RandomSeed")) },
        { json: "reporting", js: "reporting", typ: u(undefined, r("Reporting")) },
        { json: "resize_rootfs", js: "resizeRootfs", typ: u(undefined, u(true, r("ResizeRootfsEnum"))) },
        { json: "resolv_conf", js: "resolvConf", typ: u(undefined, r("ResolvConf")) },
        { json: "rh_subscription", js: "rhSubscription", typ: u(undefined, r("RhSubscription")) },
        { json: "rsyslog", js: "rsyslog", typ: u(undefined, r("Rsyslog")) },
        { json: "runcmd", js: "runcmd", typ: u(undefined, a(u(a(""), null, ""))) },
        { json: "salt_minion", js: "saltMinion", typ: u(undefined, r("SaltMinion")) },
        { json: "snap", js: "snap", typ: u(undefined, r("Snap")) },
        { json: "spacewalk", js: "spacewalk", typ: u(undefined, r("Spacewalk")) },
        { json: "ssh", js: "ssh", typ: u(undefined, r("SSH")) },
        { json: "ssh_authorized_keys", js: "sshAuthorizedKeys", typ: u(undefined, a("")) },
        { json: "ssh_deletekeys", js: "sshDeletekeys", typ: u(undefined, true) },
        { json: "ssh_fp_console_blacklist", js: "sshFPConsoleBlacklist", typ: u(undefined, a("")) },
        { json: "ssh_genkeytypes", js: "sshGenkeytypes", typ: u(undefined, a(r("SSHGenkeytype"))) },
        { json: "ssh_import_id", js: "sshImportID", typ: u(undefined, a("")) },
        { json: "ssh_key_console_blacklist", js: "sshKeyConsoleBlacklist", typ: u(undefined, a("")) },
        { json: "ssh_keys", js: "sshKeys", typ: u(undefined, r("SSHKeys")) },
        { json: "ssh_publish_hostkeys", js: "sshPublishHostkeys", typ: u(undefined, r("SSHPublishHostkeys")) },
        { json: "ssh_pwauth", js: "sshPwauth", typ: u(undefined, u(true, "")) },
        { json: "ssh_quiet_keygen", js: "sshQuietKeygen", typ: u(undefined, true) },
        { json: "swap", js: "swap", typ: u(undefined, r("Swap")) },
        { json: "system_info", js: "systemInfo", typ: u(undefined, m("any")) },
        { json: "timezone", js: "timezone", typ: u(undefined, "") },
        { json: "ubuntu_advantage", js: "ubuntuAdvantage", typ: u(undefined, r("UbuntuAdvantage")) },
        { json: "ubuntu_pro", js: "ubuntuPro", typ: u(undefined, r("UbuntuAdvantage")) },
        { json: "updates", js: "updates", typ: u(undefined, r("Updates")) },
        { json: "user", js: "user", typ: u(undefined, u(r("PurpleSchemaCloudConfigV1"), "")) },
        { json: "users", js: "users", typ: u(undefined, u(a(u(a(""), r("FluffySchemaCloudConfigV1"), "")), m("any"), "")) },
        { json: "vendor_data", js: "vendorData", typ: u(undefined, r("VendorData")) },
        { json: "wireguard", js: "wireguard", typ: u(undefined, u(r("Wireguard"), null)) },
        { json: "write_files", js: "writeFiles", typ: u(undefined, a(r("WriteFile"))) },
        { json: "yum_repo_dir", js: "yumRepoDir", typ: u(undefined, "") },
        { json: "yum_repos", js: "yumRepos", typ: u(undefined, r("YumRepos")) },
        { json: "zypper", js: "zypper", typ: u(undefined, r("Zypper")) },
    ], false),
    "Ansible": o([
        { json: "ansible_config", js: "ansibleConfig", typ: u(undefined, "") },
        { json: "galaxy", js: "galaxy", typ: u(undefined, r("Galaxy")) },
        { json: "install_method", js: "installMethod", typ: u(undefined, r("InstallMethod")) },
        { json: "package_name", js: "packageName", typ: u(undefined, "") },
        { json: "pull", js: "pull", typ: u(undefined, r("Pull")) },
        { json: "run_user", js: "runUser", typ: u(undefined, "") },
        { json: "setup_controller", js: "setupController", typ: u(undefined, r("SetupController")) },
    ], false),
    "Galaxy": o([
        { json: "actions", js: "actions", typ: a(a("")) },
    ], false),
    "Pull": o([
        { json: "accept_host_key", js: "acceptHostKey", typ: u(undefined, true) },
        { json: "checkout", js: "checkout", typ: u(undefined, "") },
        { json: "clean", js: "clean", typ: u(undefined, true) },
        { json: "connection", js: "connection", typ: u(undefined, "") },
        { json: "diff", js: "diff", typ: u(undefined, true) },
        { json: "full", js: "full", typ: u(undefined, true) },
        { json: "inventory", js: "inventory", typ: u(undefined, "") },
        { json: "module_name", js: "moduleName", typ: u(undefined, "") },
        { json: "module_path", js: "modulePath", typ: u(undefined, "") },
        { json: "playbook_name", js: "playbookName", typ: "" },
        { json: "private_key", js: "privateKey", typ: u(undefined, "") },
        { json: "scp_extra_args", js: "scpExtraArgs", typ: u(undefined, "") },
        { json: "sftp_extra_args", js: "sftpExtraArgs", typ: u(undefined, "") },
        { json: "skip_tags", js: "skipTags", typ: u(undefined, "") },
        { json: "sleep", js: "sleep", typ: u(undefined, "") },
        { json: "ssh_common_args", js: "sshCommonArgs", typ: u(undefined, "") },
        { json: "tags", js: "tags", typ: u(undefined, "") },
        { json: "timeout", js: "timeout", typ: u(undefined, "") },
        { json: "url", js: "url", typ: "" },
        { json: "vault_id", js: "vaultID", typ: u(undefined, "") },
        { json: "vault_password_file", js: "vaultPasswordFile", typ: u(undefined, "") },
        { json: "verify_commit", js: "verifyCommit", typ: u(undefined, true) },
    ], false),
    "SetupController": o([
        { json: "repositories", js: "repositories", typ: u(undefined, a(r("Repository"))) },
        { json: "run_ansible", js: "runAnsible", typ: u(undefined, a(r("RunAnsible"))) },
    ], false),
    "Repository": o([
        { json: "path", js: "path", typ: "" },
        { json: "source", js: "source", typ: "" },
    ], false),
    "RunAnsible": o([
        { json: "args", js: "args", typ: u(undefined, "") },
        { json: "background", js: "background", typ: u(undefined, 3.14) },
        { json: "become_password_file", js: "becomePasswordFile", typ: u(undefined, "") },
        { json: "check", js: "check", typ: u(undefined, true) },
        { json: "connection", js: "connection", typ: u(undefined, "") },
        { json: "connection_password_file", js: "connectionPasswordFile", typ: u(undefined, "") },
        { json: "diff", js: "diff", typ: u(undefined, true) },
        { json: "extra_vars", js: "extraVars", typ: u(undefined, "") },
        { json: "forks", js: "forks", typ: u(undefined, 3.14) },
        { json: "inventory", js: "inventory", typ: u(undefined, "") },
        { json: "list_hosts", js: "listHosts", typ: u(undefined, true) },
        { json: "module_name", js: "moduleName", typ: u(undefined, "") },
        { json: "module_path", js: "modulePath", typ: u(undefined, "") },
        { json: "playbook_dir", js: "playbookDir", typ: u(undefined, "") },
        { json: "playbook_name", js: "playbookName", typ: u(undefined, "") },
        { json: "poll", js: "poll", typ: u(undefined, 3.14) },
        { json: "private_key", js: "privateKey", typ: u(undefined, "") },
        { json: "scp_extra_args", js: "scpExtraArgs", typ: u(undefined, "") },
        { json: "sftp_extra_args", js: "sftpExtraArgs", typ: u(undefined, "") },
        { json: "skip_tags", js: "skipTags", typ: u(undefined, "") },
        { json: "sleep", js: "sleep", typ: u(undefined, "") },
        { json: "syntax_check", js: "syntaxCheck", typ: u(undefined, true) },
        { json: "tags", js: "tags", typ: u(undefined, "") },
        { json: "timeout", js: "timeout", typ: u(undefined, 3.14) },
        { json: "vault_id", js: "vaultID", typ: u(undefined, "") },
        { json: "vault_password_file", js: "vaultPasswordFile", typ: u(undefined, "") },
    ], "any"),
    "ApkRepos": o([
        { json: "alpine_repo", js: "alpineRepo", typ: u(undefined, u(r("AlpineRepo"), null)) },
        { json: "local_repo_base_url", js: "localRepoBaseURL", typ: u(undefined, "") },
        { json: "preserve_repositories", js: "preserveRepositories", typ: u(undefined, true) },
    ], false),
    "AlpineRepo": o([
        { json: "base_url", js: "baseURL", typ: u(undefined, "") },
        { json: "community_enabled", js: "communityEnabled", typ: u(undefined, true) },
        { json: "testing_enabled", js: "testingEnabled", typ: u(undefined, true) },
        { json: "version", js: "version", typ: "" },
    ], false),
    "Apt": o([
        { json: "add_apt_repo_match", js: "addAptRepoMatch", typ: u(undefined, "") },
        { json: "conf", js: "conf", typ: u(undefined, "") },
        { json: "debconf_selections", js: "debconfSelections", typ: u(undefined, r("DebconfSelections")) },
        { json: "disable_suites", js: "disableSuites", typ: u(undefined, a("")) },
        { json: "ftp_proxy", js: "ftpProxy", typ: u(undefined, "") },
        { json: "http_proxy", js: "httpProxy", typ: u(undefined, "") },
        { json: "https_proxy", js: "httpsProxy", typ: u(undefined, "") },
        { json: "preserve_sources_list", js: "preserveSourcesList", typ: u(undefined, true) },
        { json: "primary", js: "primary", typ: u(undefined, a(r("PrimaryElement"))) },
        { json: "proxy", js: "proxy", typ: u(undefined, "") },
        { json: "security", js: "security", typ: u(undefined, a(r("PrimaryElement"))) },
        { json: "sources", js: "sources", typ: u(undefined, r("Sources")) },
        { json: "sources_list", js: "sourcesList", typ: u(undefined, "") },
    ], false),
    "DebconfSelections": o([
    ], false),
    "PrimaryElement": o([
        { json: "arches", js: "arches", typ: a("") },
        { json: "key", js: "key", typ: u(undefined, "") },
        { json: "keyid", js: "keyid", typ: u(undefined, "") },
        { json: "keyserver", js: "keyserver", typ: u(undefined, "") },
        { json: "search", js: "search", typ: u(undefined, a("")) },
        { json: "search_dns", js: "searchDNS", typ: u(undefined, true) },
        { json: "uri", js: "uri", typ: u(undefined, "") },
    ], false),
    "Sources": o([
    ], false),
    "Autoinstall": o([
        { json: "version", js: "version", typ: 0 },
    ], "any"),
    "CACerts": o([
        { json: "remove-defaults", js: "removeDefaults", typ: u(undefined, true) },
        { json: "remove_defaults", js: "caCertsRemoveDefaults", typ: u(undefined, true) },
        { json: "trusted", js: "trusted", typ: u(undefined, a("")) },
    ], false),
    "Chef": o([
        { json: "chef_license", js: "chefLicense", typ: u(undefined, r("ChefLicense")) },
        { json: "client_key", js: "clientKey", typ: u(undefined, "") },
        { json: "config_path", js: "configPath", typ: u(undefined, "") },
        { json: "directories", js: "directories", typ: u(undefined, a("")) },
        { json: "encrypted_data_bag_secret", js: "encryptedDataBagSecret", typ: u(undefined, "") },
        { json: "environment", js: "environment", typ: u(undefined, "") },
        { json: "exec", js: "exec", typ: u(undefined, true) },
        { json: "file_backup_path", js: "fileBackupPath", typ: u(undefined, "") },
        { json: "file_cache_path", js: "fileCachePath", typ: u(undefined, "") },
        { json: "firstboot_path", js: "firstbootPath", typ: u(undefined, "") },
        { json: "force_install", js: "forceInstall", typ: u(undefined, true) },
        { json: "initial_attributes", js: "initialAttributes", typ: u(undefined, m("any")) },
        { json: "install_type", js: "installType", typ: u(undefined, r("ChefInstallType")) },
        { json: "json_attribs", js: "jsonAttribs", typ: u(undefined, "") },
        { json: "log_level", js: "logLevel", typ: u(undefined, "") },
        { json: "log_location", js: "logLocation", typ: u(undefined, "") },
        { json: "node_name", js: "nodeName", typ: u(undefined, "") },
        { json: "omnibus_url", js: "omnibusURL", typ: u(undefined, "") },
        { json: "omnibus_url_retries", js: "omnibusURLRetries", typ: u(undefined, 0) },
        { json: "omnibus_version", js: "omnibusVersion", typ: u(undefined, "") },
        { json: "pid_file", js: "pidFile", typ: u(undefined, "") },
        { json: "run_list", js: "runList", typ: u(undefined, a("")) },
        { json: "server_url", js: "serverURL", typ: u(undefined, "") },
        { json: "show_time", js: "showTime", typ: u(undefined, true) },
        { json: "ssl_verify_mode", js: "sslVerifyMode", typ: u(undefined, "") },
        { json: "validation_cert", js: "validationCERT", typ: u(undefined, "") },
        { json: "validation_key", js: "validationKey", typ: u(undefined, "") },
        { json: "validation_name", js: "validationName", typ: u(undefined, "") },
    ], false),
    "Chpasswd": o([
        { json: "expire", js: "expire", typ: u(undefined, true) },
        { json: "list", js: "list", typ: u(undefined, u(a(""), "")) },
        { json: "users", js: "users", typ: u(undefined, a(r("UserClass"))) },
    ], false),
    "UserClass": o([
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: u(undefined, r("Type")) },
        { json: "password", js: "password", typ: u(undefined, "") },
    ], false),
    "GrubDpkg": o([
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
        { json: "grub-efi/install_devices", js: "grubEFIInstallDevices", typ: u(undefined, "") },
        { json: "grub-pc/install_devices", js: "grubPCInstallDevices", typ: u(undefined, "") },
        { json: "grub-pc/install_devices_empty", js: "grubPCInstallDevicesEmpty", typ: u(undefined, u(true, "")) },
    ], false),
    "DeviceAliases": o([
    ], false),
    "DiskSetup": o([
    ], false),
    "Drivers": o([
        { json: "nvidia", js: "nvidia", typ: u(undefined, r("Nvidia")) },
    ], false),
    "Nvidia": o([
        { json: "license-accepted", js: "licenseAccepted", typ: true },
        { json: "version", js: "version", typ: u(undefined, "") },
    ], false),
    "Fan": o([
        { json: "config", js: "config", typ: "" },
        { json: "config_path", js: "configPath", typ: u(undefined, "") },
    ], false),
    "FSSetup": o([
        { json: "cmd", js: "cmd", typ: u(undefined, u(a(""), "")) },
        { json: "device", js: "device", typ: u(undefined, "") },
        { json: "extra_opts", js: "extraOpts", typ: u(undefined, u(a(""), "")) },
        { json: "filesystem", js: "filesystem", typ: u(undefined, "") },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "overwrite", js: "overwrite", typ: u(undefined, true) },
        { json: "partition", js: "partition", typ: u(undefined, r("PartitionEnum")) },
        { json: "replace_fs", js: "replaceFS", typ: u(undefined, "") },
    ], false),
    "GroupsClass": o([
    ], false),
    "Growpart": o([
        { json: "devices", js: "devices", typ: u(undefined, a("")) },
        { json: "ignore_growroot_disabled", js: "ignoreGrowrootDisabled", typ: u(undefined, true) },
        { json: "mode", js: "mode", typ: u(undefined, u(true, r("ModeMode"))) },
    ], false),
    "Keyboard": o([
        { json: "layout", js: "layout", typ: "" },
        { json: "model", js: "model", typ: u(undefined, "") },
        { json: "options", js: "options", typ: u(undefined, "") },
        { json: "variant", js: "variant", typ: u(undefined, "") },
    ], false),
    "Landscape": o([
        { json: "client", js: "client", typ: r("Client") },
    ], false),
    "Client": o([
        { json: "account_name", js: "accountName", typ: "" },
        { json: "computer_title", js: "computerTitle", typ: "" },
        { json: "data_path", js: "dataPath", typ: u(undefined, "") },
        { json: "http_proxy", js: "httpProxy", typ: u(undefined, "") },
        { json: "https_proxy", js: "httpsProxy", typ: u(undefined, "") },
        { json: "log_level", js: "logLevel", typ: u(undefined, r("LogLevel")) },
        { json: "ping_url", js: "pingURL", typ: u(undefined, "") },
        { json: "registration_key", js: "registrationKey", typ: u(undefined, "") },
        { json: "tags", js: "tags", typ: u(undefined, "") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], "any"),
    "Lxd": o([
        { json: "bridge", js: "bridge", typ: u(undefined, r("Bridge")) },
        { json: "init", js: "init", typ: u(undefined, r("Init")) },
        { json: "preseed", js: "preseed", typ: u(undefined, "") },
    ], false),
    "Bridge": o([
        { json: "domain", js: "domain", typ: u(undefined, "") },
        { json: "ipv4_address", js: "ipv4Address", typ: u(undefined, "") },
        { json: "ipv4_dhcp_first", js: "ipv4DHCPFirst", typ: u(undefined, "") },
        { json: "ipv4_dhcp_last", js: "ipv4DHCPLast", typ: u(undefined, "") },
        { json: "ipv4_dhcp_leases", js: "ipv4DHCPLeases", typ: u(undefined, 0) },
        { json: "ipv4_nat", js: "ipv4Nat", typ: u(undefined, true) },
        { json: "ipv4_netmask", js: "ipv4Netmask", typ: u(undefined, 0) },
        { json: "ipv6_address", js: "ipv6Address", typ: u(undefined, "") },
        { json: "ipv6_nat", js: "ipv6Nat", typ: u(undefined, true) },
        { json: "ipv6_netmask", js: "ipv6Netmask", typ: u(undefined, 0) },
        { json: "mode", js: "mode", typ: r("BridgeMode") },
        { json: "mtu", js: "mtu", typ: u(undefined, 0) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], false),
    "Init": o([
        { json: "network_address", js: "networkAddress", typ: u(undefined, "") },
        { json: "network_port", js: "networkPort", typ: u(undefined, 0) },
        { json: "storage_backend", js: "storageBackend", typ: u(undefined, r("StorageBackend")) },
        { json: "storage_create_device", js: "storageCreateDevice", typ: u(undefined, "") },
        { json: "storage_create_loop", js: "storageCreateLoop", typ: u(undefined, 0) },
        { json: "storage_pool", js: "storagePool", typ: u(undefined, "") },
        { json: "trust_password", js: "trustPassword", typ: u(undefined, "") },
    ], false),
    "Mcollective": o([
        { json: "conf", js: "conf", typ: u(undefined, r("McollectiveConf")) },
    ], false),
    "McollectiveConf": o([
        { json: "private-cert", js: "privateCERT", typ: u(undefined, "") },
        { json: "public-cert", js: "publicCERT", typ: u(undefined, "") },
    ], false),
    "MergeHowElement": o([
        { json: "name", js: "name", typ: r("Name") },
        { json: "settings", js: "settings", typ: a(r("Setting")) },
    ], false),
    "NTP": o([
        { json: "allow", js: "allow", typ: u(undefined, a("")) },
        { json: "config", js: "config", typ: u(undefined, r("NTPConfig")) },
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
        { json: "ntp_client", js: "ntpClient", typ: u(undefined, "") },
        { json: "peers", js: "peers", typ: u(undefined, a("")) },
        { json: "pools", js: "pools", typ: u(undefined, a("")) },
        { json: "servers", js: "servers", typ: u(undefined, a("")) },
    ], false),
    "NTPConfig": o([
        { json: "check_exe", js: "checkExe", typ: u(undefined, "") },
        { json: "confpath", js: "confpath", typ: u(undefined, "") },
        { json: "packages", js: "packages", typ: u(undefined, a("")) },
        { json: "service_name", js: "serviceName", typ: u(undefined, "") },
        { json: "template", js: "template", typ: u(undefined, "") },
    ], false),
    "Output": o([
        { json: "all", js: "all", typ: u(undefined, u(a(""), r("AllClass"), "")) },
        { json: "config", js: "config", typ: u(undefined, u(a(""), r("AllClass"), "")) },
        { json: "final", js: "final", typ: u(undefined, u(a(""), r("AllClass"), "")) },
        { json: "init", js: "init", typ: u(undefined, u(a(""), r("AllClass"), "")) },
    ], false),
    "AllClass": o([
        { json: "error", js: "error", typ: u(undefined, "") },
        { json: "output", js: "output", typ: u(undefined, "") },
    ], false),
    "PackageClass": o([
        { json: "apt", js: "apt", typ: u(undefined, a(u(a(""), ""))) },
        { json: "snap", js: "snap", typ: u(undefined, a(u(a(""), ""))) },
    ], false),
    "PhoneHome": o([
        { json: "post", js: "post", typ: u(undefined, u(a(r("PostElement")), r("PurplePost"))) },
        { json: "tries", js: "tries", typ: u(undefined, 0) },
        { json: "url", js: "url", typ: "" },
    ], false),
    "PowerState": o([
        { json: "condition", js: "condition", typ: u(undefined, u(a("any"), true, "")) },
        { json: "delay", js: "delay", typ: u(undefined, u(0, "")) },
        { json: "message", js: "message", typ: u(undefined, "") },
        { json: "mode", js: "mode", typ: r("PowerStateMode") },
        { json: "timeout", js: "timeout", typ: u(undefined, 0) },
    ], false),
    "Puppet": o([
        { json: "aio_install_url", js: "aioInstallURL", typ: u(undefined, "") },
        { json: "cleanup", js: "cleanup", typ: u(undefined, true) },
        { json: "collection", js: "collection", typ: u(undefined, "") },
        { json: "conf", js: "conf", typ: u(undefined, r("PuppetConf")) },
        { json: "conf_file", js: "confFile", typ: u(undefined, "") },
        { json: "csr_attributes", js: "csrAttributes", typ: u(undefined, r("CsrAttributes")) },
        { json: "csr_attributes_path", js: "csrAttributesPath", typ: u(undefined, "") },
        { json: "exec", js: "exec", typ: u(undefined, true) },
        { json: "exec_args", js: "execArgs", typ: u(undefined, a("")) },
        { json: "install", js: "install", typ: u(undefined, true) },
        { json: "install_type", js: "installType", typ: u(undefined, r("PuppetInstallType")) },
        { json: "package_name", js: "packageName", typ: u(undefined, "") },
        { json: "ssl_dir", js: "sslDir", typ: u(undefined, "") },
        { json: "start_service", js: "startService", typ: u(undefined, true) },
        { json: "version", js: "version", typ: u(undefined, "") },
    ], false),
    "PuppetConf": o([
        { json: "agent", js: "agent", typ: u(undefined, m("any")) },
        { json: "ca_cert", js: "caCERT", typ: u(undefined, "") },
        { json: "main", js: "main", typ: u(undefined, m("any")) },
        { json: "server", js: "server", typ: u(undefined, m("any")) },
        { json: "user", js: "user", typ: u(undefined, m("any")) },
    ], false),
    "CsrAttributes": o([
        { json: "custom_attributes", js: "customAttributes", typ: u(undefined, m("any")) },
        { json: "extension_requests", js: "extensionRequests", typ: u(undefined, m("any")) },
    ], false),
    "RandomSeed": o([
        { json: "command", js: "command", typ: u(undefined, a("")) },
        { json: "command_required", js: "commandRequired", typ: u(undefined, true) },
        { json: "data", js: "data", typ: u(undefined, "") },
        { json: "encoding", js: "encoding", typ: u(undefined, r("RandomSeedEncoding")) },
        { json: "file", js: "file", typ: u(undefined, "") },
    ], false),
    "Reporting": o([
    ], false),
    "ResolvConf": o([
        { json: "domain", js: "domain", typ: u(undefined, "") },
        { json: "nameservers", js: "nameservers", typ: u(undefined, a("any")) },
        { json: "options", js: "options", typ: u(undefined, m("any")) },
        { json: "searchdomains", js: "searchdomains", typ: u(undefined, a("any")) },
        { json: "sortlist", js: "sortlist", typ: u(undefined, a("any")) },
    ], false),
    "RhSubscription": o([
        { json: "activation-key", js: "activationKey", typ: u(undefined, "") },
        { json: "add-pool", js: "addPool", typ: u(undefined, a("")) },
        { json: "auto-attach", js: "autoAttach", typ: u(undefined, true) },
        { json: "disable-repo", js: "disableRepo", typ: u(undefined, a("")) },
        { json: "enable-repo", js: "enableRepo", typ: u(undefined, a("")) },
        { json: "org", js: "org", typ: u(undefined, u(0, "")) },
        { json: "password", js: "password", typ: u(undefined, "") },
        { json: "rhsm-baseurl", js: "rhsmBaseurl", typ: u(undefined, "") },
        { json: "server-hostname", js: "serverHostname", typ: u(undefined, "") },
        { json: "service-level", js: "serviceLevel", typ: u(undefined, "") },
        { json: "username", js: "username", typ: u(undefined, "") },
    ], false),
    "Rsyslog": o([
        { json: "check_exe", js: "checkExe", typ: u(undefined, "") },
        { json: "config_dir", js: "configDir", typ: u(undefined, "") },
        { json: "config_filename", js: "configFilename", typ: u(undefined, "") },
        { json: "configs", js: "configs", typ: u(undefined, a(u(r("ConfigConfig"), ""))) },
        { json: "install_rsyslog", js: "installRsyslog", typ: u(undefined, true) },
        { json: "packages", js: "packages", typ: u(undefined, a("")) },
        { json: "remotes", js: "remotes", typ: u(undefined, m("any")) },
        { json: "service_reload_command", js: "serviceReloadCommand", typ: u(undefined, u(a(""), r("ServiceReloadCommandEnum"))) },
    ], false),
    "ConfigConfig": o([
        { json: "content", js: "content", typ: "" },
        { json: "filename", js: "filename", typ: u(undefined, "") },
    ], false),
    "SaltMinion": o([
        { json: "conf", js: "conf", typ: u(undefined, m("any")) },
        { json: "config_dir", js: "configDir", typ: u(undefined, "") },
        { json: "grains", js: "grains", typ: u(undefined, m("any")) },
        { json: "pkg_name", js: "pkgName", typ: u(undefined, "") },
        { json: "pki_dir", js: "pkiDir", typ: u(undefined, "") },
        { json: "private_key", js: "privateKey", typ: u(undefined, "") },
        { json: "public_key", js: "publicKey", typ: u(undefined, "") },
        { json: "service_name", js: "serviceName", typ: u(undefined, "") },
    ], false),
    "Snap": o([
        { json: "assertions", js: "assertions", typ: u(undefined, u(a(""), m(""))) },
        { json: "commands", js: "commands", typ: u(undefined, u(a(u(a(""), "")), m(u(a(""), "")))) },
    ], false),
    "Spacewalk": o([
        { json: "activation_key", js: "activationKey", typ: u(undefined, "") },
        { json: "proxy", js: "proxy", typ: u(undefined, "") },
        { json: "server", js: "server", typ: u(undefined, "") },
    ], false),
    "SSH": o([
        { json: "emit_keys_to_console", js: "emitKeysToConsole", typ: true },
    ], false),
    "SSHKeys": o([
    ], false),
    "SSHPublishHostkeys": o([
        { json: "blacklist", js: "blacklist", typ: u(undefined, a("")) },
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
    ], false),
    "Swap": o([
        { json: "filename", js: "filename", typ: u(undefined, "") },
        { json: "maxsize", js: "maxsize", typ: u(undefined, u(0, "")) },
        { json: "size", js: "size", typ: u(undefined, u(0, "")) },
    ], false),
    "UbuntuAdvantage": o([
        { json: "config", js: "config", typ: u(undefined, r("ConfigObject")) },
        { json: "enable", js: "enable", typ: u(undefined, a("")) },
        { json: "enable_beta", js: "enableBeta", typ: u(undefined, a("")) },
        { json: "features", js: "features", typ: u(undefined, r("Features")) },
        { json: "token", js: "token", typ: u(undefined, "") },
    ], false),
    "ConfigObject": o([
        { json: "global_apt_http_proxy", js: "globalAptHTTPProxy", typ: u(undefined, u(null, "")) },
        { json: "global_apt_https_proxy", js: "globalAptHTTPSProxy", typ: u(undefined, u(null, "")) },
        { json: "http_proxy", js: "httpProxy", typ: u(undefined, u(null, "")) },
        { json: "https_proxy", js: "httpsProxy", typ: u(undefined, u(null, "")) },
        { json: "ua_apt_http_proxy", js: "uaAptHTTPProxy", typ: u(undefined, u(null, "")) },
        { json: "ua_apt_https_proxy", js: "uaAptHTTPSProxy", typ: u(undefined, u(null, "")) },
    ], "any"),
    "Features": o([
        { json: "disable_auto_attach", js: "disableAutoAttach", typ: u(undefined, true) },
    ], false),
    "Updates": o([
        { json: "network", js: "network", typ: u(undefined, r("Network")) },
    ], false),
    "Network": o([
        { json: "when", js: "when", typ: a(r("When")) },
    ], false),
    "PurpleSchemaCloudConfigV1": o([
        { json: "create-groups", js: "createGroups", typ: u(undefined, true) },
        { json: "create_groups", js: "schemaCloudConfigV1CreateGroups", typ: u(undefined, true) },
        { json: "doas", js: "doas", typ: u(undefined, a("")) },
        { json: "expiredate", js: "expiredate", typ: u(undefined, Date) },
        { json: "gecos", js: "gecos", typ: u(undefined, "") },
        { json: "groups", js: "groups", typ: u(undefined, u(a(""), m("any"), "")) },
        { json: "hashed-passwd", js: "hashedPasswd", typ: u(undefined, "") },
        { json: "hashed_passwd", js: "schemaCloudConfigV1HashedPasswd", typ: u(undefined, "") },
        { json: "homedir", js: "homedir", typ: u(undefined, "") },
        { json: "inactive", js: "inactive", typ: u(undefined, "") },
        { json: "lock-passwd", js: "lockPasswd", typ: u(undefined, true) },
        { json: "lock_passwd", js: "schemaCloudConfigV1LockPasswd", typ: u(undefined, true) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "no-create-home", js: "noCreateHome", typ: u(undefined, true) },
        { json: "no-log-init", js: "noLogInit", typ: u(undefined, true) },
        { json: "no-user-group", js: "noUserGroup", typ: u(undefined, true) },
        { json: "no_create_home", js: "schemaCloudConfigV1NoCreateHome", typ: u(undefined, true) },
        { json: "no_log_init", js: "schemaCloudConfigV1NoLogInit", typ: u(undefined, true) },
        { json: "no_user_group", js: "schemaCloudConfigV1NoUserGroup", typ: u(undefined, true) },
        { json: "passwd", js: "passwd", typ: u(undefined, "") },
        { json: "plain-text-passwd", js: "plainTextPasswd", typ: u(undefined, "") },
        { json: "plain_text_passwd", js: "schemaCloudConfigV1PlainTextPasswd", typ: u(undefined, "") },
        { json: "primary-group", js: "primaryGroup", typ: u(undefined, "") },
        { json: "primary_group", js: "schemaCloudConfigV1PrimaryGroup", typ: u(undefined, "") },
        { json: "selinux-user", js: "selinuxUser", typ: u(undefined, "") },
        { json: "selinux_user", js: "schemaCloudConfigV1SelinuxUser", typ: u(undefined, "") },
        { json: "shell", js: "shell", typ: u(undefined, "") },
        { json: "snapuser", js: "snapuser", typ: u(undefined, "") },
        { json: "ssh-authorized-keys", js: "sshAuthorizedKeys", typ: u(undefined, a("")) },
        { json: "ssh-import-id", js: "sshImportID", typ: u(undefined, a("")) },
        { json: "ssh-redirect-user", js: "sshRedirectUser", typ: u(undefined, true) },
        { json: "ssh_authorized_keys", js: "schemaCloudConfigV1SSHAuthorizedKeys", typ: u(undefined, a("")) },
        { json: "ssh_import_id", js: "schemaCloudConfigV1SSHImportID", typ: u(undefined, a("")) },
        { json: "ssh_redirect_user", js: "schemaCloudConfigV1SSHRedirectUser", typ: u(undefined, true) },
        { json: "sudo", js: "sudo", typ: u(undefined, u(a(u(null, "")), true, null, "")) },
        { json: "system", js: "system", typ: u(undefined, true) },
        { json: "uid", js: "uid", typ: u(undefined, u(0, "")) },
    ], false),
    "FluffySchemaCloudConfigV1": o([
        { json: "create-groups", js: "createGroups", typ: u(undefined, true) },
        { json: "create_groups", js: "schemaCloudConfigV1CreateGroups", typ: u(undefined, true) },
        { json: "doas", js: "doas", typ: u(undefined, a("")) },
        { json: "expiredate", js: "expiredate", typ: u(undefined, Date) },
        { json: "gecos", js: "gecos", typ: u(undefined, "") },
        { json: "groups", js: "groups", typ: u(undefined, u(a(""), m("any"), "")) },
        { json: "hashed-passwd", js: "hashedPasswd", typ: u(undefined, "") },
        { json: "hashed_passwd", js: "schemaCloudConfigV1HashedPasswd", typ: u(undefined, "") },
        { json: "homedir", js: "homedir", typ: u(undefined, "") },
        { json: "inactive", js: "inactive", typ: u(undefined, "") },
        { json: "lock-passwd", js: "lockPasswd", typ: u(undefined, true) },
        { json: "lock_passwd", js: "schemaCloudConfigV1LockPasswd", typ: u(undefined, true) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "no-create-home", js: "noCreateHome", typ: u(undefined, true) },
        { json: "no-log-init", js: "noLogInit", typ: u(undefined, true) },
        { json: "no-user-group", js: "noUserGroup", typ: u(undefined, true) },
        { json: "no_create_home", js: "schemaCloudConfigV1NoCreateHome", typ: u(undefined, true) },
        { json: "no_log_init", js: "schemaCloudConfigV1NoLogInit", typ: u(undefined, true) },
        { json: "no_user_group", js: "schemaCloudConfigV1NoUserGroup", typ: u(undefined, true) },
        { json: "passwd", js: "passwd", typ: u(undefined, "") },
        { json: "plain-text-passwd", js: "plainTextPasswd", typ: u(undefined, "") },
        { json: "plain_text_passwd", js: "schemaCloudConfigV1PlainTextPasswd", typ: u(undefined, "") },
        { json: "primary-group", js: "primaryGroup", typ: u(undefined, "") },
        { json: "primary_group", js: "schemaCloudConfigV1PrimaryGroup", typ: u(undefined, "") },
        { json: "selinux-user", js: "selinuxUser", typ: u(undefined, "") },
        { json: "selinux_user", js: "schemaCloudConfigV1SelinuxUser", typ: u(undefined, "") },
        { json: "shell", js: "shell", typ: u(undefined, "") },
        { json: "snapuser", js: "snapuser", typ: u(undefined, "") },
        { json: "ssh-authorized-keys", js: "sshAuthorizedKeys", typ: u(undefined, a("")) },
        { json: "ssh-import-id", js: "sshImportID", typ: u(undefined, a("")) },
        { json: "ssh-redirect-user", js: "sshRedirectUser", typ: u(undefined, true) },
        { json: "ssh_authorized_keys", js: "schemaCloudConfigV1SSHAuthorizedKeys", typ: u(undefined, a("")) },
        { json: "ssh_import_id", js: "schemaCloudConfigV1SSHImportID", typ: u(undefined, a("")) },
        { json: "ssh_redirect_user", js: "schemaCloudConfigV1SSHRedirectUser", typ: u(undefined, true) },
        { json: "sudo", js: "sudo", typ: u(undefined, u(a(u(null, "")), true, null, "")) },
        { json: "system", js: "system", typ: u(undefined, true) },
        { json: "uid", js: "uid", typ: u(undefined, u(0, "")) },
    ], false),
    "VendorData": o([
        { json: "enabled", js: "enabled", typ: u(undefined, u(true, "")) },
        { json: "prefix", js: "prefix", typ: u(undefined, u(a(u(0, "")), "")) },
    ], false),
    "Wireguard": o([
        { json: "interfaces", js: "interfaces", typ: a(r("Interface")) },
        { json: "readinessprobe", js: "readinessprobe", typ: u(undefined, a("")) },
    ], false),
    "Interface": o([
        { json: "config_path", js: "configPath", typ: u(undefined, "") },
        { json: "content", js: "content", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], false),
    "WriteFile": o([
        { json: "append", js: "append", typ: u(undefined, true) },
        { json: "content", js: "content", typ: u(undefined, "") },
        { json: "defer", js: "defer", typ: u(undefined, true) },
        { json: "encoding", js: "encoding", typ: u(undefined, r("WriteFileEncoding")) },
        { json: "owner", js: "owner", typ: u(undefined, "") },
        { json: "path", js: "path", typ: "" },
        { json: "permissions", js: "permissions", typ: u(undefined, "") },
        { json: "source", js: "source", typ: u(undefined, r("Source")) },
    ], false),
    "Source": o([
        { json: "headers", js: "headers", typ: u(undefined, m("")) },
        { json: "uri", js: "uri", typ: "" },
    ], false),
    "YumRepos": o([
    ], false),
    "Zypper": o([
        { json: "config", js: "config", typ: u(undefined, m("any")) },
        { json: "repos", js: "repos", typ: u(undefined, a(r("Repo"))) },
    ], "any"),
    "Repo": o([
        { json: "baseurl", js: "baseurl", typ: "" },
        { json: "id", js: "id", typ: "" },
    ], "any"),
    "InstallMethod": [
        "distro",
        "pip",
    ],
    "AnsibleConfig": [
        "none",
        "os",
        "unchanged",
    ],
    "ByobuByDefault": [
        "disable",
        "disable-system",
        "disable-user",
        "enable",
        "enable-system",
        "enable-user",
        "system",
        "user",
    ],
    "ChefLicense": [
        "accept",
        "accept-no-persist",
        "accept-silent",
    ],
    "ChefInstallType": [
        "gems",
        "omnibus",
        "packages",
    ],
    "Type": [
        "hash",
        "RANDOM",
        "text",
    ],
    "CloudConfigModuleEnum": [
        "ansible",
        "apk-configure",
        "apt-configure",
        "apt-pipelining",
        "bootcmd",
        "byobu",
        "ca-certs",
        "chef",
        "disable-ec2-metadata",
        "disk-setup",
        "fan",
        "final-message",
        "growpart",
        "grub-dpkg",
        "install-hotplug",
        "keyboard",
        "keys-to-console",
        "landscape",
        "locale",
        "lxd",
        "mcollective",
        "mounts",
        "ntp",
        "package-update-upgrade-install",
        "phone-home",
        "power-state-change",
        "puppet",
        "reset-rmc",
        "resizefs",
        "resolv-conf",
        "rh-subscription",
        "rsyslog",
        "runcmd",
        "ssh",
        "ssh-authkey-fingerprints",
        "ssh-import-id",
        "salt-minion",
        "apk_configure",
        "apt_configure",
        "apt_pipelining",
        "ca_certs",
        "disable_ec2_metadata",
        "disk_setup",
        "final_message",
        "grub_dpkg",
        "install_hotplug",
        "keys_to_console",
        "package_update_upgrade_install",
        "phone_home",
        "power_state_change",
        "reset_rmc",
        "resolv_conf",
        "rh_subscription",
        "ssh_authkey_fingerprints",
        "ssh_import_id",
        "salt_minion",
        "scripts_per_boot",
        "scripts_per_instance",
        "scripts_per_once",
        "scripts_user",
        "scripts_vendor",
        "seed_random",
        "set_hostname",
        "set_passwords",
        "ubuntu_advantage",
        "ubuntu_autoinstall",
        "ubuntu_drivers",
        "update_etc_hosts",
        "update_hostname",
        "users_groups",
        "write_files",
        "write_files_deferred",
        "yum_add_repo",
        "zypper_add_repo",
        "scripts-per-boot",
        "scripts-per-instance",
        "scripts-per-once",
        "scripts-user",
        "scripts-vendor",
        "seed-random",
        "set-hostname",
        "set-passwords",
        "snap",
        "spacewalk",
        "timezone",
        "ubuntu-advantage",
        "ubuntu-autoinstall",
        "ubuntu-drivers",
        "ubuntu_pro",
        "update-etc-hosts",
        "update-hostname",
        "users-groups",
        "wireguard",
        "write-files",
        "write-files-deferred",
        "yum-add-repo",
        "zypper-add-repo",
    ],
    "PartitionEnum": [
        "any",
        "auto",
        "none",
    ],
    "ModeMode": [
        "auto",
        "gpart",
        "growpart",
        "off",
    ],
    "LogLevel": [
        "critical",
        "debug",
        "error",
        "info",
        "warning",
    ],
    "BridgeMode": [
        "existing",
        "new",
        "none",
    ],
    "StorageBackend": [
        "btrfs",
        "dir",
        "lvm",
        "zfs",
    ],
    "ManageEtcHostsEnum": [
        "localhost",
        "template",
    ],
    "Name": [
        "dict",
        "list",
        "str",
    ],
    "Setting": [
        "allow_delete",
        "append",
        "no_replace",
        "prepend",
        "recurse_array",
        "recurse_dict",
        "recurse_list",
        "recurse_str",
        "replace",
    ],
    "PostElement": [
        "fqdn",
        "hostname",
        "instance_id",
        "pub_key_ecdsa",
        "pub_key_ed25519",
        "pub_key_rsa",
    ],
    "PurplePost": [
        "all",
    ],
    "PowerStateMode": [
        "halt",
        "poweroff",
        "reboot",
    ],
    "PuppetInstallType": [
        "aio",
        "packages",
    ],
    "RandomSeedEncoding": [
        "b64",
        "base64",
        "gz",
        "gzip",
        "raw",
    ],
    "ResizeRootfsEnum": [
        "noblock",
    ],
    "ServiceReloadCommandEnum": [
        "auto",
    ],
    "SSHGenkeytype": [
        "ecdsa",
        "ed25519",
        "rsa",
    ],
    "When": [
        "boot",
        "boot-legacy",
        "boot-new-instance",
        "hotplug",
    ],
    "Version": [
        "v1",
    ],
    "WriteFileEncoding": [
        "b64",
        "base64",
        "gz",
        "gz+b64",
        "gz+base64",
        "gzip",
        "gzip+b64",
        "gzip+base64",
        "text/plain",
    ],
};
