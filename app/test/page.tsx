"use client";

import { useState } from "react";
import SelectBox from "@/components/ui/SelectBox";
import { Button } from "@/components/ui/Button"; // Fixed import if Button was named export, checking previous view_file of Button.tsx it was named export
import { Textbox } from "@/components/ui/Textbox";
import { Calendar } from "@/components/ui/Calendar";
import { DatePicker } from "@/components/ui/DatePicker";
import { RadioGroup, Radiobox } from "@/components/ui/Radiobox";

export default function ReportPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col gap-4 p-4 sm:ml-64">
      <h1 className="text-2xl font-bold">Report</h1>
      <div className="flex gap-4 items-end">
        <div className="w-32">
          <SelectBox label="Report" options={[]} />
        </div>
        <div className="w-32">
          <SelectBox label="Report" options={[]} />
        </div>
        <div className="w-32">
          <SelectBox label="Report" options={[]} />
        </div>
        <Button>Search</Button>
      </div>

      <div className="grid gap-8 p-4 border rounded-lg">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Textbox</h2>
          <div className="flex flex-col gap-4">
            <Textbox placeholder="Default width (100%)" />
            <Textbox width="300px" placeholder="Fixed width (300px)" />
            <Textbox width="50%" placeholder="Percentage width (50%)" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Radiobox</h2>
          <RadioGroup className="flex gap-4">
            <Radiobox name="option" label="Option 1" value="1" defaultChecked />
            <Radiobox name="option" label="Option 2" value="2" />
            <Radiobox name="option" label="Option 3" value="3" disabled />
          </RadioGroup>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Calendar</h2>
          <div className="w-fit border rounded-md p-4">
            <DatePicker selected={date} onChange={(date) => setDate(date || undefined)} />
          </div>
        </section>
      </div>
    </div>
  );
}
