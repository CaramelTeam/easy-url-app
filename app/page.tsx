"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { ArrowUpRight, ExternalLink, Key, Link2, Link as LinkLucide, Pencil, Trash } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";
import { UrlContext, UrlContextI, useUrl } from "../context/UrlContext";
import ModalHome from "@/components/home/ModalHome";
import { useState } from "react";

export default function Home() {

  const { url, addUrl, refetch, deleteUrl } = useUrl() as UrlContextI;
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUrl(id);
      console.log("Response from delete url:", response);
    } catch (error) {
      console.log("Error from delete url:", error);
    }
  }


  return (
    <section
    // className="flex items-center justify-center grid md:grid-cols-4 gap-4"
    // className="flex items-center justify-center grid gap-4"
    >
      <div
        className="flex justify-end mb-4"
      >
        <ModalHome />
      </div>
      {
        url.map((item) => (
          <div key={item._id}>
            <div
              // className="flex items-center justify-center mb-4 mt-4"
              className="flex justify-start mb-4 mt-4"
            >
              <Chip color="primary" size="lg" variant="shadow" className="flex items-center justify-center">
                {item._id}
              </Chip>
            </div>

            <div className="flex items-center justify-center grid md:grid-cols-4 gap-4 mt-4">
              {
                item.urls.map((url) => (
                  //Adding a max and min wid
                  <Card className="max-w-[400px] min-h-[300px]" key={url._id}
                  >
                    <CardHeader className="flex flex-col gap-3">
                      <div>
                        <p className="text-md">{url.title}</p>
                      </div>
                      {/* <div>
                        <p className="text-small text-default-500 ">{url?.url.split('/')}</p>
                      </div> */}
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
                      <Button color="secondary" isIconOnly aria-label="Editar" variant="ghost">
                        <Pencil />
                      </Button>
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
          </div>
        ))
      }

    </section>
  );
}
