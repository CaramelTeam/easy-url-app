import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Plus } from "lucide-react";
import { UrlContextI, UrlDtoI, useUrl } from "@/context/UrlContext";
import { TagContextI, useTag } from "@/context/TagContext";
import { useValidateInputs } from "@/hooks/useValidateInputs";

export default function ModalHome() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { addUrl } = useUrl() as UrlContextI;
    const { tag } = useTag() as TagContextI;
    const { handleOnChange, values, handleEmptyInputs, handleSpecialCharacters, handleUrlCharacters } = useValidateInputs<UrlDtoI>({
        url: '',
        title: '',
        description: '',
        tag: ''
    })

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addUrl(values);
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

                                    <Input
                                        isRequired
                                        className="mt-4"
                                        name="title"
                                        type="text"
                                        labelPlacement="outside"
                                        label="Titulo"
                                        onChange={handleOnChange}
                                        maxLength={30}
                                        onInput={handleSpecialCharacters}
                                    />
                                    <Textarea
                                        isRequired
                                        name="description"
                                        label="Description"
                                        labelPlacement="outside"
                                        placeholder="Descripción del sitio o anotaciones"
                                        onChange={handleOnChange}
                                        maxLength={120}
                                        onInput={handleSpecialCharacters}
                                    />
                                    {/* <Input className="mt-4" name="description" type="text" labelPlacement="outside" label="Descripcion" onChange={handleInputChange} /> */}
                                    <Input isRequired className="mt-4" startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">https://</span>
                                        </div>
                                    }
                                        name="url"
                                        type="text"
                                        labelPlacement="outside"
                                        label="URL"
                                        onChange={handleOnChange}
                                        onInput={handleUrlCharacters}
                                    />
                                    <Select
                                        className="max-w mt-4"
                                        label="Selecciona una etiqueta"
                                        name="tag"
                                        onChange={handleOnChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}
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
                                    <Button color="danger" variant="light" onPress={onClose} >
                                        Cancelar
                                    </Button>
                                    <Button color="primary" onPress={onClose} type="submit" isDisabled={handleEmptyInputs()} >
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