import { createApi } from "effector";
import produce from "immer";
import { fromPairs } from "lodash";
import { domain } from "./Domain";
import {
    DataNode,
    Dimension,
    ICategory,
    IDashboard,
    IData,
    IDataElement,
    IDataSource,
    IExpressionValue,
    IImage,
    IIndicator,
    IPagination,
    ISection,
    IVisualization,
    Period,
    ScreenSize,
    Storage,
    IFilter,
    IDashboardSetting,
    IPresentation,
    IReport,
    IPage,
    IUserGroup,
    CategoryCombo,
} from "./interfaces";
import {
    $categories,
    $category,
    $dashboard,
    $dashboards,
    $dashboardType,
    $dataSets,
    $dataSource,
    $dataSources,
    $indicator,
    $indicators,
    $paginations,
    $section,
    $settings,
    $size,
    $store,
    $visualizationData,
    $visualizationMetadata,
    $visualizationQuery,
    $calculated,
    $visualizationDimensions,
    $presentation,
    $totals,
    $report,
    $page,
    createPage,
    $userGroup,
    $attribution,
    $dashboardCategoryCombo,
} from "./Store";

export const loadDefaults = domain.createEvent<{
    dashboards: string[];
    categories: string[];
    dataSources: string[];
    settings: string[];
    organisationUnits: DataNode[];
}>();

export const paginationApi = createApi($paginations, {
    addPagination: (state, pagination: Partial<IPagination>) => {
        return {
            ...state,
            ...pagination,
        };
    },
});
export const sizeApi = createApi($size, {
    set: (_, val: ScreenSize) => val,
});

export const changeObjectAttribute = <T>(
    state: T,
    {
        attribute,
        value,
    }: {
        attribute: keyof T;
        value: any;
    }
) => {
    return { ...state, [attribute]: value };
};

export const updateObject = <T>(state: T, update: Partial<T>) => {
    return { ...state, ...update };
};

export const settingsApi = createApi($settings, {
    changeDefaultDashboard: (state, defaultDashboard: string) =>
        produce(state, (draft) => {
            draft.defaultDashboard = defaultDashboard;
        }),
    changeStorage: (state, storage: Storage) =>
        produce(state, (draft) => {
            draft.storage = storage;
        }),
    set: (_, settings: IDashboardSetting) => settings,
    changeAttribute: (
        state,
        { attribute, value }: { attribute: keyof IDashboardSetting; value: any }
    ) => ({ ...state, [attribute]: value }),
});

