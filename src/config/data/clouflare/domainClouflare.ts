export enum IZoneStatus {
    initializing = "initializing",
    pending = "pending",
    active = "active",
    moved = "moved",
}

export enum IZoneType {
    FULL = "full",
    PARTIAL = "partial",
    SECONDARY = "secondary",
}

export const TypeDNSCloudflare = [
    {
        value: "full",
        label: "full"
    },
    {
        value: "partial",
        label: "partial"
    },
    {
        value: "secondary",
        label: "secondary"
    },
]