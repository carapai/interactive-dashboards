import {
    Button,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
} from "@chakra-ui/react";
import { SketchPicker, SwatchesPicker } from "react-color";
import { swatchColors } from "../utils/utils";

export default function Picker({
    color,
    onChange,
    title,
}: {
    color: string;
    onChange: (color: string) => void;
    title?: string;
}) {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Stack position="relative">
            <Button
                onClick={onToggle}
                variant="outline"
                _hover={{ backgroundColor: "none" }}
                bg={color}
                size="sm"
                w="20px"
            >
                {title}
            </Button>

            {isOpen && (
                <Stack
                    position="absolute"
                    top="32px"
                    zIndex={100}
                    backgroundColor="white"
                    // right={0}
                    // minH="350px"
                    // minW="350px"
                >
                    <Tabs>
                        <TabList>
                            <Tab>Color</Tab>
                            <Tab>Custom color</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel p={0} m={0}>
                                <SwatchesPicker
                                    colors={swatchColors}
                                    color={color}
                                    onChangeComplete={(color) => {
                                        onChange(color.hex);
                                        onToggle();
                                    }}
                                />
                            </TabPanel>
                            <TabPanel p={0} m={0}>
                                <SketchPicker
                                    color={color}
                                    onChangeComplete={(color) => {
                                        onChange(color.hex);
                                        onToggle();
                                    }}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>
            )}
        </Stack>
    );
}