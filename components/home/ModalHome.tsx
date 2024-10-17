import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Plus } from "lucide-react";
import { UrlContextI, UrlDtoI, useUrl } from "@/context/UrlContext";
import { useState } from "react";
import { TagContextI, useTag } from "@/context/TagContext";

export default function ModalHome() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [values, setValues] = useState<UrlDtoI>({
        title: "",
        description: "",
        url: "",
        tag: "Unassigned"
    })
    const { addUrl } = useUrl() as UrlContextI;
    const { tag } = useTag() as TagContextI;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("values", values);

        e.preventDefault();
        try {
            await addUrl(values);
            setValues({
                title: "",
                description: "",
                url: "",
                tag: "Unassigned"
            });
        } catch (error) {
            console.log("Error from add url:", error);
        }
    }

    return (
        <>
            {/* <Button startContent={<Plus />} onPress={onOpen}>Open Modal</Button> */}
            <Button radius="full" color="primary" variant="shadow" startContent={<Plus />} onPress={onOpen}>Agregar link</Button>
            {/* <Button isIconOnly color="primary" variant="shadow" onPress={onOpen}><Plus /></Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <form
                    onSubmit={handleOnSubmit}
                    className="flex flex-col gap-4"
                >
                    <ModalContent>
                        {(onClose: any) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Agrega un link</ModalHeader>
                                <ModalBody>

                                    <Input isRequired className="mt-4" name="title" type="text" labelPlacement="outside" label="Titulo" onChange={handleInputChange} maxLength={30} />
                                    <Textarea
                                        isRequired
                                        name="description"
                                        label="Description"
                                        labelPlacement="outside"
                                        placeholder="Descripción del sitio o anotaciones"
                                        onChange={handleInputChange}
                                        maxLength={120}
                                    />
                                    {/* <Input className="mt-4" name="description" type="text" labelPlacement="outside" label="Descripcion" onChange={handleInputChange} /> */}
                                    <Input isRequired className="mt-4" startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">https://</span>
                                        </div>
                                    } name="url" type="text" labelPlacement="outside" label="URL" onChange={handleInputChange} />
                                    <Select
                                        className="max-w mt-4"
                                        label="Selecciona una etiqueta"
                                        name="tag"
                                        onChange={(e) => setValues({ ...values, tag: e.target.value })}
                                        items={[{ "name": "Unassigned", "_id": 0 }, ...tag]}
                                    >
                                        {(tag) => (
                                            <SelectItem key={tag.name} value={tag.name}  >
                                                {tag.name}
                                            </SelectItem>
                                        )}
                                    </Select>
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