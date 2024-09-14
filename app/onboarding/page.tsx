"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"


import { generateMnemonic } from "bip39";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
export default function () {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [mnemonics, setMnemonics] = useState<String[]>([]);
    const [clipboard, setClipboard] = useState("");
    const { theme } = useTheme();
    async function copyToClipboard() {
        await navigator.clipboard.writeText(clipboard);
        toast({
            title: "Copied to clipboard!!",
            description: "Mnemonics: " + clipboard
        })
    }


    function Step1() {
        return (<>
            <div>
                <h1 className="text-3xl font-bold">Welcome to Zeno</h1>
                <p className="text-sm dark:text-slate-200">Let's get Started</p>
            </div>
            <div className="flex flex-col">
                <Button onClick={() => setStep((prev) => prev + 1)} className="my-2">
                    Create a new wallet
                </Button>
                <Button variant={"outline"} className="my-2">
                    Import Wallet
                </Button>
            </div>
        </>
        )
    }

    function Step2() {
        return (<>
            <div>
                <h1 className="text-3xl font-bold">Select Network</h1>
                <p className="text-sm dark:text-slate-200">Zeno Supports Multiple following blockchains, which one you want to use ?</p>
            </div>
            <div className="flex flex-col">
                <Button onClick={() => setStep((prev) => prev + 1)} variant={theme == "dark" ? "default" : "outline"} className="my-2">
                    Solana
                </Button>
                <Button onClick={() => setStep((prev) => prev + 1)} variant={theme == "dark" ? "default" : "outline"} className="my-2">
                    Ethereum
                </Button>
            </div>
        </>
        )
    }

    function Step3() {

        useEffect(() => {
            if (mnemonics.length === 0) {
                const items = generateMnemonic();
                setClipboard(items);
                const arr = items.split(" ");
                setMnemonics(arr);
            }
        }, [mnemonics]);

        if (mnemonics.length === 0) {
            return;
        }
        const content = mnemonics.map((item, index) => (
            <div
                key={index} className="w-1/2 md:w-1/4 p-2">
                <div className="md:h-full flex items-center justify-center rounded-md border p-2 md:p-4">
                    <p className="text-sm text-center text-white truncate">
                        {item}
                    </p>
                </div>
            </div>
        ));

        return (<>
            <div className="my-4">
                <h1 className="text-3xl font-bold">Secret Recovery Phrase</h1>
                <p className="text-sm  dark:text-slate-200">Save these words in a safe place. </p>
            </div>

            <Card onClick={copyToClipboard} className="w-[200px] cursor-pointer mx-auto md:w-[500px]">
                <CardHeader>
                    <CardDescription>Click anywhere on this card to copy</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex flex-wrap -mx-2">
                        {content}
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col">
                <Button className="my-2">
                    Next
                </Button>
            </div>
        </>
        )
    }


    return (

        <div className="w-full flex justify-center items-center min-h-screen">
            <div className="min-w-2/5 h-2/3 flex justify-between flex-col text-center">
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
            </div>
        </div>
    )
}
