import {
    Pagination,
    PaginationContainer,
    PaginationNext,
    PaginationPrevious,
    usePagination,
} from "@ajna/pagination";
import {
    Box,
    Checkbox,
    Flex,
    Heading,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import { isEmpty } from "lodash";
import { ChangeEvent, useState } from "react";
import { IndicatorProps } from "../../interfaces";
import { useOrganisationUnitLevels } from "../../Queries";
import { $paginations, $hasDHIS2, $currentDataSource } from "../../Store";
import { globalIds, computeGlobalParams } from "../../utils/utils";
import LoadingIndicator from "../LoadingIndicator";
import GlobalSearchFilter from "./GlobalSearchFilter";

const OUTER_LIMIT = 4;
const INNER_LIMIT = 4;

const OrganizationUnitLevels = ({ denNum, onChange }: IndicatorProps) => {
    const { previousType, isGlobal } = computeGlobalParams(
        denNum,
        "oul",
        "GQhi6pRnTKF"
    );
    const [type, setType] = useState<"filter" | "dimension">(previousType);
    const [useGlobal, setUseGlobal] = useState<boolean>(isGlobal);
    const [q, setQ] = useState<string>("");
    const paginations = useStore($paginations);
    const hasDHIS2 = useStore($hasDHIS2);
    const currentDataSource = useStore($currentDataSource);
    const {
        pages,
        pagesCount,
        currentPage,
        setCurrentPage,
        isDisabled,
        pageSize,
        setPageSize,
    } = usePagination({
        total: paginations.totalOrganisationUnitLevels,
        limits: {
            outer: OUTER_LIMIT,
            inner: INNER_LIMIT,
        },
        initialState: {
            pageSize: 10,
            currentPage: 1,
        },
    });
    const { isLoading, isSuccess, isError, error, data } =
        useOrganisationUnitLevels(
            currentPage,
            pageSize,
            q,
            hasDHIS2,
            currentDataSource
        );

    const handlePageChange = (nextPage: number) => {
        setCurrentPage(nextPage);
    };

    return (
        <Stack spacing="30px">
            <GlobalSearchFilter
                denNum={denNum}
                dimension="ou"
                setType={setType}
                useGlobal={useGlobal}
                setUseGlobal={setUseGlobal}
                resource="oul"
                prefix="LEVEL-"
                type={type}
                onChange={onChange}
                setQ={setQ}
                q={q}
                id={globalIds[4].value}
            />
            <Text>{type}</Text>
            {isLoading && (
                <Flex w="100%" alignItems="center" justifyContent="center">
                    <LoadingIndicator />
                </Flex>
            )}
            {isSuccess && data && !useGlobal && (
                <Table
                    variant="striped"
                    colorScheme="gray"
                    textTransform="none"
                >
                    <Thead>
                        <Tr>
                            <Th w="10px">
                                <Checkbox />
                            </Th>
                            <Th>
                                <Heading as="h6" size="xs" textTransform="none">
                                    Id
                                </Heading>
                            </Th>
                            <Th>
                                <Heading as="h6" size="xs" textTransform="none">
                                    Name
                                </Heading>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((record: any) => (
                            <Tr key={record.id || record.level}>
                                <Td>
                                    <Checkbox
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => {
                                            if (e.target.checked) {
                                                onChange({
                                                    id: record.level,
                                                    type,
                                                    dimension: "ou",
                                                    resource: "oul",
                                                    prefix: "LEVEL-",
                                                });
                                            } else {
                                                onChange({
                                                    id: record.level,
                                                    type,
                                                    dimension: "ou",
                                                    resource: "oul",
                                                    prefix: "LEVEL-",
                                                    remove: true,
                                                });
                                            }
                                        }}
                                        isChecked={
                                            !isEmpty(
                                                denNum?.dataDimensions?.[
                                                    record.level
                                                ]
                                            )
                                        }
                                    />
                                </Td>
                                <Td>{record.id}</Td>
                                <Td>{record.name}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
            {!useGlobal && (
                <Pagination
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    isDisabled={isDisabled}
                    onPageChange={handlePageChange}
                >
                    <PaginationContainer
                        align="center"
                        justify="space-between"
                        p={4}
                        w="full"
                    >
                        <PaginationPrevious
                            _hover={{
                                bg: "yellow.400",
                            }}
                            bgColor="yellow.300"
                        >
                            <Text>Previous</Text>
                        </PaginationPrevious>
                        <PaginationNext
                            _hover={{
                                bg: "yellow.400",
                            }}
                            bgColor="yellow.300"
                        >
                            <Text>Next</Text>
                        </PaginationNext>
                    </PaginationContainer>
                </Pagination>
            )}
            {isError && <Box>{error?.message}</Box>}
        </Stack>
    );
};

export default OrganizationUnitLevels;
