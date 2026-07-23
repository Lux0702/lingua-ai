"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, Languages, LogIn } from "lucide-react";
import { AxiosError } from "axios";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, saveAuthSession } from "@/features/auth/services/auth.api";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    try {
      saveAuthSession(await login({ email, password }));
      router.replace("/");
    } catch (error) {
      const apiMessage = error instanceof AxiosError ? (error.response?.data as { message?: string })?.message : undefined;
      setMessage(apiMessage ?? (error instanceof Error ? error.message : "Không thể đăng nhập. Vui lòng thử lại."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-muted/40 lg:grid-cols-2">
      <section className="hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15"><Languages className="size-6" /></span>
          Lingua AI
        </div>
        <div className="max-w-md">
          <p className="text-4xl font-bold leading-tight">Học ngôn ngữ theo nhịp độ của riêng bạn.</p>
          <p className="mt-4 text-primary-foreground/75">Lưu bài học, luyện tập và theo dõi tiến bộ mỗi ngày trong một không gian duy nhất.</p>
        </div>
        <p className="text-sm text-primary-foreground/60">© 2026 Lingua AI</p>
      </section>

      <main className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3 text-xl font-semibold">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Languages className="size-6" /></span>
              Lingua AI
            </div>
          </div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Chào mừng trở lại</h1>
            <p className="mt-2 text-muted-foreground">Đăng nhập để tiếp tục hành trình học tập của bạn.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" autoComplete="email" placeholder="ban@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">Mật khẩu</label>
                <button type="button" className="text-sm text-primary hover:underline">Quên mật khẩu?</button>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Nhập mật khẩu" value={password} onChange={(event) => setPassword(event.target.value)} required className="pr-10" />
                <button type="button" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            {message && <p role="status" className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">{message}</p>}
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              <LogIn /> Đăng nhập
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-muted-foreground">Chưa có tài khoản? <Link href="/register" className="font-medium text-primary hover:underline">Đăng ký</Link></p>
        </div>
      </main>
    </div>
  );
}
