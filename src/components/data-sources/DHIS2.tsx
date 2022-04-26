import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Text,
} from "@chakra-ui/react";
import DataElements from "./DataElements";
import Indicators from "./Indicators";
import SQLViews from "./SQLViews";
import ProgramIndicators from "./ProgramIndicators";
import { IndicatorProps } from "../../interfaces";
import { $indicator } from "../../Store";
import { useStore } from "effector-react";
import OrgUnitTree from "../OrgUnitTree";
import OrganizationUnitGroups from "./OrganisationUnitGroups";
import OrganizationUnitLevels from "./OrganisationUnitLevels";
import Periods from "./Periods";

const DHIS2 = ({ onChange, denNum }: IndicatorProps) => {
  const indicator = useStore($indicator);
  return (
    <Stack>
      {denNum.type === "ANALYTICS" && (
        <Tabs>
          <TabList>
            <Tab>Indicators</Tab>
            {!indicator.useInBuildIndicators && <Tab>Data Elements</Tab>}
            <Tab>Program Indicators</Tab>
            <Tab>Periods</Tab>
            <Tab>Organisation Units</Tab>
            <Tab>Organisation Groups</Tab>
            <Tab>Organisation Levels</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Indicators denNum={denNum} onChange={onChange} />
            </TabPanel>
            {!indicator.useInBuildIndicators && (
              <TabPanel>
                <DataElements denNum={denNum} onChange={onChange} />
              </TabPanel>
            )}
            <TabPanel>
              <ProgramIndicators denNum={denNum} onChange={onChange} />
            </TabPanel>
            <TabPanel>
              <Periods denNum={denNum} onChange={onChange} />
            </TabPanel>
            <TabPanel>
              <OrgUnitTree denNum={denNum} onChange={onChange} />
            </TabPanel>
            <TabPanel>
              <OrganizationUnitGroups denNum={denNum} onChange={onChange} />
            </TabPanel>
            <TabPanel>
              <OrganizationUnitLevels denNum={denNum} onChange={onChange} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
      {denNum.type === "SQL_VIEW" && !indicator.useInBuildIndicators && (
        <SQLViews denNum={denNum} onChange={onChange} />
      )}
      {denNum.type === "OTHER" && <Text>Coming soon</Text>}
    </Stack>
  );
};

export default DHIS2;
