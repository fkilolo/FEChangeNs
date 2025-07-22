import { IZoneStatus, IZoneType } from "@/config/data/clouflare/domainClouflare";
import { IBasic } from "../../base/base.d";

export interface IDomainCloudflare extends IBasic {
    id?: string;
    account?: {
        id?: string;
        name?: string;
    };
    activated_on?: string;
    created_on?: string;
    development_mode?: number;
    meta?: {
        cdn_only?: boolean;
        custom_certificate_quota?: number;
        dns_only?: boolean;
        foundation_dns?: boolean;
        page_rule_quota?: number;
        phishing_detected?: boolean;
        step?: number;
    };
    modified_on?: string;
    name?: string;
    name_servers?: Array<string>;
    original_dnshost?: string;
    original_name_servers?: Array<string>;
    original_registrar?: string;
    owner?: {
        id?: string;
        name?: string;
        type?: string;
    };
    paused?: boolean;
    status?: IZoneStatus;
    type?: IZoneType;
    vanity_name_servers?: Array<string>;
    plan?: {
        can_subscribe?: boolean;
        currency?: string;
        externally_managed?: boolean;
        frequency?: string;
        id?: string;
        is_subscribed?: boolean;
        legacy_discount?: boolean;
        legacy_id?: string;
        name?: string;
        price?: number;
    }
}