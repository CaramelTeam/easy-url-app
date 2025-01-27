import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Plus } from "lucide-react";
import { UrlContextI, useUrl } from "@/context/UrlContext";
import { useState } from "react";
import { TagContextI, TagDtoI, useTag } from "@/context/TagContext";
import { Link } from "@nextui-org/link";

export default function EditModalTag() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [values, setValues] = useState<TagDtoI>({
        name: "",
        color: ""
    })

    const { addTag, deleteTag } = useTag() as TagContextI;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addTag(values);
            setValues({
                name: "",
                color: ""
            });
        } catch (error) {
            console.log("Error from add url:", error);
        }
    }


    return (
        <>
            {/* <Button startContent={<Plus />} onPress={onOpen}>Open Modal</Button> */}
            {/* <Button variant="light" aria-label="Edit tag content" as={'a'} onPress={onOpen}>Editar</Button> */}
            <Link as={'button'} size="sm" className="text-default-800 w-full" onPress={onOpen}>Editar</Link>
            {/* <Button isIconOnly color="primary" variant="shadow" onPress={onOpen}><Plus /></Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} aria-label="Edit tag content">
                <form
                    onSubmit={handleOnSubmit}
                    className="flex flex-col gap-4"
                >
                    <ModalContent>
                        {(onClose: any) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Agrega una etiqueta</ModalHeader>
                                <ModalBody>
                                    <Input isRequired className="mt-4" name="name" type="text" labelPlacement="outside" label="Nombre" onChange={handleInputChange} maxLength={30} />
                                    <Input isRequired name="color" type={"color"} labelPlacement="outside" label="Color" onChange={handleInputChange} defaultValue="#707070" />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button color="primary" onPress={onClose} type="submit">
                                        Guardar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form >
            </Modal>
        </>
    );
}