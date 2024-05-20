"use client";
import React from "react";
import { AccordionItem, Card, CardBody, CardHeader, Chip, Code, Divider, Snippet } from "@nextui-org/react";

type MethodColor = "success" | "primary" | "warning" | "danger" | "default" | "secondary";

interface RequestProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  requestBody?: {
    required: "all" | "some";
  };
}

const Request = ({ method, path }: RequestProps) => {
  let methodColor: MethodColor = "success";
  if (method === "GET") methodColor = "primary";
  if (method === "PUT") methodColor = "warning";
  if (method === "DELETE") methodColor = "danger";
  const API = process.env.NEXT_PUBLIC_API;
  return (
    <div className="flex flex-col gap-3">
      <Chip color={methodColor} size="lg">
        {method}
      </Chip>
      <Snippet className="w-fit" variant="bordered" color="success" symbol={false}>
        {API + path}
      </Snippet>
      <Card classNames={{ base: "border-green-600 border w-[600px]" }}>
        <CardHeader className="flex gap-3">
          <p>Request Body - All Fields Required</p>
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
  );
};

function formatObjectToHTML(obj: any) {
  const entries = Object.entries(obj);

  const formattedEntries = entries.map(([key, value]) => (
    <span key={key}>
      {/* @ts-ignore */}
      &nbsp; {key}: "{value}",
      <br />
    </span>
  ));

  return (
    <div>
      <span>{"{"}</span>
      <br />
      {formattedEntries}
      <span>{"}"}</span>
    </div>
  );
}

export default Request;