export const storeApi = createApi($store, {
    setOrganisations: (state, organisations: string[]) => {
        return { ...state, organisations };
    },
    setExpandedKeys: (state, expandedKeys: React.Key[]) => {
        return { ...state, expandedKeys };
    },
    setSelectedKeys: (state, selectedKeys: React.Key[]) => {
        return { ...state, selectedKeys };
    },
    setShowSider: (state, showSider: boolean) => {
        return { ...state, showSider };
    },
    onChangeOrganisations: (
        state,
        {
            levels,
            groups,
            organisations,
            expandedKeys,
            checkedKeys,
        }: {
            levels: string[];
            organisations: string[];
            groups: string[];
            expandedKeys: React.Key[];
            checkedKeys: React.Key[];
        }
    ) => {
        return {
            ...state,
            levels,
            groups,
            organisations,
            expandedKeys,
            checkedKeys,
        };
    },
    changePeriods: (state, periods: Period[]) => {
        return { ...state, periods };
    },
    changeLevels: (state, levels: string[]) => {
        return { ...state, levels };
    },
    changeSelectedCategory: (state, selectedCategory: string) => {
        return { ...state, selectedCategory };
    },
    changeSelectedDashboard: (state, selectedDashboard: string) => {
        return { ...state, selectedDashboard };
    },
    changeAdministration: (state, isAdmin: boolean) => {
        return { ...state, isAdmin };
    },
    changeHasDashboards: (state, hasDashboards: boolean) => {
        return { ...state, hasDashboards };
    },
    setDefaultDashboard: (state, defaultDashboard: string) => {
        return { ...state, defaultDashboard };
    },
    setCurrentPage: (state, currentPage: string) => {
        return { ...state, currentPage };
    },
    setSystemId: (state, systemId: string) => {
        return { ...state, systemId };
    },
    setCheckedKeys: (
        state,
        checkedKeys:
            | { checked: React.Key[]; halfChecked: React.Key[] }
            | React.Key[]
    ) => {
        return { ...state, checkedKeys };
    },
    setLevels: (state, levels: string[]) => {
        return { ...state, levels };
    },
    setGroups: (state, groups: string[]) => {
        return { ...state, groups };
    },
    setShowFooter: (state, showFooter: boolean) => {
        return { ...state, showFooter };
    },
    setSystemName: (state, systemName: string) => {
        return { ...state, systemName };
    },
    setMinSublevel: (state, minSublevel: number) => {
        return { ...state, minSublevel };
    },
    setMaxLevel: (state, maxLevel: number) => {
        return { ...state, maxLevel };
    },
    setInstanceBaseUrl: (state, instanceBaseUrl: string) => {
        return { ...state, instanceBaseUrl };
    },
    setIsNotDesktop: (state, isNotDesktop: boolean) => {
        return { ...state, isNotDesktop };
    },
    setIsFullScreen: (state, isFullScreen: boolean) => {
        return { ...state, isFullScreen };
    },
    setRefresh: (state, refresh: boolean) => {
        return { ...state, refresh };
    },
    setThemes: (state, themes: string[]) => {
        return { ...state, themes };
    },
    setDataElements: (state, dataElements: IDataElement[]) => {
        return { ...state, dataElements };
    },
    setVersion: (state, version: string) => {
        return { ...state, version };
    },
    setRows: (state, rows: any[]) => {
        return { ...state, rows };
    },
    setColumns: (state, columns: any[]) => {
        return { ...state, columns };
    },
    setOriginalColumns: (state, originalColumns: any[]) => {
        return { ...state, originalColumns };
    },
    setDataElementGroups: (state, dataElementGroups: string[]) => {
        return { ...state, dataElementGroups };
    },
    setDataElementGroupSets: (state, dataElementGroupSets: string[]) => {
        return { ...state, dataElementGroupSets };
    },
});

export const dataSourceApi = createApi($dataSource, {
    setDataSource: (_, dataSource: IDataSource) => dataSource,
    changeDataSourceId: (state, id: string) => {
        return { ...state, id };
    },
});

