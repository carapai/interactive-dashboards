import React, { useState, useEffect } from "react";
import { useD2 } from "@dhis2/app-runtime-adapter-d2";
import { Text, Stack } from "@chakra-ui/react";
import { colorSets } from "@dhis2/analytics";
import Plot from "react-plotly.js";

import LoadingIndicator from "../LoadingIndicator";

import { IVisualization } from "../../interfaces";

import {
    getAnalyticsQuery,
    processAnalytics,
    exclusions,
} from "../../utils/utils";
import { fromPairs } from "lodash";

const otherParameters: { [key: string]: { [key: string]: any } } = {
    COLUMN: { barmode: "group" },
    STACKED_COLUMN: { barmode: "stack" },
};

export default function DHIS2Visualization({
    visualization,
}: {
    visualization: IVisualization;
}) {
    const { d2 } = useD2();

    const [viz, setViz] = useState<any>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [colors, setColors] = useState<string[]>(colorSets["DEFAULT"].colors);
    const [series, setSeries] = useState<string[]>([]);
    const [others, setOthers] = useState<{ [key: string]: any }>({});

    const initialize = async () => {
        try {
            if (d2 && visualization.properties["visualization"] !== undefined) {
                setLoading(() => true);
                const api = d2.Api.getApi();
                const data = await api.get(
                    `visualizations/${visualization.properties["visualization"]}`,
                    {
                        fields: "aggregationType,axes,colSubTotals,colTotals,colorSet,columns[dimension,filter,legendSet[id,name,displayName,displayShortName],items[dimensionItem~rename(id),name,displayName,displayShortName,dimensionItemType]],completedOnly,created,cumulative,cumulativeValues,description,digitGroupSeparator,displayDensity,displayDescription,displayName,displayShortName,favorite,favorites,filters[dimension,filter,legendSet[id,name,displayName,displayShortName],items[dimensionItem~rename(id),name,displayName,displayShortName,dimensionItemType]],fixColumnHeaders,fixRowHeaders,fontSize,fontStyle,hideEmptyColumns,hideEmptyRowItems,hideEmptyRows,hideSubtitle,hideTitle,href,id,interpretations[id,created],lastUpdated,lastUpdatedBy,legend[showKey,style,strategy,set[id,name,displayName,displayShortName]],measureCriteria,name,noSpaceBetweenColumns,numberType,outlierAnalysis,parentGraphMap,percentStackedValues,publicAccess,regression,regressionType,reportingParams,rowSubTotals,rowTotals,rows[dimension,filter,legendSet[id,name,displayName,displayShortName],items[dimensionItem~rename(id),name,displayName,displayShortName,dimensionItemType]],series,seriesKey,shortName,showData,showDimensionLabels,showHierarchy,skipRounding,sortOrder,subscribed,subscribers,subtitle,timeField,title,topLimit,translations,type,user[name,displayName,displayShortName,userCredentials[username]],userAccesses,userGroupAccesses,yearlySeries,!attributeDimensions,!attributeValues,!category,!categoryDimensions,!categoryOptionGroupSetDimensions,!code,!columnDimensions,!dataDimensionItems,!dataElementDimensions,!dataElementGroupSetDimensions,!externalAccess,!filterDimensions,!itemOrganisationUnitGroups,!organisationUnitGroupSetDimensions,!organisationUnitLevels,!organisationUnits,!periods,!programIndicatorDimensions,!relativePeriods,!rowDimensions,!userOrganisationUnit,!userOrganisationUnitChildren,!userOrganisationUnitGrandChildren",
                    }
                );
                if (data.colorSet) {
                    setColors(() => colorSets[data.colorSet].colors);
                }

                const currentOthers = otherParameters[data.type || ""] || {};
                const params = getAnalyticsQuery(data);
                const realData = await api.get(`analytics.json?${params}`);
                const actualData = realData.rows.map((row: string[]) => {
                    let others = {};
                    if (realData.metaData && realData.metaData.items) {
                        row.forEach((r, index) => {
                            if (index < row.length - 1) {
                                others = {
                                    ...others,
                                    [`${realData.headers[index].name}-name`]:
                                        realData.metaData.items[r]?.name || "",
                                };
                            }
                        });
                    }
                    return {
                        ...others,
                        ...fromPairs(
                            row.map((value, index) => {
                                const header = realData.headers[index];
                                return [header.name, value];
                            })
                        ),
                    };
                });
                const { data: processed, series } = processAnalytics({
                    data: actualData,
                    dimensions: realData.metaData.dimensions,
                    visualization: data,
                    items: realData.metaData.items,
                });
                setSeries(() => series);
                setViz(() => processed);
                setOthers(() => currentOthers);
                setLoading(() => false);
            }
        } catch (error) {
            setError(() => error.message);
        }
    };
    useEffect(() => {
        initialize();
        return () => {};
    }, [visualization.properties["visualization"], viz?.id, d2]);

    if (error) return <Text>{error}</Text>;
    if (loading) return <LoadingIndicator />;
    if (viz !== undefined)
        return (
            <Stack w="100%" h="100%">
                <Stack flex={1}>
                    <Plot
                        data={viz}
                        layout={{
                            margin: {
                                pad: 5,
                                r: 10,
                                t: 0,
                                l: 50,
                                b: 0,
                            },
                            autosize: true,
                            showlegend: false,
                            colorway: colors,
                            xaxis: {
                                automargin: true,
                                showgrid: false,
                                type: "category",
                            },
                            // barmode: "group",
                            // bargap: 0.15,
                            // bargroupgap: 0.2,
                            ...others,
                        }}
                        style={{ width: "100%", height: "100%" }}
                        config={{
                            displayModeBar: true,
                            responsive: true,
                            toImageButtonOptions: {
                                format: "svg",
                                scale: 1,
                            },

                            modeBarButtonsToRemove: exclusions,
                            displaylogo: false,
                        }}
                    />
                </Stack>
                <Stack direction="row" spacing="20px" justify="center">
                    {series.map((series, index) => (
                        <Stack
                            direction="row"
                            spacing="2px"
                            alignItems="center"
                            key={index}
                        >
                            <Text bgColor={colors[index]} w="10px" h="10px">
                                &nbsp;
                            </Text>
                            <Text noOfLines={[1, 2, 3]}>{series}</Text>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        );
    return null;
}

{
    /* <VisualizationPlugin
    d2={d2}
    visualization={viz}
    forDashboard={true}
    style={{
        width: "700px",
        height: "700px",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "yellow",
    }}
/>; */
}
