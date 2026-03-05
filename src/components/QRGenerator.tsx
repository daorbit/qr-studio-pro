import { useState, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Link, Copy, Check } from "lucide-react";

const QRGenerator = () => {
  const [value, setValue] = useState("https://lovable.dev");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-studio.png";
    a.click();
  }, []);

  const handleCopy = useCallback(async () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-xl mx-auto">
      {/* Input */}
      <div className="w-full relative">
        <Link className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter URL or text..."
          className="pl-11 h-14 text-base bg-secondary border-border focus:ring-2 focus:ring-primary/40 font-body"
        />
      </div>

      {/* QR Preview */}
      <div
        ref={canvasRef}
        className="relative p-8 rounded-2xl bg-foreground glow-teal transition-all duration-500"
      >
        <QRCodeCanvas
          value={value || " "}
          size={220}
          bgColor="hsl(210, 20%, 92%)"
          fgColor="hsl(220, 20%, 7%)"
          level="H"
          marginSize={1}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleDownload} size="lg" className="gap-2 font-display">
          <Download className="h-4 w-4" />
          Download PNG
        </Button>
        <Button onClick={handleCopy} variant="secondary" size="lg" className="gap-2 font-display">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default QRGenerator;
