"use client";
import Request from "@/components/docs/Request";
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Chip, Code, Divider, Snippet } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

const page = () => {
  const t = useTranslations("docs");
  const API = process.env.NEXT_PUBLIC_API;
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Accordion variant="bordered">
        <AccordionItem title={t("user.title")}>
          <Accordion variant="splitted">
            <AccordionItem title={t("user.registration")}>
              <div className="flex flex-col gap-3">
                <Chip color="success" size="lg">
                  POST
                </Chip>
                <Snippet className="w-fit" variant="bordered" color="success" symbol={false}>
                  {API + "/user"}
                </Snippet>
                <Card classNames={{ base: "border-green-600 border w-[600px]" }}>
                  <CardHeader className="flex gap-3">
                    <p>Request Body</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <Snippet symbol={false}>
                      <span>{"{"}</span>
                      <span>&nbsp; name: "Luka",</span>
                      <span>&nbsp; surname: "Koridze",</span>
                      <span>&nbsp; email: "luka.koridze@gmail.com",</span>
                      <span>&nbsp; password: "Password*123",</span>
                      <span>&nbsp; repeat_password: "Password*123"</span>
                      <span>{"}"}</span>
                    </Snippet>
                  </CardBody>
                </Card>
                <Card classNames={{ base: "border-green-600 border w-[600px]" }}>
                  <CardHeader className="flex gap-3">
                    <p>Response</p>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <Chip color="success">Success: 201</Chip>
                      <Code className="w-fit">
                        <span>{"{"}</span>
                        <span>&nbsp; message: "რეგისტრაცია წარმატებით დასრულდა"</span>
                        <span>{"}"}</span>
                      </Code>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Chip color="danger">Error: 400</Chip>
                      <Snippet symbol={false}>
                        <span>{"{"}</span>
                        <span>&nbsp; errors: {"{"}</span>
                        <span>&nbsp; &nbsp; name: "მინ. 2 სიმბოლო",</span>
                        <span>&nbsp; &nbsp; email: "ელ. ფოსტა გამოყენებულია",</span>
                        <span>&nbsp; {"}"}</span>
                        <span>{"}"}</span>
                      </Snippet>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Chip color="danger">Error: 500</Chip>
                      <Snippet symbol={false}>
                        <span>{"{"}</span>
                        <span>&nbsp; error: "სერვერზე დაფიქსირდა შეცდომა",</span>
                        <span>{"}"}</span>
                      </Snippet>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </AccordionItem>
            {/* prettier-ignore */}
            <AccordionItem key={t("user.registration")} aria-label={t("user.registration")} title={t("user.registration")}>
              <Request  method="POST" path="/user" />
            </AccordionItem>
          </Accordion>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default page;
