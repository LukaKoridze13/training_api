"use client";
import React, { useRef } from "react";
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
      <Snippet className="w-fit" variant="bordered" symbol={false}>
        {API + path}
      </Snippet>
      {requestBody && (
        <Card classNames={{ base: "border-green-600 border w-full" }}>
          <CardHeader className="flex gap-3">
            <p>Request Body {requestBody === "all" ? " - " + t("all_required") : " - " + t("required_color")}</p>
          </CardHeader>
          <Divider />
          <CardBody>{bodyObject && formatObjectToJSX(bodyObject, requestBody)}</CardBody>
        </Card>
      )}
      <Card classNames={{ base: "border-green-600 border w-full" }}>
        <CardHeader className="flex gap-3">
          <p>Response</p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-6">
          {responses.map((response, index) => (
            <>
              {Boolean(auth && response.code > 401 && responses[index - 1].code < 401 && responses.length !== 2) && (
                <div className="flex flex-col gap-4">
                  <Chip color="danger">Error 401</Chip>
                  {formatObjectToJSX({ error: t("unauthorized") })}
                </div>
              )}
              {Boolean(auth && responses.length === 2) && (
                <div className="flex flex-col gap-4">
                  <Chip color="danger">Error 401</Chip>
                  {formatObjectToJSX({ error: t("unauthorized") })}
                </div>
              )}
              <div key={index + "resp" + JSON.stringify(response)} className="flex flex-col gap-4">
                <Chip color={response.status === "success" ? "success" : "danger"}>
                  {response.status === "success" ? "Success" : "Error"}: {response.code}
                </Chip>
                {formatObjectToJSX(response.body, response.required)}
              </div>
            </>
          ))}

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
  const formatValue = (value: any, indentLevel: number) => {
    if (Array.isArray(value)) {
      return (
        <>
          <span>[</span>
          {value.map((item: any, index: number) => (
            <div key={index} style={{ paddingLeft: `${16}px` }}>
              {formatValue(item, indentLevel + 1)}
              {index < value.length - 1 && ","}
            </div>
          ))}
          <span>]</span>
        </>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <>
          <span>{"{"}</span>
          {Object.entries(value).map(([nestedKey, nestedValue], index) => (
            <div key={nestedKey} style={{ paddingLeft: `16px` }}>
              <span className={`${required && required !== "all" ? (!required.includes(nestedKey) ? "text-amber-500" : "text-emerald-500") : ""}`}>
                {nestedKey}: {formatValue(nestedValue, indentLevel + 1)}
                {index < Object.entries(value).length - 1 && ","}
              </span>
            </div>
          ))}
          <span>{"}"}</span>
        </>
      );
    } else {
      return <span>{typeof value === "string" ? `"${value}"` : value}</span>;
    }
  };

  return (
    <Code>
      {Array.isArray(obj) ? <span>[</span> : <span>{"{"}</span>}
      {Array.isArray(obj)
        ? obj.map((item: any, index: number) => (
            <div key={index} style={{ paddingLeft: `${16}px` }}>
              {formatValue(item, 0)}
              {index < obj.length - 1 && ","}
            </div>
          ))
        : Object.entries(obj).map(([key, value], index) => (
            <div key={key} className="pl-4">
              <span className={`${required && required !== "all" ? (!required.includes(key) ? "text-amber-500" : "text-emerald-500") : ""}`}>
                {key}: {formatValue(value, 1)}
                {index < Object.entries(obj).length - 1 && ","}
              </span>
            </div>
          ))}
      {Array.isArray(obj) ? <span>]</span> : <span>{"}"}</span>}
    </Code>
  );
};

export default Request;
