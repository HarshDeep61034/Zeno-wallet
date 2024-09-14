"use client"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
export default function () {
    const { systemTheme, theme, setTheme } = useTheme();
    const router = useRouter();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    return (
        <nav className="w-full py-4 flex justify-between">
            <div className="Logo text-2xl font-bold">ZENO</div>
            <div className="flex">
                <Button onClick={()=>router.push("/onboarding")} variant="outline">Get Started</Button>
                <Button
                    onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
                 className="mx-4">
                    Toggle Mode
                </Button>
            </div>
        </nav>
    );
}