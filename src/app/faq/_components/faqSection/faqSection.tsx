"use client";

import { faqData } from "@/_mock/faqData";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import Link from "next/link";
import { useState } from "react";

export const FaqSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("1");

  const selectCategoryIdHandler = (id: string) => setSelectedCategoryId(id);

  return (
    <div className="lg:max-w-5xl mx-auto lg:px-4 mt-8 lg:mt-16">
      <div className="flex flex-col lg:flex-row justify-between gap-10 relative">
        <div className="lg:w-1/5 pr-4 lg:pr-0">
          <div className="flex overflow-auto w-full lg:flex-col gap-1 lg:border-r-2 lg:pr-3 border-hint/75 sticky top-8">
            {faqData.map((category) => (
              <Link
                key={category.id}
                href={`#faq-${category.id}`}
                onClick={() => selectCategoryIdHandler(category.id)}
                className={cn(
                  "font-normal p-2.5 lg:p-3 rounded-md lg:rounded-lg relative cursor-pointer min-w-max transition-all",
                  category.id === selectedCategoryId
                    ? "text-primary bg-sub/25 font-semibold"
                    : "text-text hover:text-primary"
                )}
              >
                {category.title}
                {category.id === selectedCategoryId && (
                  <div className="hidden lg:block absolute w-0.5 bg-primary top-0 bottom-0 -right-3.5"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 px-4 lg:px-0">
          <div className="flex flex-col gap-8 lg:gap-12">
            {faqData.map((faq) => (
              <div key={faq.id} id={`faq-${faq.id}`}>
                <h3 className="mb-2.5 lg:mb-4 text-title font-semibold text-lg lg:text-xl">
                  {faq.title}
                </h3>
                <div className="bg-white lg:px-6 lg:py-3 px-4 rounded-2xl lg:rounded-3xl">
                  <Accordion type="single" collapsible className="w-full">
                    {faq.items.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-right text-base font-normal text-text hover:text-primary">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-caption text-base font-light leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
