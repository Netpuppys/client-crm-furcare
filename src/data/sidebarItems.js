import calendar from "../Assets/icons/sidebar/Calendar.png";
import calendarDark from "../Assets/icons/sidebar/CalendarDark.png";
import clientAndPatient from "../Assets/icons/sidebar/clientAndPatient.png";
import clientAndPatientDark from "../Assets/icons/sidebar/clientAndPatientDark.png";
import community from "../Assets/icons/sidebar/Community.png";
import communityDark from "../Assets/icons/sidebar/CommunityDark.png";
import contactCenterAdmin from "../Assets/icons/sidebar/ContactCenterAdmin.png";
import contactCenterAdminDark from "../Assets/icons/sidebar/ContactCenterAdminDark.png";
import dataTable from "../Assets/icons/sidebar/DataTable.png";
import dataTableDark from "../Assets/icons/sidebar/DataTableDark.png";
import inventory from "../Assets/icons/sidebar/Inventory.png";
import inventoryDark from "../Assets/icons/sidebar/InventoryDark.png";
import social from "../Assets/icons/sidebar/Social.png";
import socialDark from "../Assets/icons/sidebar/SocialDark.png";

const sidebarItems = [
    {
      name: "Admin",
      linkTo: "/admin",
      icon: contactCenterAdmin,
      darkIcon: contactCenterAdminDark,
      subItems: [
        { name: "Animal Classes", linkTo: "/admin/animal-classes" },
        { name: "Business Units", linkTo: "/admin/branch-units" },
        // { name: "Config Management", linkTo: "/admin/config-management" },
        { name: "Content Library", linkTo: "/admin/content-library" },
        { name: "Diagnostic Integrations", linkTo: "/admin/diagnostic-integrations" },
        { name: "Document Templates", linkTo: "/admin/document-templates" },
        { name: "Groups Management", linkTo: "/admin/groups-management" },
        { name: "Lead Types", linkTo: "/admin/lead-types" },
        { name: "Report Management", linkTo: "/admin/report-management" },
        { name: "Roles & Permissions", linkTo: "/admin/roles-and-permissions" },
        { name: "Staff Management", linkTo: "/admin/staff-management" },
        { name: "Staff Scheduler", linkTo: "/admin/staff-scheduler" },
        { name: "Supplies Management", linkTo: "/admin/supplies-management" },
        { name: "Settings", linkTo: "/admin/settings" },
      ]
    },
    { 
      name: "Dashboard",
      linkTo: "/dashboard",
      icon: dataTable,
      darkIcon: dataTableDark,
    },
    { 
      name: "Communication",
      linkTo: "/communication",
      icon: social,
      darkIcon: socialDark,
    },
    { 
      name: "Appointments",
      linkTo: "/appointments",
      icon: calendar,
      darkIcon: calendarDark,
    },
    {
      name: "Client & Patient",
      linkTo: "/client-patient",
      icon: clientAndPatient,
      darkIcon: clientAndPatientDark
    },
    {
      name: "Visits",
      linkTo: "/visits",
      icon: community,
      darkIcon: communityDark,
      subItems: [
        { name: "Overview", linkTo: "/visits/overview" },
        { name: "Medical Record", linkTo: "/visits/medical-record" },
        { name: "Diagnostics", linkTo: "/visits/diagnostics" },
        { name: "Orders", linkTo: "/visits/orders" },
        { name: "Care Plans", linkTo: "/visits/care-plans" }
      ]
    },
    { 
      name: "Inventory",
      linkTo: "/inventory",
      icon: inventory,
      darkIcon: inventoryDark,
    }
];

export default sidebarItems;