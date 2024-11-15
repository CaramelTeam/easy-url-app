"use client";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { ArrowUpRight, Bookmark, Link as LinkLucide, ListCollapse, Pencil, Trash } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";
import { UrlContextI, useUrl } from "../context/UrlContext";
import ModalHome from "@/components/home/ModalHome";
import { useState } from "react";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { TagContextI, useTag } from "@/context/TagContext";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import ModalEditLink from "@/components/home/ModalEditLink";

export default function Home() {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const collapseAll = () => {
    console.log("Collapse all: ");
    setExpandedKeys([]);
    console.log('Expanded keys:', expandedKeys);

  };

  const { url, deleteUrl, loading } = useUrl() as UrlContextI;
  const { tag } = useTag() as TagContextI;
  const handleDelete = async (id: string) => {
    try {
      await deleteUrl(id);
    } catch (error) {
      console.log("Error from delete url:", error);
    }
  }


  return (
    <section>
      <div
        className="flex justify-between items-center mb-4"
      >
        <div>
          <Tooltip
            key={'collapse-all'}
            color="primary"
            content="Colapsar todo"
            className="Capitalized"
          >
            <Button
              isIconOnly
              aria-label="Collapse All"
              onClick={collapseAll}
              variant="light"
            >
              <ListCollapse />
            </Button>
          </Tooltip>
        </div>
        <div>
          <ModalHome />
        </div>
      </div>

      <Accordion
        selectionMode="multiple"
        showDivider={false}
        onSelectionChange={(keysValue) => {
          console.log('Keys value:', keysValue);
          setExpandedKeys(Array.from(keysValue) as string[]);
        }}

        selectedKeys={expandedKeys}
      >
        {
          url.map((item) => (
            <AccordionItem
              key={item._id}
              className="mb-4"
              title={item._id}
              style={{
                borderBottom: "1px solid",
                borderColor: tag.find((t) => t.name === item._id)?.color || "gray",
                borderRadius: ".5rem",
              }}
              startContent={
                <div
                  className="flex justify-start mb-4 mt-4"
                >
                  <Bookmark
                    color={tag.find((t) => t.name === item._id)?.color || "gray"}

                  />
                </div>
              }
              indicator={
                <LinkLucide
                  color={tag.find((t) => t.name === item._id)?.color || "gray"}
                />
              }
            >
              {
                <div className="flex items-center justify-center grid md:grid-cols-4 gap-4 mt-4 mb-4">
                  {
                    loading ?
                      <CardSkeleton /> :
                      item.urls.map((url) => (
                        //Adding a max and min wid
                        <Card className="max-w-[400px] min-h-[300px]" key={url._id}
                        >
                          <CardHeader className="flex flex-col gap-3">
                            <div>
                              <p className="text-md">{url.title}</p>
                            </div>
                            <div className="flex ml-auto">
                              <Chip color="primary" variant="dot">{url?.tag}</Chip>
                            </div>
                          </CardHeader>
                          <Divider />
                          <CardBody>
                            <p>{url?.description}</p>
                          </CardBody>
                          <Divider />
                          <CardFooter
                            className="flex gap-3"
                            style={{
                              padding: "1.5rem 1.5rem",
                            }}
                          >
                            <Tooltip showArrow content="Visitar" placement="bottom" color="primary">
                              <Link
                                target="_blank"
                                className={buttonStyles({ variant: "shadow", radius: "full", color: "primary" })}
                                href={url.url.startsWith("http") ? url.url : url.url.startsWith("https") ? url.url : `https://${url.url}`}
                              >
                                <ArrowUpRight />
                              </Link>
                            </Tooltip>
                            {/* <Button color="secondary" isIconOnly aria-label="Editar" variant="ghost">
                              <Pencil />
                            </Button> */}
                            <ModalEditLink id={url._id} />
                            <Button
                              color="danger"
                              isIconOnly
                              aria-label="Eliminar"
                              variant="ghost"
                              onClick={() => handleDelete(url?._id)}
                              className="group"
                            >
                              <Trash className="group-hover:text-white" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  }
                </div>
              }
            </AccordionItem>
          ))
        }
      </Accordion>

    </section>
  );
}
