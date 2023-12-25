import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, List} from "@mui/material";
import NavGroup from "./NavGroup.jsx";
import NavCollapse from "./NavCollapse.jsx";
import NavItem from "./NavItem.jsx";
import Menus from "../../constants/menus.jsx";
import {setSidebarCollapse} from "../../../store/slices/ThemeSlice";
import {usePage} from "@inertiajs/inertia-react";

const SidebarItems = ({ isMiniSidebar }) => {
    const { props } = usePage();
    const role = props?.profile?.role;
    const permissions = props?.profile?.role?.permissions?.map(e => e.permission_id) ?? [];

    const pathname = location.pathname;
    const pathDirect = pathname.replace('/app', '');
    const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
    const themeSetting = useSelector((state) => state.theme);
    const hideMenu = isMiniSidebar && !themeSetting.isMiniSidebarHover;
    const dispatch = useDispatch();

    return (
        <Box sx={{ px: 2.5, paddingBottom: 2 }}>
            <List sx={{ pt: 0 }} className="sidebarNav">
                {Menus.map((item) => {
                    if (!role?.is_admin && item?.permissions && !item.permissions?.some(val => permissions.includes(val))) {
                        return null;
                    }

                    if (item.subheader) {
                        return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;
                    } else if (item.children) {
                        return (
                            <NavCollapse
                                menu={item}
                                pathDirect={pathDirect}
                                hideMenu={hideMenu}
                                pathWithoutLastPart={pathWithoutLastPart}
                                level={1}
                                key={item.id}
                                onClick={() => dispatch(setSidebarCollapse())}
                            />
                        );
                    } else {
                        return (
                            <NavItem
                                item={item}
                                key={item.id}
                                pathDirect={pathDirect}
                                hideMenu={hideMenu}
                                onClick={() => dispatch(setSidebarCollapse())} />
                        );
                    }
                })}
            </List>
        </Box>
    );
};

export default SidebarItems;
