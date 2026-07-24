"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronLeft, ChevronRight, Flame, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getMonthlyProgress, getMonthlyProgressStats, upsertDailyProgress } from "@/features/progress/services/progress.api";

type DailyEntry = {
  completed: boolean;
  note: string;
};

type DailyEntries = Record<string, DailyEntry>;

const STORAGE_KEY = "polyglot-daily-progress";
const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

function dateKey(date: Date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", { month: "long", year: "numeric" }).format(date);
}

function formatSelectedDate(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "numeric", month: "long" }).format(date);
}

function getStreak(entries: DailyEntries) {
  let streak = 0;
  const cursor = startOfDay(new Date());

  while (entries[dateKey(cursor)]?.completed) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function DailyProgressPage() {
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);
  const [dirtyKeys, setDirtyKeys] = useState<Set<string>>(new Set());
  const [localEntries, setLocalEntries] = useState<DailyEntries>(() => {
    if (typeof window === "undefined") return {};

    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as DailyEntries;
    } catch {
      return {};
    }
  });
  const queryClient = useQueryClient();
  const noteSyncTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const pendingEntries = useRef(new Map<string, DailyEntry>());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(localEntries));
  }, [localEntries]);

  const currentMonthKey = monthKey(currentMonth);
  const progressQuery = useQuery({
    queryKey: ["progress", currentMonthKey],
    queryFn: () => getMonthlyProgress(currentMonthKey),
    placeholderData: (previousData) => previousData,
  });
  const statsQuery = useQuery({
    queryKey: ["progress", "stats", currentMonthKey],
    queryFn: () => getMonthlyProgressStats(currentMonthKey),
    placeholderData: (previousData) => previousData,
  });
  const progressMutation = useMutation({
    mutationFn: ({ date, entry }: { date: string; entry: DailyEntry }) => upsertDailyProgress(date, entry),
    retry: false,
    onSuccess: (_, { date, entry }) => {
      pendingEntries.current.delete(date);
      // setLocalEntries((currentEntries) => {
      //   const currentEntry = currentEntries[date];
      //   if (currentEntry?.completed !== entry.completed || currentEntry?.note !== entry.note) {
      //     return currentEntries;
      //   }

      //   const { [date]: _, ...remainingEntries } = currentEntries;
      //   return remainingEntries;
      // });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });

  const syncMutation = progressMutation;

  useEffect(() => () => {
    noteSyncTimers.current.forEach((timer) => clearTimeout(timer));
  }, []);

  const entries = { ...(progressQuery.data ?? {}), ...localEntries };

  const selectedKey = dateKey(selectedDate);
  const selectedEntry = entries[selectedKey] ?? { completed: false, note: "" };
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const totalDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    return Array.from({ length: firstDay.getDay() + totalDays }, (_, index) =>
      index < firstDay.getDay() ? null : new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index - firstDay.getDay() + 1),
    );
  }, [currentMonth]);

  // const completedThisMonth = statsQuery.data?.completedDays ?? calendarDays.filter((day) => day && entries[dateKey(day)]?.completed).length;
  const completedThisMonth = calendarDays.filter(
    (day) => day && entries[dateKey(day)]?.completed,
  ).length;
  const streak = statsQuery.data?.currentStreak ?? getStreak(entries);

  function selectDate(date: Date) {
    setSelectedDate(date);
  }

  function syncEntry(date: string, entry: DailyEntry) {
    const timer = noteSyncTimers.current.get(date);
    if (timer) {
      clearTimeout(timer);
      noteSyncTimers.current.delete(date);
    }

    pendingEntries.current.set(date, entry);
    progressMutation.mutate({ date, entry });
  }

  // function updateSelectedEntry(update: Partial<DailyEntry>, syncImmediately = false) {
  //   const nextEntry = { ...selectedEntry, ...update };
  //   setLocalEntries((currentEntries) => ({ ...currentEntries, [selectedKey]: nextEntry }));

  //   if (syncImmediately) {
  //     syncEntry(selectedKey, nextEntry);
  //     return;
  //   }

  //   const existingTimer = noteSyncTimers.current.get(selectedKey);
  //   if (existingTimer) clearTimeout(existingTimer);
  //   pendingEntries.current.set(selectedKey, nextEntry);
  //   noteSyncTimers.current.set(selectedKey, setTimeout(() => syncEntry(selectedKey, nextEntry), 800));
  // }