export const dashboardApi = createApi($dashboard, {
    addSection: (state, section: ISection) => {
        const isNew = state.sections.find((s) => s.id === section.id);
        let sections: ISection[] = state.sections;
        if (isNew) {
            sections = sections.map((s) => {
                if (s.id === section.id) {
                    return section;
                }
                return s;
            });
        } else {
            sections = [...sections, section];
        }
        const currentDashboard = { ...state, sections };
        return currentDashboard;
    },
    deleteSection: (state, section: string | undefined) => {
        const sections = state.sections.filter((s) => s.id !== section);
        return {
            ...state,
            sections,
        };
    },
    setCurrentDashboard: (_, dashboard: IDashboard) => dashboard,
    changeDefaults: (state) => {
        return { ...state, hasDashboards: true, hasDefaultDashboard: true };
    },
    toggleDashboard: (state, published: boolean) => {
        return { ...state, published };
    },
    setRefreshInterval: (state, refreshInterval: string) => {
        return { ...state, refreshInterval };
    },
    changeCategory: (state, category: string) => {
        return { ...state, category };
    },
    changeChild: (state, child: string) => {
        return { ...state, child };
    },
    changeDashboardName: (state, name: string) => {
        return { ...state, name };
    },
    changeDashboardDescription: (state, description: string) => {
        return { ...state, description };
    },
    changeDashboardId: (state, id: string) => {
        return { ...state, id };
    },
    changeVisualizationType: (
        state,
        { section, visualization }: { section: ISection; visualization: string }
    ) => {
        const sections = state.sections.map((s) => {
            if (s.id === section.id) {
                const visualizations = section.visualizations.map((viz) => {
                    return { ...viz, type: visualization };
                });
                return { ...section, visualizations };
            }
            return s;
        });
        return { ...state, sections };
    },
    assignDataSet: (state, dataSet: string) => {
        return { ...state, dataSet };
    },
    setCategorization: (
        state,
        categorization: {
            [key: string]: any[];
        }
    ) => {
        return { ...state, categorization };
    },
    setAvailableCategories: (state, availableCategories: any[]) => {
        return { ...state, availableCategories };
    },

    setAvailableCategoryOptionCombos: (
        state,
        availableCategoryOptionCombos: any[]
    ) => {
        return { ...state, availableCategoryOptionCombos };
    },
    setTargetCategoryOptionCombos: (
        state,
        targetCategoryOptionCombos: any[]
    ) => {
        return { ...state, targetCategoryOptionCombos };
    },
    setHasChildren: (state, hasChildren: boolean) => {
        return { ...state, hasChildren };
    },
    setNodeSource: (
        state,
        {
            field,
            value,
        }: {
            field: string;
            value: string;
        }
    ) => {
        const nodeSource = state.nodeSource || {};
        return { ...state, nodeSource: { ...nodeSource, [field]: value } };
    },
    setSections: (state, sections: ISection[]) => {
        return { ...state, sections };
    },
    changeTag: (state, tag: string) =>
        produce(state, (draft) => {
            draft.tag = tag;
        }),
    changeBg: (state, bg: string) =>
        produce(state, (draft) => {
            draft.bg = bg;
        }),
    changeVisualizationOrder: (
        state,
        { section, order }: { section: ISection; order: string }
    ) => {
        const sections = state.sections.map((s) => {
            if (s.id === section.id) {
                const visualizations = section.visualizations.map((viz) => {
                    return { ...viz, order };
                });
                return { ...section, visualizations };
            }
            return s;
        });
        return { ...state, sections };
    },
    changeVisualizationShow: (
        state,
        { section, show }: { section: ISection; show: number }
    ) => {
        const sections = state.sections.map((s) => {
            if (s.id === section.id) {
                const visualizations = section.visualizations.map((viz) => {
                    return { ...viz, show };
                });
                return { ...section, visualizations };
            }
            return s;
        });
        return { ...state, sections };
    },

    processFilters: (
        state,
        { key, id, value }: { key: keyof IFilter; value: string; id: string }
    ) => {
        const filters = state.filters?.map((filter) => {
            if (filter.id === id) {
                return { ...filter, [key]: value };
            }
            return filter;
        });
        return { ...state, filters };
    },
    addFilter: (state, filter: IFilter) => {
        if (state.filters) {
            return { ...state, filters: [...state.filters, filter] };
        }
        return { ...state, filters: [filter] };
    },
    removeFilter: (state, filter: IFilter) => {
        if (state.filters) {
            return {
                ...state,
                filters: state.filters.filter(({ id }) => filter.id !== id),
            };
        }
    },
    changeExcludeFromList: (state, excludeFromList: boolean) =>
        produce(state, (draft) => {
            draft.excludeFromList = excludeFromList;
        }),
    changeAttribute: (
        state,
        { attribute, value }: { attribute: keyof IDashboard; value: any }
    ) => {
        return changeObjectAttribute<IDashboard>(state, { attribute, value });
    },
    changeOrder: (state, order: string) => ({ ...state, order }),
});

export const indicatorApi = createApi($indicator, {
    changeIndicatorAttribute: (
        state,
        {
            attribute,
            value,
        }: {
            attribute: keyof IIndicator;
            value: any;
        }
    ) => {
        return changeObjectAttribute<IIndicator>(state, { attribute, value });
    },
    changeUseIndicators: (state, useInBuildIndicators: boolean) => {
        return { ...state, useInBuildIndicators };
    },
    setIndicator: (_, indicator: IIndicator) => {
        return indicator;
    },
});

