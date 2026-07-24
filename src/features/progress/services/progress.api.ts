import { api } from "@/lib/api/axios";

export type DailyProgressEntry = {
  completed: boolean;
  note: string;
};

export type MonthlyProgressStats = {
  completedDays: number;
  currentStreak: number;
};

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? value as UnknownRecord : undefined;
}

function unwrap(value: unknown) {
  const record = asRecord(value);
  return record?.data ?? value;
}

export async function getMonthlyProgress(month: string) {
  const response = await api.get<unknown>("/progress", { params: { month } });
  const payload = unwrap(response.data);
  const items = Array.isArray(payload)
    ? payload
    : (asRecord(payload)?.progress ?? asRecord(payload)?.entries ?? asRecord(payload)?.items ?? asRecord(payload)?.days ?? []);

  if (!Array.isArray(items)) {
    const records = asRecord(items) ?? {};
    return Object.entries(records).reduce<Record<string, DailyProgressEntry>>((entries, [date, item]) => {
      const record = asRecord(item);
      if (!record) return entries;
      entries[date.slice(0, 10)] = {
        completed: Boolean(record.completed),
        note: String(record.note ?? ""),
      };
      return entries;
    }, {});
  }

  return items.reduce<Record<string, DailyProgressEntry>>((entries, item) => {
    const record = asRecord(item);
    if (!record) return entries;
    const date = record?.date ?? record?.day;
    if (typeof date !== "string") return entries;

    entries[date.slice(0, 10)] = {
      completed: Boolean(record.completed ?? record.isCompleted ?? record.checked),
      note: String(record.note ?? record.content ?? record.learnedContent ?? ""),
    };
    return entries;
  }, {});
}

export async function syncProgress(entries: Record<string, DailyProgressEntry>) {
  await api.put("/progress/sync", { entries });
}

/** Creates the progress entry when it does not exist, otherwise updates it. */
export async function upsertDailyProgress(date: string, entry: DailyProgressEntry) {
  await api.put(`/progress/${date}`, entry);
}

export async function getMonthlyProgressStats(month: string) {
  const response = await api.get<unknown>("/progress/stats", { params: { month } });
  const payload = asRecord(unwrap(response.data)) ?? {};
  return {
    completedDays: Number(payload.completedDays ?? payload.totalCompleted ?? payload.completed ?? 0),
    currentStreak: Number(payload.currentStreak ?? payload.streak ?? 0),
  } satisfies MonthlyProgressStats;
}
