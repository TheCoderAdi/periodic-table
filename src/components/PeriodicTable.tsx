import { useState } from "react";
import { ElementCard } from "./ElementCard";
import {
  elements,
  type Element,
  type ElementCategory,
  categoryNames,
  categoryColors,
} from "../data/elements";
import { cn } from "../lib/utils";
import { ElementDetailsModal } from "./ElementDetailsModeal";

type ViewMode = "grid" | "orbital";
type FilterType =
  | ElementCategory
  | "state-solid"
  | "state-liquid"
  | "state-gas"
  | null;

export const PeriodicTable = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filter, setFilter] = useState<FilterType>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const handleFilterClick = (newFilter: FilterType) => {
    setFilter(filter === newFilter ? null : newFilter);
  };

  const isElementFiltered = (element: Element): boolean => {
    if (!filter) return false;

    if (Object.keys(categoryNames).includes(filter as string)) {
      return element.category !== filter;
    }

    if (filter === "state-solid") return element.state !== "solid";
    if (filter === "state-liquid") return element.state !== "liquid";
    if (filter === "state-gas") return element.state !== "gas";

    return false;
  };

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  const closeModal = () => {
    setSelectedElement(null);
  };

  const getOrbitalStyles = (element: Element, index: number) => {
    if (viewMode !== "orbital") return {};

    const orbitIndex = element.period;
    const elementsInSamePeriod = elements.filter(
      (e) => e.period === orbitIndex
    );
    const positionInOrbit = elementsInSamePeriod.findIndex(
      (e) => e.number === element.number
    );

    const angle = (360 / elementsInSamePeriod.length) * positionInOrbit;
    const radius = 5 + orbitIndex * 70;

    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    return {
      transform: `translate(${x}px, ${y}px) scale(0.8)`,
      transition: `transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
        index * 0.02
      }s`,
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 relative">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-title text-neon-cyan glow-text animate-pulse">
          <span className="text-neon-purple">Chem</span>OS
        </h1>

        <div className="flex items-center space-x-2">
          <button
            className={cn("layout-toggle", viewMode === "grid" && "active")}
            onClick={() => setViewMode("grid")}
          >
            <span className="text-[0.9rem]">Grid</span>
          </button>
          <button
            className={cn("layout-toggle", viewMode === "orbital" && "active")}
            onClick={() => setViewMode("orbital")}
          >
            <span className="text-[0.9rem]">Orbital</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="mb-6 flex flex-wrap gap-2 justify-start md:flex-col md:items-start md:w-56">
          <div className="text-md mr-2 text-muted-foreground/90 flex items-center">
            Filters:
          </div>

          {(Object.entries(categoryNames) as [ElementCategory, string][]).map(
            ([category, name]) => (
              <button
                key={category}
                className={cn(
                  "filter-button text-[0.99rem]",
                  filter === category && "active"
                )}
                onClick={() => handleFilterClick(category)}
                style={
                  {
                    "--ring-color": `var(--${categoryColors[category]})`,
                    "--bg-color": `var(--${categoryColors[category]})`,
                  } as React.CSSProperties
                }
              >
                {name}
              </button>
            )
          )}

          <button
            className={cn(
              "filter-button text-[0.99rem]",
              filter === "state-solid" && "active"
            )}
            onClick={() => handleFilterClick("state-solid")}
          >
            Solid
          </button>
          <button
            className={cn(
              "filter-button text-[0.99rem]",
              filter === "state-liquid" && "active"
            )}
            onClick={() => handleFilterClick("state-liquid")}
          >
            Liquid
          </button>
          <button
            className={cn(
              "filter-button text-[0.99rem]",
              filter === "state-gas" && "active"
            )}
            onClick={() => handleFilterClick("state-gas")}
          >
            Gas
          </button>
        </div>

        <div
          className={cn(
            "relative transition-all duration-500 flex-1",
            viewMode === "grid"
              ? "periodic-table-grid"
              : "orbital-view flex justify-center mt-36"
          )}
        >
          {viewMode === "orbital" && (
            <div className="absolute w-5 h-5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)] z-10 ml-16 mt-16"></div>
          )}

          {elements.map((element, index) => (
            <div
              key={element.number}
              className={cn(
                viewMode === "orbital" && "orbital",
                viewMode === "grid" && `element-${element.number}`
              )}
              style={getOrbitalStyles(element, index)}
            >
              <ElementCard
                element={element}
                isFiltered={isElementFiltered(element)}
                onClick={handleElementClick}
                viewMode={viewMode}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedElement && (
        <ElementDetailsModal element={selectedElement} onClose={closeModal} />
      )}
    </div>
  );
};