function updateSelectedEntry(update: Partial<DailyEntry>) {
  const nextEntry = {
    ...selectedEntry,
    ...update,
  };

  setLocalEntries((current) => ({
    ...current,
    [selectedKey]: nextEntry,
  }));

  pendingEntries.current.set(selectedKey, nextEntry);

  setDirtyKeys((prev) => {
    const next = new Set(prev);
    next.add(selectedKey);
    return next;
  });
}

  // function syncSelectedNote() {
  //   const pendingEntry = pendingEntries.current.get(selectedKey);
  //   if (pendingEntry) syncEntry(selectedKey, pendingEntry);
  // }
  function syncSelectedNote() {
    const pendingEntry = pendingEntries.current.get(selectedKey);

    if (pendingEntry) {
      syncEntry(selectedKey, pendingEntry);

      pendingEntries.current.delete(selectedKey);

      setDirtyKeys((prev) => {
        const next = new Set(prev);
        next.delete(selectedKey);
        return next;
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Hành trình học tập</p>
          <h1 className="text-3xl font-bold tracking-tight">
            Progress hằng ngày
          </h1>
          <p className="mt-1 text-muted-foreground">
            Điểm danh và lưu lại những điều bạn đã học mỗi ngày.
          </p>
          {(progressQuery.isError ||
            statsQuery.isError ||
            syncMutation.isError) && (
            <p className="mt-2 text-sm text-destructive">
              Không thể đồng bộ Progress với máy chủ. Dữ liệu mới vẫn được lưu
              tạm trên trình duyệt.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
          <Flame className="size-5 fill-current" />
          <span className="font-semibold">{streak} ngày liên tiếp</span>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="capitalize">
              {formatMonth(currentMonth)}
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Tháng trước"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1,
                      1,
                    ),
                  )
                }
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Tháng sau"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                      1,
                    ),
                  )
                }
              >
                <ChevronRight />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-muted-foreground">
              {weekDays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (!day) return <div key={`blank-${index}`} />;
                const key = dateKey(day);
                const isSelected = key === selectedKey;
                const isToday = key === dateKey(today);
                const completed = entries[key]?.completed;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectDate(day)}
                    className={cn(
                      "relative flex aspect-square items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-muted",
                      isSelected && "ring-2 ring-primary ring-offset-2",
                      isToday && !isSelected && "bg-primary/10 text-primary",
                      completed &&
                        "bg-emerald-500 text-white hover:bg-emerald-600",
                    )}
                  >
                    {completed ? <Check className="size-4" /> : day.getDate()}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <i className="size-3 rounded-sm bg-emerald-500" />
                Đã hoàn thành
              </span>
              <span className="flex items-center gap-1.5">
                <i className="size-3 rounded-sm bg-primary/10" />
                Hôm nay
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                Đã hoàn thành trong tháng
              </p>
              <p className="mt-1 text-4xl font-bold">
                {completedThisMonth}
                <span className="text-lg font-medium text-muted-foreground">
                  {" "}
                  ngày
                </span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="capitalize text-lg">
                {formatSelectedDate(selectedDate)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <button
                type="button"
                onClick={() =>
                  updateSelectedEntry(
                    { completed: !selectedEntry.completed },
                    
                  )
                }
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                  selectedEntry.completed
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                    : "hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded border",
                    selectedEntry.completed &&
                      "border-emerald-500 bg-emerald-500 text-white",
                  )}
                >
                  {selectedEntry.completed && <Check className="size-4" />}
                </span>
                <span className="font-medium">Đã học hôm nay</span>
              </button>
              <div className="space-y-2">
                <label
                  htmlFor="daily-note"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <PencilLine className="size-4" />
                  Hôm nay bạn đã học gì?
                </label>
                <textarea
                  id="daily-note"
                  value={selectedEntry.note}
                  onChange={(event) =>
                    updateSelectedEntry({ note: event.target.value })
                  }
                  // onBlur={syncSelectedNote}
                  placeholder="Ví dụ: 20 từ vựng tiếng Nhật, mẫu câu chào hỏi..."
                  className="min-h-28 w-full resize-y rounded-lg border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
            </CardContent>
          </Card>
          <Button
            onClick={syncSelectedNote}
            disabled={!dirtyKeys.has(selectedKey)}
            className={!dirtyKeys.has(selectedKey) ? "hidden":"text-base"}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
