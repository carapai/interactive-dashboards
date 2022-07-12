import { SingleValue } from "chakra-react-select";
import moment from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { Layout, Layouts } from "react-grid-layout";
import { domain } from "./Domain";
import {
  DataNode,
  ICategory,
  IDashboard,
  IDataSource,
  IIndicator,
  ISection,
  Item,
  IVisualization,
  Option,
} from "./interfaces";

export const loadDefaults = domain.createEvent<{
  dashboards: string[];
  categories: string[];
  dataSources: string[];
  settings: string[];
  organisationUnits: DataNode[];
}>();

// export const addCategory = domain.createEvent<string>();
export const setShowSider = domain.createEvent<boolean>();
export const setDataSources = domain.createEvent<IDataSource[]>();
export const setCategories = domain.createEvent<ICategory[]>();
export const setDashboards = domain.createEvent<IDashboard[]>();
export const setCurrentDashboard = domain.createEvent<IDashboard>();
// export const updateSection = domain.createEvent<void>();
export const addSection = domain.createEvent<ISection>();
export const addVisualization2Section = domain.createEvent<void>();
export const deleteSection = domain.createEvent<string | undefined>();
export const setCurrentSection = domain.createEvent<ISection>();
export const toggleDashboard = domain.createEvent<boolean>();
export const changeDashboardId = domain.createEvent<string>();
export const changeCategoryId = domain.createEvent<string>();
export const changeDataSourceId = domain.createEvent<string>();
export const changeAdministration = domain.createEvent<boolean>();
// export const changeVisualizationDataSource = domain.createEvent<IDataSource>();
// export const changeVisualizationType = domain.createEvent<string>();
// export const setCurrentVisualization = domain.createEvent<IVisualization>();
export const addPagination = domain.createEvent<{
  [key: string]: number;
}>();

// export const changeNumeratorDataSource = domain.createEvent<IDataSource>();
export const changeDataSource = domain.createEvent<string | undefined>();
export const setDataSource = domain.createEvent<IDataSource>();
export const setCategory = domain.createEvent<ICategory>();
export const setIndicator = domain.createEvent<IIndicator>();
// export const changeDenominatorDataSource = domain.createEvent<IDataSource>();
// export const addNumeratorExpression = domain.createEvent<{
//   key: string;
//   value: string;
// }>();
// export const addDenominatorExpression = domain.createEvent<{
//   key: string;
//   value: string;
// }>();
export const changeLayouts = domain.createEvent<{
  currentLayout: Layout[];
  allLayouts: Layouts;
}>();
export const changeNumeratorExpressionValue = domain.createEvent<{
  attribute: string;
  value: string;
  isGlobal: boolean;
}>();
export const changeDenominatorExpressionValue = domain.createEvent<{
  attribute: string;
  value: string;
  isGlobal: boolean;
}>();

export const changeIndicatorAttribute = domain.createEvent<{
  attribute: "name" | "description" | "factor" | "query";
  value: any;
}>();

export const changeVisualizationData = domain.createEvent<{
  attribute: "name" | "description" | "factor" | "query";
  value: any;
}>();

export const changeNumeratorAttribute = domain.createEvent<{
  attribute: "name" | "description" | "type" | "query";
  value: any;
}>();
export const changeDenominatorAttribute = domain.createEvent<{
  attribute: "name" | "description" | "type" | "query";
  value: any;
}>();

export const changeNumeratorDimension = domain.createEvent<{
  id: string;
  what: string;
  type: string;
  remove?: boolean;
  replace?: boolean;
  label?: string;
}>();

export const changeDenominatorDimension = domain.createEvent<{
  id: string;
  what: string;
  type: string;
  remove?: boolean;
  replace?: boolean;
  label?: string;
}>();

// export const removeNumeratorDimension = domain.createEvent<string>();

export const changeUseIndicators = domain.createEvent<boolean>();
export const setVisualizationQueries = domain.createEvent<IIndicator[]>();
export const changeDefaults = domain.createEvent<void>();
export const increment = domain.createEvent<number>();
export const changeCategory = domain.createEvent<string>();
export const changeDashboardName = domain.createEvent<string>();
export const changeDashboardDescription = domain.createEvent<string>();
export const changeSelectedCategory = domain.createEvent<string>();
export const changeSelectedDashboard = domain.createEvent<string>();
export const setAsDefault = domain.createEvent<boolean>();
export const changeRefreshRate = domain.createEvent<string>();
export const toggle = domain.createEvent<void>();
export const changeVisualizationAttribute = domain.createEvent<{
  attribute: string;
  value?: any;
  visualization: string;
}>();

export const changeVisualizationOverride = domain.createEvent<{
  override: string;
  value: string;
  visualization: string;
}>();

export const changeSectionAttribute = domain.createEvent<{
  attribute: string;
  value?: any;
}>();

export const addOverride = domain.createEvent<{
  attribute: "ou" | "dx" | "pe";
  value: string;
}>();

export const changeVisualizationProperties = domain.createEvent<{
  visualization: string;
  attribute: string;
  value?: any;
}>();

export const updateVisualizationData = domain.createEvent<{
  visualizationId: string;
  data: any;
}>();

export const updateVisualizationMetadata = domain.createEvent<{
  visualizationId: string;
  data: any;
}>();

export const setOrganisations = domain.createEvent<React.Key[]>();
export const setExpandedKeys = domain.createEvent<React.Key[]>();
export const changeOrganisations = domain.createEvent<string>();
export const setRefreshInterval = domain.createEvent<string>();
export const changeHasDashboards = domain.createEvent<boolean>();

export const changePeriods = domain.createEvent<Item[]>();

export const onChangeOrganisations = domain.createEvent<{
  levels: string[];
  organisations: React.Key[];
  groups: string[];
  expandedKeys: React.Key[];
}>();
