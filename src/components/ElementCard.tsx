import { useState } from "react";
import { type Element, categoryColors } from "../data/elements";
import { cn } from "../lib/utils";

interface ElementCardProps {
  element: Element;
  isFiltered?: boolean;
  onClick?: (element: Element) => void;
  viewMode: "grid" | "orbital";
}

export const ElementCard = ({
  element,
  isFiltered = false,
  onClick,
  viewMode,
}: ElementCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(element);
    }
  };

  return (
    <>
      <div
        className={cn(
          `element-card relative text-${
            categoryColors[element.category]
          } border-${categoryColors[element.category]}`,
          isFiltered && "opacity-30",
          element.state === "gas" && "border-dashed",
          element.state === "liquid" && "border-dotted"
        )}
        style={{
          color: `var(--${categoryColors[element.category]})`,
          borderColor: `var(--${categoryColors[element.category]})`,
        }}
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        onClick={handleClick}
      >
        <div className="element-number">{element.number}</div>
        <div className="element-symbol">{element.symbol}</div>
        <div className="element-name">{element.name}</div>
        <div className="element-mass">{element.atomicMass.toFixed(2)}</div>
        {viewMode !== "orbital" && isHovering && (
          <div className="element-tooltip opacity-100 visible translate-y-0 -translate-x-1/2 left-1/2 bg-gray-800">
            <div className="font-bold mb-1">
              {element.name} ({element.symbol})
            </div>
            <div className="flex justify-between mb-1">
              <span>Atomic Number:</span>
              <span className="font-semibold">{element.number}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Atomic Mass:</span>
              <span className="font-semibold">
                {element.atomicMass.toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span>State:</span>
              <span className="font-semibold capitalize">{element.state}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Block:</span>
              <span className="font-semibold">{element.block}</span>
            </div>
            <div className="text-xs mb-1">
              <span className="block">Electron Configuration:</span>
              <span className="font-semibold block">
                {element.electronConfiguration}
              </span>
            </div>
            <div className="text-xs mt-2 pt-2 border-t border-neon-cyan/30">
              <div className="text-neon-green">{element.description}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
