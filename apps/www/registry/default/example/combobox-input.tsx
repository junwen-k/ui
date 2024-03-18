"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Command as CommandPrimitive } from "cmdk"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command"
import { Input } from "@/registry/default/ui/input"
import { Popover, PopoverContent } from "@/registry/default/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function ComboboxInput() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [value, setValue] = React.useState("")

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command>
          <PopoverPrimitive.Anchor asChild>
            <CommandPrimitive.Input
              asChild
              value={search}
              onValueChange={setSearch}
              onKeyDown={() => setOpen(true)}
              onFocus={() => setOpen(true)}
              onBlur={() => {
                if (value) {
                  setSearch(
                    frameworks.find((framework) => framework.value === value)
                      ?.label ?? ""
                  )
                }
                setOpen(false)
              }}
            >
              <Input placeholder="Select framework..." className="w-[200px]" />
            </CommandPrimitive.Input>
          </PopoverPrimitive.Anchor>
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setSearch(
                        currentValue === value
                          ? ""
                          : frameworks.find(
                              (framework) => framework.value === currentValue
                            )?.label ?? ""
                      )
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  )
}
