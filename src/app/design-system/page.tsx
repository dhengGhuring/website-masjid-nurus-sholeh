"use client";

import {
    Button,
    Input,
    Select,
    SelectItem,
    Checkbox,
    Switch,
    Chip,
    Card,
    CardBody
} from "@heroui/react";
import { Wallet } from "lucide-react";

export default function DesignSystemPage() {
    return (
        <div className="p-10 space-y-10 min-h-screen bg-background text-foreground font-sans">
            <header className="mb-10">
                <h1 className="text-4xl font-bold">Design System</h1>
                <p className="text-muted-foreground mt-2">
                    Panduan visual lengkap dengan kode warna & ukuran pixel
                </p>
            </header>

            {/* Colors */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Palet Warna Utama</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ColorCard name="Background" variable="--background" bg="bg-background" text="text-foreground" />
                    <ColorCard name="Foreground" variable="--foreground" bg="bg-foreground" text="text-white" />
                    <ColorCard name="Card" variable="--card" bg="bg-card" text="text-card-foreground" />
                    <ColorCard name="Primary" variable="--primary" bg="bg-primary" text="text-primary-foreground" />
                    <ColorCard name="Secondary" variable="--secondary" bg="bg-secondary" text="text-secondary-foreground" />
                    <ColorCard name="Muted" variable="--muted" bg="bg-muted" text="text-muted-foreground" />
                    <ColorCard name="Accent" variable="--accent" bg="bg-accent" text="text-accent-foreground" />
                    <ColorCard name="Destructive" variable="--destructive" bg="bg-destructive" text="text-destructive-foreground" />
                </div>

                <h3 className="text-xl font-medium mt-8">Warna Khusus Keuangan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ColorCard name="Income" variable="--income" bg="bg-[var(--income)]" text="text-white" />
                    <ColorCard name="Expense" variable="--expense" bg="bg-[var(--expense)]" text="text-white" />
                    <ColorCard name="Balance" variable="--balance" bg="bg-[var(--balance)]" text="text-white" />
                </div>

                <h3 className="text-xl font-medium mt-8">Warna Sidebar</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ColorCard name="Sidebar BG" variable="--sidebar-bg" bg="bg-[var(--sidebar-bg)]" text="text-white" />
                    <ColorCard name="Sidebar Accent" variable="--sidebar-accent" bg="bg-[var(--sidebar-accent)]" text="text-white" />
                </div>
            </section>

            {/* Gradients */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Gradients</h2>
                <p className="text-muted-foreground">Gradient yang digunakan dalam aplikasi.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GradientCard name="Gradient Primary" variable="--gradient-primary" bg="bg-[image:var(--image-gradient-primary)]" value="linear-gradient(135deg, #4A9C6D 0%, #297A52 100%)" />
                    <GradientCard name="Gradient Hero" variable="--gradient-hero" bg="bg-[image:var(--image-gradient-hero)]" value="linear-gradient(135deg, #EEF5F1 0%, #E0EEE5 100%)" />
                    <GradientCard name="Gradient Card" variable="--gradient-card" bg="bg-[image:var(--image-gradient-card)]" value="linear-gradient(180deg, #FFFFFF 0%, #F5FAF7 100%)" />
                </div>
            </section>

            {/* Form Elements */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Form Elements</h2>
                <p className="text-muted-foreground">Input height: 40px | Border radius: 6px</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Input Default</label>
                        <Input placeholder="Masukkan teks..." size="sm" classNames={{ inputWrapper: "h-[40px] px-3 py-2 rounded-md" }} />
                        <p className="text-xs text-muted-foreground">Height: 40px, Padding: 12px 16px</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Input Disabled</label>
                        <Input isDisabled placeholder="Tidak dapat diedit" size="sm" classNames={{ inputWrapper: "h-[40px] px-3 py-2 rounded-md" }} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select</label>
                        <Select placeholder="Pilih kategori" size="sm" classNames={{ trigger: "h-[40px] min-h-[40px] rounded-md" }}>
                            <SelectItem key="cat1">Kategori 1</SelectItem>
                            <SelectItem key="cat2">Kategori 2</SelectItem>
                        </Select>
                        <p className="text-xs text-muted-foreground">Height: 40px</p>
                    </div>

                    <div className="space-y-4">
                        <Checkbox defaultSelected size="md">Checkbox (16x16px)</Checkbox>
                        <Switch defaultSelected size="md">Switch (44x24px)</Switch>
                    </div>
                </div>
            </section>

            {/* Badges */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Badges</h2>
                <p className="text-muted-foreground">Padding: 4px 10px | Font size: 12px | Border radius: 9999px</p>
                <div className="flex flex-wrap gap-4">
                    <Chip color="primary" size="sm">Default</Chip>
                    <Chip color="secondary" size="sm">Secondary</Chip>
                    <Chip variant="bordered" size="sm">Outline</Chip>
                    <Chip color="danger" size="sm">Destructive</Chip>
                    <Chip className="bg-[var(--income)] text-white" size="sm">Pemasukan</Chip>
                    <Chip className="bg-[var(--expense)] text-white" size="sm">Pengeluaran</Chip>
                    <Chip className="bg-[var(--balance)] text-white" size="sm">Saldo</Chip>
                </div>
            </section>

            {/* Icon Sizes */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Icon Sizes</h2>
                <p className="text-muted-foreground">Ukuran icon standar dari Lucide React.</p>
                <div className="flex flex-wrap gap-8 items-end">
                    <div className="flex flex-col items-center gap-2">
                        <Wallet className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono bg-muted px-1 rounded">16px</span>
                        <span className="text-xs text-muted-foreground">h-4 w-4</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Wallet className="w-5 h-5 text-primary" />
                        <span className="text-xs font-mono bg-muted px-1 rounded">20px</span>
                        <span className="text-xs text-muted-foreground">h-5 w-5</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Wallet className="w-6 h-6 text-primary" />
                        <span className="text-xs font-mono bg-muted px-1 rounded">24px</span>
                        <span className="text-xs text-muted-foreground">h-6 w-6</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Wallet className="w-8 h-8 text-primary" />
                        <span className="text-xs font-mono bg-muted px-1 rounded">32px</span>
                        <span className="text-xs text-muted-foreground">h-8 w-8</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Wallet className="w-10 h-10 text-primary" />
                        <span className="text-xs font-mono bg-muted px-1 rounded">40px</span>
                        <span className="text-xs text-muted-foreground">h-10 w-10</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Wallet className="w-12 h-12 text-primary" />
                        <span className="text-xs font-mono bg-muted px-1 rounded">48px</span>
                        <span className="text-xs text-muted-foreground">h-12 w-12</span>
                    </div>
                </div>
            </section>

            {/* Status Indicators */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Status Indicators</h2>
                <p className="text-muted-foreground">Padding: 16px | Border radius: 8px</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-success-50 border-success-200 border shadow-none" shadow="none">
                        <CardBody className="flex flex-row items-center gap-3 p-4">
                            <div className="text-success text-lg">✓</div>
                            <div>
                                <p className="font-semibold text-success-900">Success</p>
                                <p className="text-sm text-success-700">Transaksi berhasil disimpan</p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="bg-danger-50 border-danger-200 border shadow-none" shadow="none">
                        <CardBody className="flex flex-row items-center gap-3 p-4">
                            <div className="text-danger text-lg">✕</div>
                            <div>
                                <p className="font-semibold text-danger-900">Error</p>
                                <p className="text-sm text-danger-700">Gagal menyimpan data</p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="bg-warning-50 border-warning-200 border shadow-none" shadow="none">
                        <CardBody className="flex flex-row items-center gap-3 p-4">
                            <div className="text-warning text-lg">!</div>
                            <div>
                                <p className="font-semibold text-warning-900">Warning</p>
                                <p className="text-sm text-warning-700">Data belum lengkap</p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="bg-primary-50 border-primary-200 border shadow-none" shadow="none">
                        <CardBody className="flex flex-row items-center gap-3 p-4">
                            <div className="text-primary text-lg">i</div>
                            <div>
                                <p className="font-semibold text-primary-900">Info</p>
                                <p className="text-sm text-primary-700">Informasi tambahan</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>

            {/* Typography */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Tipografi</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="w-24 text-sm text-muted-foreground">H1</span>
                        <h1 className="text-4xl font-bold">Aa - Heading 1 (36px)</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 text-sm text-muted-foreground">H2</span>
                        <h2 className="text-3xl font-semibold">Aa - Heading 2 (30px)</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 text-sm text-muted-foreground">H3</span>
                        <h3 className="text-2xl font-semibold">Aa - Heading 3 (24px)</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 text-sm text-muted-foreground">H4</span>
                        <h4 className="text-xl font-medium">Aa - Heading 4 (20px)</h4>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 text-sm text-muted-foreground">Body</span>
                        <p className="text-base">Aa - Body Base (16px)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 text-sm text-muted-foreground">Small</span>
                        <p className="text-sm">Aa - Text Small (14px)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-24 text-sm text-muted-foreground">XS</span>
                        <p className="text-xs">Aa - Text Extra Small (12px)</p>
                    </div>
                </div>
            </section>

            {/* Spacing */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Spacing Scale (4px increments)</h2>
                <div className="flex flex-wrap gap-4 items-end">
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((scale) => (
                        <div key={scale} className="flex flex-col items-center gap-2">
                            <div className={`bg-primary w-4 h-${scale} rounded`}></div>
                            <span className="text-xs">{scale * 4}px</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Border Radius */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Border Radius</h2>
                <div className="flex flex-wrap gap-4">
                    <div className="w-24 h-24 bg-primary rounded-none flex items-center justify-center text-white text-xs">None (0px)</div>
                    <div className="w-24 h-24 bg-primary rounded-sm flex items-center justify-center text-white text-xs">SM (2px)</div>
                    <div className="w-24 h-24 bg-primary rounded-md flex items-center justify-center text-white text-xs">MD (6px)</div>
                    <div className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center text-white text-xs">LG (8px)</div>
                    <div className="w-24 h-24 bg-primary rounded-xl flex items-center justify-center text-white text-xs">XL (12px)</div>
                    <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center text-white text-xs">2XL (16px)</div>
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-xs">Full</div>
                </div>
            </section>

            {/* Buttons */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Tombol (Buttons)</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Variants</h3>
                    <div className="flex flex-wrap gap-4">
                        <Button color="primary">Default (Primary)</Button>
                        <Button color="secondary">Secondary</Button>
                        <Button variant="bordered">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="light">Link</Button>
                        <Button color="danger">Destructive</Button>
                        <Button className="bg-[var(--income)] text-white">Income</Button>
                        <Button className="bg-[var(--expense)] text-white">Expense</Button>
                    </div>
                </div>

                <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-medium">Sizes</h3>
                    <div className="flex flex-wrap items-center gap-4">
                        <Button size="sm">Small</Button>
                        <Button size="md">Default (Medium)</Button>
                        <Button size="lg">Large</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ColorCard({ name, variable, bg, text }: { name: string; variable: string; bg: string; text: string }) {
    return (
        <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{name}</span>
            </div>
            <div className={`h-20 w-full rounded-md ${bg} flex items-center justify-center border shadow-inner`}>
                <span className={`${text} text-xs font-mono`}>{variable}</span>
            </div>
        </div>
    );
}

function GradientCard({ name, variable, value, bg }: { name: string; variable: string; value: string; bg: string }) {
    return (
        <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className={`h-32 w-full rounded-md ${bg} mb-4 flex items-center justify-center text-white/90 text-sm font-medium`}>
                {name}
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">CSS Variable</span>
                    <span className="font-mono text-primary">{variable}</span>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                    <span className="text-muted-foreground">Value:</span>
                    <span className="font-mono truncate" title={value}>{value}</span>
                </div>
            </div>
        </div>
    );
}
