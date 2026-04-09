"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  summary: string;
  points: string[];
  closing?: string;
};

export function TeamMembersGrid({ members }: { members: TeamMember[] }) {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {members.map((member) => (
        <div
          key={member.name}
          className="flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm transition hover:shadow-md"
        >
          <div className="flex flex-col gap-4 p-6 md:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--green-800)]">
                {member.role}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {member.name}
              </h3>
            </div>

            <p className="text-sm leading-6 text-[var(--muted)]">
              {member.summary}
            </p>

            <div className="space-y-2">
              {member.points.slice(0, 3).map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm leading-5 text-[var(--muted)]"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--green-800)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                setExpandedMember(expandedMember === member.name ? null : member.name)
              }
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-950)] transition hover:text-[var(--green-800)]"
            >
              {expandedMember === member.name ? "Show less" : "Read full bio"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  expandedMember === member.name ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedMember === member.name && (
              <div className="mt-4 space-y-4 border-t border-[var(--line)] pt-4">
                {member.points.length > 3 && (
                  <div className="space-y-2">
                    {member.points.slice(3).map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm leading-5 text-[var(--muted)]"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--green-800)]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}
                {member.closing && (
                  <p className="text-sm leading-6 text-[var(--muted)]">
                    {member.closing}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
