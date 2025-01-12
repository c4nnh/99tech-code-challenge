import { useMediaQuery as useMediaQueryReactResponsive } from "react-responsive";

// Screen sizes are defined in tailwind.config.js
export function useMediaQuery() {
  const isLarge = useMediaQueryReactResponsive({
    minWidth: 1024,
  });
  const isSmall = useMediaQueryReactResponsive({
    maxWidth: 1023,
  });

  return {
    isLarge,
    isSmall,
  };
}
