import QRGenerator from "@/components/QRGenerator";
import { QrCode } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-grid relative">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <QrCode className="h-8 w-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground">
            QR Studio
          </h1>
        </div>
        <p className="text-muted-foreground text-lg mb-14 text-center max-w-md font-body">
          Paste a link, get a QR code. Instant. Beautiful. Free.
        </p>

        <QRGenerator />
      </main>
    </div>
  );
};

export default Index;
