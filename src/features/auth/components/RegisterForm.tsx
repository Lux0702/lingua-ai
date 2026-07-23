"use client";

import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { Languages, UserPlus } from "lucide-react";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register, saveAuthSession } from "@/features/auth/services/auth.api";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    try {
      saveAuthSession(await register({ name, email, password }));
      router.replace("/");
    } catch (error) {
      const apiMessage = error instanceof AxiosError ? (error.response?.data as { message?: string })?.message : undefined;
      setMessage(apiMessage ?? (error instanceof Error ? error.message : "Không thể đăng ký. Vui lòng thử lại."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <div className="w-full max-w-sm rounded-2xl bg-background p-7 shadow-sm ring-1 ring-border sm:p-8">
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-3 text-xl font-semibold"><span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Languages className="size-6" /></span>Lingua AI</div>
          <h1 className="text-3xl font-bold">Tạo tài khoản</h1>
          <p className="mt-2 text-muted-foreground">Bắt đầu hành trình học ngôn ngữ của bạn.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2"><label htmlFor="name" className="text-sm font-medium">Họ và tên</label><Input id="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required /></div>
          <div className="space-y-2"><label htmlFor="email" className="text-sm font-medium">Email</label><Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div>
          <div className="space-y-2"><label htmlFor="password" className="text-sm font-medium">Mật khẩu</label><Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={6} required /></div>
          {message && <p role="status" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{message}</p>}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}><UserPlus />Đăng ký</Button>
        </form>
        <p className="mt-8 text-center text-sm text-muted-foreground">Đã có tài khoản? <Link href="/login" className="font-medium text-primary hover:underline">Đăng nhập</Link></p>
      </div>
    </main>
  );
}
