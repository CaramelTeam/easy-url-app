"use client";

import { FC, useEffect, useState } from "react";
import { SwitchProps, Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = theme === "dark";

  const onChange = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  if (!mounted) {
    // Si el componente no está montado, devolvemos un fallback vacío
    return null;
  }

  return (
    <Switch
      isSelected={isDarkMode} // Controla el estado del Switch basado en el tema
      size="lg"
      color="secondary"
      onChange={onChange}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunFilledIcon className={className} />
        ) : (
          <MoonFilledIcon className={className} />
        )
      }
    >
      {isDarkMode ? "Dark Mode On" : "Light Mode On"}
    </Switch>
  );
};
