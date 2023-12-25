import {generateUniqueId} from "../../utils/helper";
import {
    AccountBalanceRounded,
    AdminPanelSettingsRounded, BadgeRounded, CampaignRounded,
    CircleRounded,
    DashboardRounded, DocumentScannerRounded, FaxRounded, FolderSharedRounded, InventoryRounded,
    PeopleRounded, PunchClockRounded, ReceiptLongRounded,
    SettingsRounded
} from "@mui/icons-material";

const Menus = [
    {
        navLabel: true,
        subheader: 'Home',
    },
    {
        id: generateUniqueId(),
        title: 'Dashboard',
        icon: DashboardRounded,
        href: '/dashboard',
    },
    {
        navLabel: true,
        subheader: 'Company',
        permissions: [9, 10, 19, 20, 23, 24]
    },
    {
        id: generateUniqueId(),
        title: 'Department',
        icon: FaxRounded,
        href: '/department',
        permissions: [19, 20]
    },
    {
        id: generateUniqueId(),
        title: 'Designation',
        icon: FolderSharedRounded,
        href: '/designation',
        permissions: [ 23, 24]
    },
    {
        id: generateUniqueId(),
        title: 'Announcement',
        icon: CampaignRounded,
        href: '/announcement',
        permissions: [9, 10]
    },
    {
        navLabel: true,
        subheader: 'Employee',
    },
    {
        id: generateUniqueId(),
        title: 'Employee',
        icon: BadgeRounded,
        href: '/employee',
        permissions: [31, 32]
    },
    {
        id: generateUniqueId(),
        title: 'Attendance',
        icon: PunchClockRounded,
        href: '/attendance',
        permissions: [13, 14, 17, 18]
    },
    {
        id: generateUniqueId(),
        title: 'Leave',
        icon: InventoryRounded,
        href: '/leave',
        permissions: [40, 41, 44, 45]
    },
    {
        navLabel: true,
        subheader: 'Finance',
        permissions: [27, 28, 35, 36]
    },
    {
        id: generateUniqueId(),
        title: 'Deposit',
        icon: AccountBalanceRounded,
        href: '/deposit',
        permissions: [27, 28]
    },
    {
        id: generateUniqueId(),
        title: 'Expense',
        icon: ReceiptLongRounded,
        href: '/expense',
        permissions: [35, 36]
    },
    {
        navLabel: true,
        subheader: 'Other',
        permissions: [58, 59, 62, 63, 64, 65]
    },
    {
        id: generateUniqueId(),
        title: 'User',
        icon: AdminPanelSettingsRounded,
        href: '/user',
        permissions: [58, 59]
    },
    {
        id: generateUniqueId(),
        title: 'Reports',
        icon: DocumentScannerRounded,
        permissions: [62, 63, 64, 65],
        children: [
            {
                id: generateUniqueId(),
                title: 'Attendance',
                icon: CircleRounded,
                href: '/report-attendance',
                permissions: [62]
            },
            {
                id: generateUniqueId(),
                title: 'Employee',
                icon: CircleRounded,
                href: '/report-employee',
                permissions: [63]
            },
            {
                id: generateUniqueId(),
                title: 'Finance',
                icon: CircleRounded,
                href: '/report-finance',
                permissions: [64, 65]
            },
        ],
    },
    {
        navLabel: true,
        subheader: 'Setting',
        permissions: [46, 47]
    },
    {
        id: generateUniqueId(),
        title: 'Role & Permission',
        icon: PeopleRounded,
        href: '/role',
        permissions: [50, 51, 54, 55]
    },
    {
        id: generateUniqueId(),
        title: 'Settings',
        icon: SettingsRounded,
        href: '/setting',
        permissions: [46, 47],
        children: [
            {
                id: generateUniqueId(),
                title: 'Leave Type',
                icon: CircleRounded,
                href: '/leave-type',
            },
            {
                id: generateUniqueId(),
                title: 'Company',
                icon: CircleRounded,
                href: '/setting',
            },
        ],
    },
];

export default Menus;
