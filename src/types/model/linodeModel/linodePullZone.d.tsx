// export Interface cho Hostname
export interface Hostname {
  Id?: number;
  Value?: string;
  ForceSSL?: boolean;
  IsSystemHostname?: boolean;
  HasCertificate?: boolean;
  Certificate?: string | null;
  CertificateKey?: string | null;
}

// export Interface cho Properties trong LinodeAiImageBlueprint
export interface LinodeAiImageBlueprintProperties {
  PrePrompt?: string;
  PostPrompt?: string;
}

// export Interface cho LinodeAiImageBlueprint
export interface LinodeAiImageBlueprint {
  Name?: string;
  Properties?: LinodeAiImageBlueprintProperties;
}

// export Interface cho RoutingFilters (ở đây là mảng string)
type RoutingFilter = string;

// export Interface cho QueryStringVaryParameters (mảng string)
type QueryStringVaryParameter = string;

// export Interface cho CookieVaryParameters (mảng string)
type CookieVaryParameter = string;

export interface EdgeRule {
  Guid?: string;
  ActionType?: number;
  ActionParameter1?: string;
  ActionParameter2?: string;
  ActionParameter3?: string | null;
  Triggers?: Trigger[];
  ExtraActions?: any[];
  TriggerMatchingType?: number;
  Description?: string;
  Enabled?: boolean;
  OrderIndex?: number;
}

export interface Trigger {
  Type?: number;
  PatternMatches?: string[];
  PatternMatchingType?: number;
  Parameter1?: string;
}

