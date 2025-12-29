"use client";

import React, { useState } from "react";
import { Button, Input, Checkbox, Card, CardBody, Link } from "@heroui/react";
import { Mail, Lock, Eye, EyeOff, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { mapAuthError } from "../utils/authErrorMapper";
import { AuthError } from "@supabase/supabase-js";

export function LoginForm() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(mapAuthError(error));
            } else {
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            setError(mapAuthError(err as AuthError));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[image:var(--image-gradient-hero)] p-4 font-sans">

            {/* Brand Header */}
            <div className="flex flex-col items-center mb-8 gap-3">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 text-white">
                    <Building2 size={32} />
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground">Masjid Nurus Sholeh</h1>
                    <p className="text-muted-foreground text-sm">Portal Admin Keuangan</p>
                </div>
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-md shadow-xl border border-white/20">
                <CardBody className="p-8 gap-6">
                    <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold text-foreground">Masuk ke Akun Anda</h2>
                        <p className="text-sm text-muted-foreground">Kelola keuangan masjid dengan mudah</p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        {error && (
                            <div className="bg-danger-50 text-danger text-sm p-3 rounded-md text-center">
                                {error}
                            </div>
                        )}
                        <Input
                            label="Email"
                            labelPlacement="outside"
                            placeholder="admin@masjid.com"
                            value={email}
                            onValueChange={setEmail}
                            startContent={
                                <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" size={18} />
                            }
                            variant="bordered"
                            classNames={{
                                inputWrapper: "bg-white",
                            }}
                            isRequired
                        />

                        <Input
                            label="Password"
                            labelPlacement="outside"
                            placeholder="********"
                            value={password}
                            onValueChange={setPassword}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeOff className="text-2xl text-default-400 pointer-events-none" size={18} />
                                    ) : (
                                        <Eye className="text-2xl text-default-400 pointer-events-none" size={18} />
                                    )}
                                </button>
                            }
                            startContent={
                                <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" size={18} />
                            }
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                            classNames={{
                                inputWrapper: "bg-white",
                            }}
                            isRequired
                        />

                        <div className="flex justify-between items-center mt-2">
                            <Checkbox classNames={{ label: "text-small text-muted-foreground" }}>
                                Ingat saya
                            </Checkbox>
                            <Link href="#" size="sm" className="text-primary font-medium">
                                Lupa password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            color="primary"
                            className="w-full font-semibold shadow-md shadow-primary/20 mt-2"
                            size="lg"
                            isLoading={loading}
                        >
                            Masuk
                        </Button>
                    </form>

                    <div className="text-center mt-2">
                        <Link href="/" size="sm" className="text-muted-foreground hover:text-foreground transition-colors">
                            ← Kembali ke Halaman Publik
                        </Link>
                    </div>
                </CardBody>
            </Card>

            {/* Footer */}
            <p className="mt-8 text-xs text-muted-foreground">
                Akses terbatas untuk pengurus masjid
            </p>
        </div>
    );
}
