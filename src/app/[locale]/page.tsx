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
  const userRequests: RequestObject[] = [
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
  const postRequests: RequestObject[] = [
    {
      title: t("docs.post.get"),
      method: "GET",
      path: "/post/:id",
      responses: [
        {
          status: "success",
          code: 200,
          body: {
            _id: "664dc75f7ddf0ec704256947",
            title: "Hello World!",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
            author: {
              _id: "664d24c128442f284480fe00",
              name: "Luka",
              surname: "Koridze",
              email: "luka.koridze13@gmail.com",
              createdAt: "2024-05-21T22:48:33.377Z",
              updatedAt: "2024-05-21T22:48:33.377Z",
              __v: 0,
            },
            createdAt: "2024-05-22T10:22:23.535Z",
            updatedAt: "2024-05-22T10:22:23.535Z",
            __v: 0,
          },
        },
        {
          status: "error",
          code: 404,
          body: {
            error: t("docs.not_found"),
          },
        },
      ],
    },
    {
      title: t("docs.post.feed"),
      description: t("docs.post.feed_desc"),
      method: "GET",
      path: "/post/feed?page=1&perPage=20",
      responses: [
        {
          status: "success",
          code: 200,
          body: {
            posts: [
              {
                _id: "664dcb9b7ddf0ec70425694d",
                title: "Hello World!",
                content: "Lorem ipsum dolor sit amet...",
                author: {
                  _id: "664d24c128442f284480fe00",
                  name: "Luka",
                  surname: "Koridze",
                  email: "luka.koridze13@gmail.com",
                  createdAt: "2024-05-21T22:48:33.377Z",
                  updatedAt: "2024-05-21T22:48:33.377Z",
                  __v: 0,
                },
                createdAt: "2024-05-22T10:40:27.948Z",
                updatedAt: "2024-05-22T10:40:27.948Z",
                __v: 0,
              },
              {
                _id: "664dc7967ddf0ec704256949",
                title: "ახალი სათაური",
                content: "ახალი ტექსტი",
                author: {
                  _id: "664d24c128442f284480fe00",
                  name: "Luka",
                  surname: "Koridze",
                  email: "luka.koridze13@gmail.com",
                  createdAt: "2024-05-21T22:48:33.377Z",
                  updatedAt: "2024-05-21T22:48:33.377Z",
                  __v: 0,
                },
                createdAt: "2024-05-22T10:23:18.495Z",
                updatedAt: "2024-05-22T11:36:33.641Z",
                __v: 0,
              },
            ],
            totalPages: 1,
            currentPage: 1,
            perPage: 20,
          },
        },
      ],
    },
    {
      title: t("docs.post.create"),
      method: "POST",
      path: "/post",
      auth: true,
      requestBody: "all",
      bodyObject: { title: "Hello World!", password: "Lorem ipsum sit amen dolores..." },
      responses: [
        {
          status: "success",
          code: 200,
          body: {
            message: t("docs.success"),
            post: {
              _id: "664dc7967ddf0ec704256949",
              title: "Hello World!",
              content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              author: {
                _id: "664d24c128442f284480fe00",
                name: "Luka",
                surname: "Koridze",
                email: "luka.koridze13@gmail.com",
                createdAt: "2024-05-21T22:48:33.377Z",
                updatedAt: "2024-05-21T22:48:33.377Z",
                __v: 0,
              },
              createdAt: "2024-05-22T10:23:18.495Z",
              updatedAt: "2024-05-22T10:23:18.495Z",
              __v: 0,
            },
          },
        },
        {
          status: "error",
          code: 400,
          body: {
            error: t("docs.bad_request"),
            errors: {
              title: t("validations.invalid_field"),
              content: t("validations.invalid_field"),
            },
          },
          required: [],
        },
      ],
    },
    {
      title: t("docs.post.update"),
      method: "PUT",
      path: "/post/:id",
      auth: true,
      requestBody: [],
      bodyObject: { title: "Hello World!", password: "Lorem ipsum sit amen dolores..." },
      responses: [
        {
          status: "success",
          code: 200,
          body: {
            message: t("docs.success"),
            post: {
              _id: "664dc7967ddf0ec704256949",
              title: "Hello World!",
              content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              author: {
                _id: "664d24c128442f284480fe00",
                name: "Luka",
                surname: "Koridze",
                email: "luka.koridze13@gmail.com",
                createdAt: "2024-05-21T22:48:33.377Z",
                updatedAt: "2024-05-21T22:48:33.377Z",
                __v: 0,
              },
              createdAt: "2024-05-22T10:23:18.495Z",
              updatedAt: "2024-05-22T10:23:18.495Z",
              __v: 0,
            },
          },
        },
        {
          status: "error",
          code: 400,
          body: {
            error: t("docs.bad_request"),
          },
        },
        {
          status: "error",
          code: 403,
          body: {
            error: t("docs.forbidden"),
          },
        },
        {
          status: "error",
          code: 404,
          body: {
            error: t("docs.not_found"),
          },
        },
      ],
    },
    {
      title: t("docs.post.delete"),
      method: "DELETE",
      path: "/post/:id",
      auth: true,
      responses: [
        {
          status: "success",
          code: 200,
          body: {
            message: t("docs.success"),
          },
        },
        {
          status: "error",
          code: 403,
          body: {
            error: t("docs.forbidden"),
          },
        },
        {
          status: "error",
          code: 404,
          body: {
            error: t("docs.not_found"),
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
            {userRequests.map((request, index) => (
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
        <AccordionItem title={t("docs.post.title")}>
          <Accordion variant="splitted">
            {postRequests.map((request, index) => (
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
