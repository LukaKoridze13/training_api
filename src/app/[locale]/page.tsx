"use client";
import Request, { RequestProps } from "@/components/docs/Request";
import API_CONFIG from "@/config/API_CONFIG";
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Chip, Code, Divider, Snippet } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import { IoMdLock } from "react-icons/io";

interface RequestObject extends RequestProps {
  title: string;
  auth?: boolean;
}

const HomePage = () => {
  const t = useTranslations();
  const requests: RequestObject[] = [
    {
      title: t("docs.user.registration"),
      method: "POST",
      path: "/user",
      requestBody: "all",
      bodyObject: { name: "Luka", surname: "Koridze", email: "luka.koridze@gmail.com", password: "Password*123", repeat_password: "Password*123" },
      responses: [
        { status: "success", code: 201, body: { message: t("docs.user.registration_success") } },
        { status: "error", code: 400, body: { errors: { name: t("validations.min2"), email: t("validations.email_used") }, error: t("docs.bad_request") }, required: [] },
      ],
    },
    {
      title: t("docs.user.login"),
      description: t("docs.user.login_description"),
      method: "POST",
      path: "/login",
      requestBody: "all",
      bodyObject: { email: "luka.koridze@gmail.com", password: "Password*123" },
      responses: [
        { status: "success", code: 200, body: { message: t("docs.user.login_success"), accessToken: "eyJhbGciOiJI...", refreshToken: "asUAdbais...", expiresIn: API_CONFIG.accessTokenExpiration } },
        { status: "error", code: 400, body: { error: t("docs.user.invalid_credentials") } },
      ],
    },
    {
      title: t("docs.user.refresh_token"),
      description: t("docs.user.refresh_description"),
      method: "GET",
      auth: true,
      path: "/token",
      responses: [{ status: "success", code: 200, body: { message: t("docs.success"), accessToken: "eyJhbGciOiJI...", expiresIn: API_CONFIG.accessTokenExpiration } }],
    },
    {
      title: t("docs.user.data"),
      method: "GET",
      path: "/user",
      auth: true,
      responses: [
        {
          status: "success",
          code: 201,
          body: {
            _id: "664d1da0814abb91f3dea7c0",
            name: "Luka",
            surname: "Koridze",
            email: "luka.koridze@gmail.com",
            createdAt: "2024-05-21T22:18:08.234Z",
            updatedAt: "2024-05-21T22:18:08.234Z",
            __v: 0,
          },
        },
      ],
    },
  ];
  return (
    <div className="max-w-screen-2xl min-h-[120dvh] mx-auto mt-8 flex flex-col gap-8">
      <Accordion variant="bordered">
        <AccordionItem key="intro" aria-label="intro" title={t("docs_intro.title")}>
          {t("docs_intro.description")}
        </AccordionItem>
      </Accordion>
      <Accordion variant="bordered">
        <AccordionItem title={t("docs.user.title")}>
          <Accordion variant="splitted">
            {requests.map((request, index) => (
              <AccordionItem
                key={index}
                aria-label={request.title}
                startContent={
                  <div className="flex items-center text-lg font-medium gap-4">
                    <span>{request.title}</span>
                    {request.auth && <IoMdLock className="mb-1 text-red-500" />}
                  </div>
                }
              >
                <Request {...request} />
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HomePage;
