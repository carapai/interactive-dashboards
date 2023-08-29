import { Stack } from "@chakra-ui/react";
import { useMatch } from "@tanstack/react-location";
import { useStore } from "effector-react";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { LocationGenerics } from "../../interfaces";
import { $dashboard, $dashboardType, $settings, $store } from "../../Store";
import AdminPanel from "../AdminPanel";
import DynamicDashboard from "../DynamicDashboard";
import FixedDashboard from "../FixedDashboard";

const Dashboard = () => {
    const tbl = useRef<HTMLDivElement>(null);

    const store = useStore($store);
    const dashboard = useStore($dashboard);
    const dashboardType = useStore($dashboardType);
    const settings = useStore($settings);
    const {
        params: { templateId },
    } = useMatch<LocationGenerics>();

    useHotkeys("p", async () => {
        if (tbl.current) {
            html2canvas(tbl.current).then((canvas) => {
                const imageData: any = canvas.toDataURL("img/png");
                const report = new JsPDF("p", "px", [
                    canvas.width + 20,
                    canvas.height + 20,
                ]);
                report.addImage(
                    imageData,
                    "PNG",
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                report.save("download.pdf");
            });
        }
    });

    const padding =
        (store.isAdmin && dashboard.id === settings.template) || !templateId
            ? dashboard.spacing
            : 0;
    return (
        <Stack
            w={store.isFullScreen ? "100vw" : "100%"}
            h={store.isFullScreen ? "100vh" : "100%"}
            bg={dashboard.bg}
            spacing="0"
            p={`${padding}px`}
            id={dashboard.id}
            ref={tbl}
        >
            {((store.isAdmin && dashboard.id === settings.template) ||
                !templateId) && <AdminPanel />}

            {dashboardType === "dynamic" ? (
                <DynamicDashboard />
            ) : (
                <FixedDashboard dashboard={dashboard} />
            )}
        </Stack>
    );
};

export default Dashboard;
