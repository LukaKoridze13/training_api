"use client";
import Request from "@/components/docs/Request";
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Chip, Code, Divider, Snippet } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

const HomePage = () => {
  const t = useTranslations();
  const API = process.env.NEXT_PUBLIC_API;
  return (
    <div className="max-w-screen-2xl mx-auto mt-8">
      <Accordion variant="bordered">
        <AccordionItem title={t("docs.user.title")}>
          <Accordion variant="splitted">
            <AccordionItem key={t("docs.user.registration")} aria-label={t("docs.user.registration")} title={t("docs.user.registration")}>
              <Request
                method="POST"
                path="/user"
                requestBody={["name"]}
                bodyObject={{ name: "Luka", surname: "Koridze", email: "luka.koridze@gmail.com", password: "Password*123", repeat_password: "Password*123" }}
                responses={[
                  { status: "success", code: 201, body: { message: t("docs.user.registration_success") } },
                  { status: "error", code: 400, body: { errors: { name: t("validations.min2"), email: t("validations.email_used") } } },
                ]}
              />
            </AccordionItem>
          </Accordion>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HomePage;
