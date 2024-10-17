'use client';
import { title } from "@/components/primitives";
import ModalTag from "@/components/tag/ModalTag";
import { TagContextI, TagI, useTag } from "@/context/TagContext";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { EllipsisVertical } from "lucide-react";
import { useCallback } from "react";

export default function TagPage() {
    const { tag, deleteTag } = useTag() as TagContextI;
    console.log("Tag desde page", tag);
    const columns = [
        {
            key: "name",
            label: "Nombre",
        },
        {
            key: "color",
            label: "Color",
        },
        {
            key: "actions",
            label: "Acciones",
        },
    ];
    const renderCell = useCallback((tag: TagI, columnKey: keyof TagI | "actions") => {
        const cellValue = tag[columnKey as keyof TagI];
        switch (columnKey) {
            case "name":
                return <span>{cellValue}</span>;
            case "color":
                return (
                    <Chip
                        style={{ borderColor: cellValue }}
                        // style={{ backgroundColor: cellValue, color: "black" }}
                        variant="bordered"
                    >
                        {cellValue}
                    </Chip>
                )
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    {/* <VerticalDotsIcon className="text-default-300" /> */}
                                    <EllipsisVertical />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem color="danger" className="text-danger" onClick={() => deleteTag(tag._id)} >Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <section
        // className="bg-white min-w-full min-h-screen flex flex-col items-center justify-center"
        >
            <div
                className="flex justify-end mb-8 "
            >
                <ModalTag />
            </div>
            <Table
                aria-label="tag collection table"
            >
                <TableHeader columns={columns} >
                    {(column) => <TableColumn key={column.key} align="center" >{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={tag} emptyContent={"No existe ninguna etiqueta"} >
                    {(tag) => (
                        <TableRow key={tag._id}>
                            {/* {(columnKey) => <TableCell>{getKeyValue(tag, columnKey)}</TableCell>} */}
                            {(columnKey) => <TableCell>{renderCell(tag, columnKey as keyof TagI | "actions")}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </section>
    );
}
