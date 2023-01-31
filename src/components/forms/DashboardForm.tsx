import { Spinner, Stack, Text } from "@chakra-ui/react";
import { useMatch } from "@tanstack/react-location";
import { useStore } from "effector-react";
import { LocationGenerics } from "../../interfaces";
import { useDashboard } from "../../Queries";
import { $store } from "../../Store";
import Dashboard from "./Dashboard";

export default function DashboardForm() {
  const store = useStore($store);
  const {
    params: { dashboardId },
  } = useMatch<LocationGenerics>();
  const { isLoading, isSuccess, isError, error } = useDashboard(
    dashboardId,
    store.systemId,
    store.refresh
  );
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
      alignContent="center"
      h="100%"
      w="100%"
    >
      {isLoading && <Spinner />}
      {isSuccess && <Dashboard />}
      {isError && <Text>No data/Error occurred</Text>}
    </Stack>
  );
}
