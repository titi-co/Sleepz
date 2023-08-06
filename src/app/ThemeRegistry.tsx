"use client";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

const paletteA = {
  mode: "dark",

  primary: {
    main: "#FF0060",
    light: "#fcb8d2",
  },
};

const paletteB = {
  mode: "dark",
  primary: {
    main: "#0079FF",
    light: "#bedafa",
  },
};

const paletteC = {
  mode: "dark",
  primary: {
    main: "#6528F7",
    light: "#cbb5ff",
  },
};

const paletteD = {
  mode: "dark",
  primary: {
    main: "#F2BE22",
    light: "#fce7a7",
  },
};

const paletteE = {
  mode: "dark",
  primary: {
    main: "#539165",
    light: "#C8E4B2",
  },
};

const palettes = [paletteA, paletteB, paletteC, paletteD, paletteE];

export default function ThemeRegistry(props: any) {
  const { options, children } = props;

  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];

  const theme = createTheme({
    palette: randomPalette as any,
  });

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