export const sectionApi = createApi($section, {
    setCurrentSection: (_, section: ISection) => {
        return section;
    },
    addVisualization2Section: (state, id: string) => {
        const visualization: IVisualization = {
            id,
            indicators: [],
            type: "",
            name: `Visualization ${state.visualizations.length + 1}`,
            properties: {},
            overrides: {},
            group: "",
            bg: "",
            show: 1,
            order: "1",
        };
        return {
            ...state,
            visualizations: [...state.visualizations, visualization],
        };
    },
    duplicateVisualization: (state, visualization: IVisualization) => {
        return {
            ...state,
            visualizations: [...state.visualizations, visualization],
        };
    },
    deleteSectionVisualization: (state, visualizationId: string) => {
        return {
            ...state,
            visualizations: state.visualizations.filter(
                ({ id }) => id !== visualizationId
            ),
        };
    },
    changeVisualizationAttribute: (
        state,
        {
            attribute,
            value,
            visualization,
        }: {
            attribute: keyof IVisualization;
            value?: any;
            visualization: string;
        }
    ) => {
        const visualizations = state.visualizations.map((v: IVisualization) => {
            if (v.id === visualization) {
                return { ...v, [attribute]: value };
            }
            return v;
        });
        return { ...state, visualizations };
    },

    changeSectionAttribute: (
        state,
        {
            attribute,
            value,
        }: {
            attribute: keyof ISection;
            value: any;
        }
    ) => {
        return { ...state, [attribute]: value };
    },
    changeVisualizationOverride: (
        state,
        {
            visualization,
            override,
            value,
        }: {
            override: string;
            value: string;
            visualization: string;
        }
    ) => {
        const visualizations: IVisualization[] = state.visualizations.map(
            (v: IVisualization) => {
                if (v.id === visualization) {
                    return {
                        ...v,
                        overrides: { ...v.overrides, [override]: value },
                    };
                }
                return v;
            }
        );
        return { ...state, visualizations };
    },

    changeVisualizationProperties: (
        state,
        {
            attribute,
            value,
            visualization,
        }: {
            visualization: string;
            attribute: string;
            value?: any;
        }
    ) => {
        const visualizations: IVisualization[] = state.visualizations.map(
            (v: IVisualization) => {
                if (v.id === visualization) {
                    return {
                        ...v,
                        properties: { ...v.properties, [attribute]: value },
                    };
                }
                return v;
            }
        );
        return { ...state, visualizations };
    },
    setVisualization: (state, visualization: IVisualization) => {
        const visualizations: IVisualization[] = state.visualizations.map(
            (v: IVisualization) => {
                if (v.id === visualization.id) {
                    return visualization;
                }
                return v;
            }
        );
        return { ...state, visualizations };
    },
    setVisualizations: (state, visualizations: IVisualization[]) => {
        return { ...state, visualizations };
    },
});

export const dataSourcesApi = createApi($dataSources, {
    setDataSources: (_, dataSources: IDataSource[]) => dataSources,
});
export const indicatorsApi = createApi($indicators, {
    setVisualizationQueries: (_, indicators: IIndicator[]) => indicators,
});
export const categoriesApi = createApi($categories, {
    setCategories: (_, categories: ICategory[]) => categories,
});
export const dashboardsApi = createApi($dashboards, {
    setDashboards: (_, dashboards: IDashboard[]) => dashboards,
});
export const dataSetsApi = createApi($dataSets, {
    setDataSets: (_, dataSets) => dataSets,
});

export const visualizationDataApi = createApi($visualizationData, {
    updateVisualizationData: (
        state,
        {
            visualizationId,
            data,
        }: {
            visualizationId: string;
            data: any;
        }
    ) => {
        return { ...state, [visualizationId]: data };
    },
});
export const visualizationDimensionsApi = createApi($visualizationDimensions, {
    updateVisualizationData: (
        state,
        {
            visualizationId,
            data,
        }: {
            visualizationId: string;
            data: { [key: string]: string[] };
        }
    ) => {
        return { ...state, [visualizationId]: data };
    },
});

export const visualizationMetadataApi = createApi($visualizationMetadata, {
    updateVisualizationMetadata: (
        state,
        {
            visualizationId,
            data,
        }: {
            visualizationId: string;
            data: any;
        }
    ) => {
        return { ...state, [visualizationId]: data };
    },
});

export const dashboardTypeApi = createApi($dashboardType, {
    set: (_, value: "fixed" | "dynamic") => value,
});

export const categoryApi = createApi($category, {
    setCategory: (_, category: ICategory) => category,
    changeCategoryId: (state, id: string) => {
        return { ...state, id };
    },
});

