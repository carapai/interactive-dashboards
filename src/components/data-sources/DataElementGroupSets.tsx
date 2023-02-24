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
  Input,
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
import { ChangeEvent, useState } from "react";
import { IndicatorProps } from "../../interfaces";
import { useDataElements, useDataElementGroupSets } from "../../Queries";
import { $paginations, $hasDHIS2, $currentDataSource } from "../../Store";
import { globalIds } from "../../utils/utils";
import GlobalAndFilter from "./GlobalAndFilter";
import GlobalSearchFilter from "./GlobalSearchFilter";
import LoadingIndicator from "../LoadingIndicator";
import { isEmpty } from "lodash";

const OUTER_LIMIT = 4;
const INNER_LIMIT = 4;

const DataElementGroupSets = ({ onChange, denNum }: IndicatorProps) => {
  const paginations = useStore($paginations);
  const hasDHIS2 = useStore($hasDHIS2);
  const currentDataSource = useStore($currentDataSource);
  const [type, setType] = useState<"filter" | "dimension">("dimension");

  const selected = Object.entries(denNum?.dataDimensions || {})
    .filter(([k, { resource }]) => resource === "degs")
    .map(([key]) => {
      return key;
    });
  const [q, setQ] = useState<string>("");
  const [useGlobal, setUseGlobal] = useState<boolean>(
    () => selected.indexOf("HdiJ61vwqTX") !== -1
  );
  const {
    pages,
    pagesCount,
    currentPage,
    setCurrentPage,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: paginations.totalDataElementGroupSets,
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
    useDataElementGroupSets(
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
    <Stack spacing="5px">
      <GlobalSearchFilter
        denNum={denNum}
        dimension=""
        setType={setType}
        useGlobal={useGlobal}
        setUseGlobal={setUseGlobal}
        resource="degs"
        type={type}
        onChange={onChange}
        setQ={setQ}
        q={q}
        id={globalIds[13].value}
      />
      {isLoading && (
        <Flex w="100%" alignItems="center" justifyContent="center">
          <LoadingIndicator />
        </Flex>
      )}
      {isSuccess && !useGlobal && (
        <Table variant="striped" colorScheme="gray" textTransform="none">
          <Thead>
            <Tr py={1}>
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
            {data?.map((record: any) => (
              <Tr key={record.id}>
                <Td>
                  <Checkbox
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.checked) {
                        onChange({
                          id: record.id,
                          type,
                          dimension: "",
                          resource: "degs",
                        });
                      } else {
                        onChange({
                          id: record.id,
                          type,
                          dimension: "",
                          resource: "degs",
                          remove: true,
                        });
                      }
                    }}
                    isChecked={!isEmpty(denNum?.dataDimensions?.[record.id])}
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

export default DataElementGroupSets;