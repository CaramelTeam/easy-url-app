import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Pencil, Plus } from "lucide-react";
import { UrlContextI, UrlDtoI, useUrl } from "@/context/UrlContext";
import { TagContextI, useTag } from "@/context/TagContext";
import { useValidateInputs } from "@/hooks/useValidateInputs";

export default function ModalEditLink({ id }: { id: string }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { getUrlById, updateById, refetch } = useUrl() as UrlContextI;
    const { tag } = useTag() as TagContextI;
    const { handleOnChange, values, handleEmptyInputs, handleSpecialCharacters, handleUrlCharacters, setValues } = useValidateInputs<UrlDtoI>({
        url: '',
        title: '',
        description: '',
        tag: ''
    })

    const handleOnClick = async (id: string) => {
        const data = await getUrlById(id);
        setValues({
            title: data.title,
            url: data.url,
            description: data.description,
        })
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateById(id, values)
            refetch()
        } catch (error) {
            console.log("Error from add url:", error);
        }
    }

    return (
        <>
            {/* <Button startContent={<Plus />} onPress={onOpen}>Open Modal</Button> */}
            <Button isIconOnly color="secondary" variant="ghost" aria-label="Editar" onPress={onOpen} onClick={() => handleOnClick(id)}>
                <Pencil />
            </Button>
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
                                        value={values.title}
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
                                        value={values.description}
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
                                        value={values.url}
                                    />
                                    <Select
                                        className="max-w mt-4"
                                        label="Selecciona una etiqueta"
                                        name="tag"
                                        onChange={handleOnChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}
                                        items={[{ "name": "Unassigned", "_id": 0 }, ...tag]}
                                    // isRequired
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
                                        Actualizar
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