"use client";
import React from "react";
import { Card, CardBody, CardHeader, Chip, Code, Divider, Snippet } from "@nextui-org/react";
import { useTranslations } from "next-intl";

type MethodColor = "success" | "primary" | "warning" | "danger" | "default" | "secondary";

interface ResponseObj {
  status: "success" | "error";
  code: number;
  body: Object;
  required?: "all" | string[];
}

export interface RequestProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  requestBody?: "all" | string[];
  bodyObject?: Object;
  responses: ResponseObj[];
  description?: string;
  auth?: boolean;
}

const Request = ({ method, path, requestBody, bodyObject, responses, description, auth = false }: RequestProps) => {
  const t = useTranslations("docs");
  let methodColor: MethodColor = "success";
  if (method === "GET") methodColor = "primary";
  if (method === "PUT") methodColor = "warning";
  if (method === "DELETE") methodColor = "danger";
  const API = process.env.NEXT_PUBLIC_API;
  return (
    <div className="flex flex-col gap-3">
      {description && <p>{description}</p>}
      <Chip color={methodColor} size="lg">
        {method}
      </Chip>
      <Snippet className="w-fit" variant="bordered" color="success" symbol={false}>
        {API + path}
      </Snippet>
      {requestBody && (
        <Card classNames={{ base: "border-green-600 border w-[600px]" }}>
          <CardHeader className="flex gap-3">
            <p>Request Body {requestBody === "all" ? " - " + t("all_required") : " - " + t("required_color")}</p>
          </CardHeader>
          <Divider />
          <CardBody>{bodyObject && formatObjectToJSX(bodyObject, requestBody)}</CardBody>
        </Card>
      )}
      <Card classNames={{ base: "border-green-600 border w-[600px]" }}>
        <CardHeader className="flex gap-3">
          <p>Response</p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-6">
          {responses.map((response, index) => (
            <div key={index + "resp" + JSON.stringify(response)} className="flex flex-col gap-4">
              <Chip color={response.status === "success" ? "success" : "danger"}>
                {response.status === "success" ? "Success" : "Error"}: {response.code}
              </Chip>
              {formatObjectToJSX(response.body, response.required)}
            </div>
          ))}
          {auth && (
            <div className="flex flex-col gap-4">
              <Chip color="danger">Error 401</Chip>
              {formatObjectToJSX({ error: t("unauthorized") })}
            </div>
          )}
          <div className="flex flex-col gap-4">
            <Chip color="danger">Error 500</Chip>
            {formatObjectToJSX({ error: t("internal_server_error") })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const formatObjectToJSX = (obj: any, required?: "all" | string[]) => {
  return (
    <Code>
      <span>{"{"}</span>
      {Object.entries(obj).map(([key, value], index) => {
        if (typeof value === "object") {
          return (
            <>
              <br />
              <span>
                &nbsp; <span className={`${required && required !== "all" ? (!required?.includes(key) ? "text-amber-500" : "text-emerald-500") : ""}`}>{key}:</span> {"{"}
              </span>
              {/* @ts-ignore */}
              {Object.entries(value).map(([key, value], index) => (
                <>
                  <br />
                  <span key={index} className={`${required && required !== "all" ? (!required?.includes(key) ? "text-amber-500" : "text-emerald-500") : ""}`}>
                    {/* @ts-ignore */}
                    &nbsp; &nbsp; {key}: {typeof value === "string" ? `"${value}"` : value} {index < Object.entries(value).length - 1 && ","}
                  </span>
                </>
              ))}
              <br />
              <span>&nbsp; {"}"}</span>
            </>
          );
        } else {
          return (
            <>
              <br />
              {/* @ts-ignore */}
              <span key={index} className={`${required && required !== "all" ? (!required?.includes(key) ? "text-amber-500" : "text-emerald-500") : ""}`}>
                {/* @ts-ignore */}
                &nbsp; {key}: {typeof value === "string" ? `"${value}"` : value}{index < Object.entries(obj).length - 1 && ","}
              </span>
            </>
          );
        }
      })}
      <br />
      <span>{"}"}</span>
    </Code>
  );
};

export default Request;
