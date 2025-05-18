import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { type Element } from "../data/elements";

interface ElementDetailsModalProps {
  element: Element;
  onClose: () => void;
}

export const ElementDetailsModal = ({
  element,
  onClose,
}: ElementDetailsModalProps) => {
  const discoveryYear =
    element.discovery < 0
      ? `${Math.abs(element.discovery)} BCE`
      : element.discovery;

  return (
    <Dialog open={!!element} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="retro-card max-w-md bg-opacity-90">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl text-neon-cyan font-title mr-2">
                {element.name}
              </span>
              <span className="text-lg font-mono text-neon-green">
                #{element.number}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-1">
            <div
              className={`element-card h-24 text-neon-${element.category} border-neon-${element.category}`}
              style={{ color: `var(--${element.category})` }}
            >
              <div className="element-number">{element.number}</div>
              <div className="element-symbol text-4xl">{element.symbol}</div>
              <div className="element-mass">
                {element.atomicMass.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="col-span-2 text-left">
            <ul className="space-y-1 text-sm font-mono">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Group:</span>
                <span>{element.group || "N/A"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Period:</span>
                <span>{element.period}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Block:</span>
                <span className="uppercase">{element.block}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">State:</span>
                <span className="capitalize">{element.state}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Discovered:</span>
                <span>{discoveryYear}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 border-t border-neon-cyan/30 pt-4">
          <h3 className="text-sm font-bold text-neon-green mb-2 font-title">
            Electron Configuration
          </h3>
          <div className="font-mono text-sm bg-black/50 p-2 rounded-sm">
            {element.electronConfiguration}
          </div>
        </div>

        {element.description && (
          <div className="mt-4">
            <h3 className="text-sm font-bold text-neon-green mb-2 font-title">
              Description
            </h3>
            <p className="text-sm font-mono">{element.description}</p>
          </div>
        )}

        {element.uses && element.uses.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-bold text-neon-green mb-2 font-title">
              Common Uses
            </h3>
            <ul className="text-sm list-disc list-inside font-mono">
              {element.uses.map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
