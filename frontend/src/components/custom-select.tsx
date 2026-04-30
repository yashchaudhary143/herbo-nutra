"use client";

import { ChevronDown, Check } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  triggerClassName?: string;
};

export function CustomSelect({ options, value, onChange, ariaLabel, triggerClassName = "" }: CustomSelectProps) {
  const listId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);

  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value],
  );

  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : options[0];

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current || rootRef.current.contains(event.target as Node)) {
        return;
      }

      setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!open || selectedIndex < 0) {
      return;
    }

    optionRefs.current[selectedIndex]?.focus();
  }, [open, selectedIndex]);

  function commit(valueToSet: string) {
    onChange(valueToSet);
    setOpen(false);
  }

  function moveFocus(nextIndex: number) {
    const clampedIndex = Math.max(0, Math.min(options.length - 1, nextIndex));
    optionRefs.current[clampedIndex]?.focus();
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={`filter-trigger ${triggerClassName}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span className="min-w-0 truncate pr-2 text-left leading-6">{selectedOption?.label ?? ""}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="filter-menu"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value || option.label}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`filter-option ${isSelected ? "filter-option-active" : ""}`}
                onClick={() => commit(option.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    moveFocus(index + 1);
                  }

                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    moveFocus(index - 1);
                  }

                  if (event.key === "Escape") {
                    event.preventDefault();
                    setOpen(false);
                  }

                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    commit(option.value);
                  }
                }}
              >
                <span className="min-w-0 text-left leading-6 whitespace-normal">{option.label}</span>
                {isSelected ? <Check className="h-4 w-4 shrink-0" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