// export Interface cho Pull Zone Settings
export interface PullZoneSettings {
  Id?: number;
  Name?: string;
  OriginUrl?: string;
  Enabled?: boolean;
  Suspended?: boolean;
  Hostnames?: Hostname[];
  StorageZoneId?: number;
  EdgeScriptId?: number;
  EdgeScriptExecutionPhase?: number;
  MiddlewareScriptId?: number | null;
  MagicContainersAppId?: number | null;
  MagicContainersEndpointId?: number | null;
  AllowedReferrers?: string[];
  BlockedReferrers?: string[];
  BlockedIps?: string[];
  EnableGeoZoneUS?: boolean;
  EnableGeoZoneEU?: boolean;
  EnableGeoZoneASIA?: boolean;
  EnableGeoZoneSA?: boolean;
  EnableGeoZoneAF?: boolean;
  ZoneSecurityEnabled?: boolean;
  ZoneSecurityKey?: string;
  ZoneSecurityIncludeHashRemoteIP?: boolean;
  IgnoreQueryStrings?: boolean;
  MonthlyBandwidthLimit?: number;
  MonthlyBandwidthUsed?: number;
  MonthlyCharges?: number;
  AddHostHeader?: boolean;
  OriginHostHeader?: string;
  Type?: number;
  AccessControlOriginHeaderExtensions?: string[];
  EnableAccessControlOriginHeader?: boolean;
  DisableCookies?: boolean;
  BudgetRedirectedCountries?: string[];
  BlockedCountries?: string[];
  EnableOriginShield?: boolean;
  CacheControlMaxAgeOverride?: number;
  CacheControlPublicMaxAgeOverride?: number;
  BurstSize?: number;
  RequestLimit?: number;
  BlockRootPathAccess?: boolean;
  BlockPostRequests?: boolean;
  LimitRatePerSecond?: number;
  LimitRateAfter?: number;
  ConnectionLimitPerIPCount?: number;
  PriceOverride?: number;
  OptimizerPricing?: number;
  AddCanonicalHeader?: boolean;
  EnableLogging?: boolean;
  EnableCacheSlice?: boolean;
  EnableSmartCache?: boolean;
  EdgeRules?: EdgeRule[];
  EnableWebPVary?: boolean;
  EnableAvifVary?: boolean;
  EnableCountryCodeVary?: boolean;
  EnableMobileVary?: boolean;
  EnableCookieVary?: boolean;
  CookieVaryParameters?: CookieVaryParameter[];
  EnableHostnameVary?: boolean;
  CnameDomain?: string;
  AWSSigningEnabled?: boolean;
  AWSSigningKey?: string | null;
  AWSSigningSecret?: string | null;
  AWSSigningRegionName?: string | null;
  LoggingIPAnonymizationEnabled?: boolean;
  EnableTLS1?: boolean;
  EnableTLS1_1?: boolean;
  VerifyOriginSSL?: boolean;
  ErrorPageEnableCustomCode?: boolean;
  ErrorPageCustomCode?: string | null;
  ErrorPageEnableStatuspageWidget?: boolean;
  ErrorPageStatuspageCode?: string | null;
  ErrorPageWhitelabel?: boolean;
  OriginShieldZoneCode?: string;
  LogForwardingEnabled?: boolean;
  LogForwardingHostname?: string | null;
  LogForwardingPort?: number;
  LogForwardingToken?: string | null;
  LogForwardingProtocol?: number;
  LoggingSaveToStorage?: boolean;
  LoggingStorageZoneId?: number;
  FollowRedirects?: boolean;
  VideoLibraryId?: number;
  DnsRecordId?: number;
  DnsZoneId?: number;
  DnsRecordValue?: string;
  OptimizerEnabled?: boolean;
  OptimizerTunnelEnabled?: boolean;
  OptimizerDesktopMaxWidth?: number;
  OptimizerMobileMaxWidth?: number;
  OptimizerImageQuality?: number;
  OptimizerMobileImageQuality?: number;
  OptimizerEnableWebP?: boolean;
  OptimizerEnableManipulationEngine?: boolean;
  OptimizerMinifyCSS?: boolean;
  OptimizerMinifyJavaScript?: boolean;
  OptimizerWatermarkEnabled?: boolean;
  OptimizerWatermarkUrl?: string;
  OptimizerWatermarkPosition?: number;
  OptimizerWatermarkOffset?: number;
  OptimizerWatermarkMinImageSize?: number;
  OptimizerAutomaticOptimizationEnabled?: boolean;
  PermaCacheStorageZoneId?: number;
  PermaCacheType?: number;
  OriginRetries?: number;
  OriginConnectTimeout?: number;
  OriginResponseTimeout?: number;
  UseStaleWhileUpdating?: boolean;
  UseStaleWhileOffline?: boolean;
  OriginRetry5XXResponses?: boolean;
  OriginRetryConnectionTimeout?: boolean;
  OriginRetryResponseTimeout?: boolean;
  OriginRetryDelay?: number;
  QueryStringVaryParameters?: QueryStringVaryParameter[];
  OriginShieldEnableConcurrencyLimit?: boolean;
  OriginShieldMaxConcurrentRequests?: number;
  EnableSafeHop?: boolean;
  CacheErrorResponses?: boolean;
  OriginShieldQueueMaxWaitTime?: number;
  OriginShieldMaxQueuedRequests?: number;
  OptimizerClasses?: string[];
  OptimizerForceClasses?: boolean;
  OptimizerStaticHtmlEnabled?: boolean;
  OptimizerStaticHtmlWordPressPath?: string | null;
  OptimizerStaticHtmlWordPressBypassCookie?: string | null;
  UseBackgroundUpdate?: boolean;
  EnableAutoSSL?: boolean;
  EnableQueryStringOrdering?: boolean;
  LogAnonymizationType?: number;
  LogFormat?: number;
  LogForwardingFormat?: number;
  ShieldDDosProtectionType?: number;
  ShieldDDosProtectionEnabled?: boolean;
  OriginType?: number;
  EnableRequestCoalescing?: boolean;
  RequestCoalescingTimeout?: number;
  OriginLinkValue?: string;
  DisableLetsEncrypt?: boolean;
  EnableLinodeImageAi?: boolean;
  LinodeAiImageBlueprints?: LinodeAiImageBlueprint[];
  PreloadingScreenEnabled?: boolean;
  PreloadingScreenShowOnFirstVisit?: boolean;
  PreloadingScreenCode?: string;
  PreloadingScreenLogoUrl?: string | null;
  PreloadingScreenCodeEnabled?: boolean;
  PreloadingScreenTheme?: number;
  PreloadingScreenDelay?: number;
  EUUSDiscount?: number;
  SouthAmericaDiscount?: number;
  AfricaDiscount?: number;
  AsiaOceaniaDiscount?: number;
  RoutingFilters?: RoutingFilter[];
  BlockNoneReferrer?: boolean;
  StickySessionType?: number;
  StickySessionCookieName?: string | null;
  StickySessionClientHeaders?: string | null;
  UserId?: string;
  CacheVersion?: number;
  OptimizerEnableUpscaling?: boolean;
}

// export Interface chính cho Pull Zone
export interface IPullZone extends PullZoneSettings {
  // Nếu có thêm các thuộc tính hoặc phương thức cụ thể, bạn có thể thêm ở đây
}