export const datumAPi = createApi($visualizationQuery, {
    changeAttribute: (
        state,
        {
            attribute,
            value,
        }: {
            attribute: keyof IData;
            value: any;
        }
    ) => {
        return { ...state, [attribute]: value };
    },

    set: (_, data: IData) => {
        return data;
    },

    changeExpressionValue: (
        state,
        { attribute, value, isGlobal }: IExpressionValue
    ) => {
        return {
            ...state,
            expressions: {
                ...state.expressions,
                [attribute]: { value, isGlobal },
            },
        };
    },

    changeDimension: (
        state,
        {
            id,
            dimension,
            type,
            resource,
            replace,
            remove,
            prefix,
            suffix,
            label = "",
            periodType,
        }: Dimension
    ) => {
        if (remove) {
            const { [id]: removed, ...others } = state.dataDimensions || {};
            return {
                ...state,
                dataDimensions: others,
            };
        }

        if (replace) {
            const working = fromPairs(
                Object.entries(state.dataDimensions || {}).filter(
                    ([i, d]) => d.resource !== resource
                )
            );

            return {
                ...state,
                dataDimensions: {
                    ...working,
                    [id]: {
                        id,
                        resource,
                        type,
                        dimension,
                        label,
                        prefix,
                        suffix,
                        periodType,
                    },
                },
            };
        }
        const computedState = {
            ...state,
            dataDimensions: {
                ...state.dataDimensions,
                [id]: {
                    id,
                    resource,
                    type,
                    dimension,
                    prefix,
                    suffix,
                    label,
                    periodType,
                },
            },
        };
        return computedState;
    },
});

export const calculatedApi = createApi($calculated, {
    add: (state, { id, value }: { id: string; value: any }) => {
        return { ...state, [id]: value };
    },
});

export const presentationApi = createApi($presentation, {
    setPresentation: (_, presentation: IPresentation) => presentation,
});

export const totalsApi = createApi($totals, {
    set: (_, value: number) => value,
});

export const reportApi = createApi($report, {
    setReport: (_, report: IReport) => report,
    addPage: (state, page: IPage) => {
        let pages = state.pages;
        const search = pages.find((p) => p.id === page.id);
        if (search) {
            pages = pages.map((p) => {
                if (p.id === page.id) {
                    return page;
                }
                return p;
            });
        } else {
            pages = [...pages, page];
        }
        return { ...state, pages };
    },
    updateReportItem: (
        state,
        {
            page,
            item,
            metadata,
        }: {
            page: string;
            item: string;
            metadata: Partial<{ rows: number; columns: number }>;
        }
    ) => {
        const pages = state.pages.map((currentPage) => {
            if (currentPage.id === page) {
                const items = currentPage.items.map((currentItem) => {
                    if (currentItem.key == item) {
                        return {
                            ...currentItem,
                            metadata: { ...currentItem.metadata, ...metadata },
                        };
                    }
                    return currentItem;
                });
                return { ...currentPage, items };
            }
            return currentPage;
        });
        return { ...state, pages };
    },
    update: (
        state,
        { attribute, value }: { attribute: keyof IReport; value: any }
    ) => {
        return { ...state, [attribute]: value };
    },
});

export const pageApi = createApi($page, {
    update: (
        state,
        { attribute, value }: { attribute: keyof IPage; value: any }
    ) => {
        if (state) {
            return { ...state, [attribute]: value };
        }
    },
    updateItem: (
        state,
        {
            item,
            metadata,
        }: {
            item: string;
            metadata: Partial<{ rows: number; columns: number }>;
        }
    ) => {
        if (state) {
            const items = state.items.map((currentItem) => {
                if (currentItem.key == item) {
                    return {
                        ...currentItem,
                        metadata: { ...currentItem.metadata, ...metadata },
                    };
                }
                return currentItem;
            });
            return { ...state, items };
        }
    },
    addItems: (state, items: DataNode[]) => {
        if (state) {
            return { ...state, items: [...(state.items || []), ...items] };
        }
    },
    reset: () => createPage(),
    set: (_, page: IPage | null) => page,
});

export const userGroupApi = createApi($userGroup, {
    update: (
        state,
        { attribute, value }: { attribute: keyof IUserGroup; value: any }
    ) => {
        return { ...state, [attribute]: value };
    },
});

export const attributionApi = createApi($attribution, {
    add: (state, data: { [key: string]: string }) => ({ ...state, ...data }),
});

export const dashboardCategoryComboApi = createApi($dashboardCategoryCombo, {
    set: (_, payload: Partial<CategoryCombo>) => payload,
});
