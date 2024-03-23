"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState("");

  const handleFeatureClick = (feature: string) => {
    setActiveFeature(feature);
  };
  return (
    <div className="flex flex-row justify-around mt-24">
      <div className="-m-2 rounded-xl lg:-m-4 lg:rounded-2xl lg:p-4">
        <Image
          src={
            activeFeature === "Dashboard"
              ? "/dashboard.jpg"
              : activeFeature === "Calendario"
              ? "/calendario.png"
              : activeFeature === "Pacientes"
              ? "/pacientes.png"
              : activeFeature === "Pagos"
              ? "/pagos.png"
              : activeFeature === "Material"
              ? "/pagos.png"
              : "/dashboard.jpg"
          }
          width={789}
          height={512}
          alt="Features"
          quality={100}
          className="rounded-md bg-white shadow-2xl"
        />
      </div>

      <div className="flex flex-col justify-between max-w-80">
        <button
          className={cn(
            "bg-transparent hover:bg-gray-100 p-3 rounded-lg space-y-2 text-left",
            activeFeature === "Dashboard" &&
              "bg-[#6366F1]/25 hover:bg-[#6366F1]/25"
          )}
          onClick={() => handleFeatureClick("Dashboard")}
        >
          <h3
            className={cn(
              "font-bold text-base text-[#71717A]",
              activeFeature === "Dashboard" && "text-black"
            )}
          >
            Dashboard
          </h3>
          <p
            className={cn(
              "font-medium text-sm text-[#71717A]",
              activeFeature === "Dashboard" && "text-black"
            )}
          >
            Revisa tendencias, datos y maneja tu negocio desde dónde quieras.
          </p>
        </button>

        <button
          className={cn(
            "bg-transparent hover:bg-gray-100 p-3 rounded-lg space-y-2 text-left",
            activeFeature === "Calendario" &&
              "bg-[#6366F1]/25 hover:bg-[#6366F1]/25"
          )}
          onClick={() => handleFeatureClick("Calendario")}
        >
          <h3
            className={cn(
              "font-bold text-base text-[#71717A]",
              activeFeature === "Calendario" && "text-black"
            )}
          >
            Calendario
          </h3>
          <p
            className={cn(
              "font-medium text-sm text-[#71717A]",
              activeFeature === "Calendario" && "text-black"
            )}
          >
            Muestra tu disponibilidad para agendar citas fácilmente.
          </p>
        </button>

        <button
          className={cn(
            "bg-transparent hover:bg-gray-100 p-3 rounded-lg space-y-2 text-left",
            activeFeature === "Pacientes" &&
              "bg-[#6366F1]/25 hover:bg-[#6366F1]/25"
          )}
          onClick={() => handleFeatureClick("Pacientes")}
        >
          <h3
            className={cn(
              "font-bold text-base text-[#71717A]",
              activeFeature === "Pacientes" && "text-black"
            )}
          >
            Pacientes
          </h3>
          <p
            className={cn(
              "font-medium text-sm text-[#71717A]",
              activeFeature === "Pacientes" && "text-black"
            )}
          >
            Maneja todos tus pacientes desde una sola plataforma.
          </p>
        </button>

        <button
          className={cn(
            "bg-transparent hover:bg-gray-100 p-3 rounded-lg space-y-2 text-left",
            activeFeature === "Pagos" && "bg-[#6366F1]/25 hover:bg-[#6366F1]/25"
          )}
          onClick={() => handleFeatureClick("Pagos")}
        >
          <h3
            className={cn(
              "font-bold text-base text-[#71717A]",
              activeFeature === "Pagos" && "text-black"
            )}
          >
            Pagos
          </h3>
          <p
            className={cn(
              "font-medium text-sm text-[#71717A]",
              activeFeature === "Pagos" && "text-black"
            )}
          >
            Diversifica tu manera de recibir pagos para tus pacientes.
          </p>
        </button>

        <button
          className={cn(
            "bg-transparent hover:bg-gray-100 p-3 rounded-lg space-y-2 text-left",
            activeFeature === "Material" &&
              "bg-[#6366F1]/25 hover:bg-[#6366F1]/25"
          )}
          onClick={() => handleFeatureClick("Material")}
        >
          <h3
            className={cn(
              "font-bold text-base text-[#71717A]",
              activeFeature === "Material" && "text-black"
            )}
          >
            Material
          </h3>
          <p
            className={cn(
              "font-medium text-sm text-[#71717A]",
              activeFeature === "Material" && "text-black"
            )}
          >
            Realiza Tests, envía tareas y cuenta con material de apoyo para
            pacientes.
          </p>
        </button>
      </div>
    </div>
  );
};

export default FeaturesSection;
